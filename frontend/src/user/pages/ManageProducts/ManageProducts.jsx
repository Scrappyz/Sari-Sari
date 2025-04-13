import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS bundle
import '/src/global.css';
import './ManageProducts.css';

import ServerRoute from '../../../ServerRoute';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ManageProducts() {
    const [products, setProducts] = useState({});
    const [isEditMode, setIsEditMode] = useState(false); // Checks if a product is being edited or added
    const [editingProductId, setEditingProductId] = useState(null); // Keeps track of what product is being edited in modal form
    const currency = "₱";
    const navigate = useNavigate();

    // Admin validation
    useEffect(() => {
        if (localStorage.getItem("posjwt") === null) {
            navigate("/login", { replace: true });
            return;
        }
        axios.post(ServerRoute + "/role", {
            token: localStorage.getItem("posjwt")
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("posjwt")
            }
        }).then((res) => {
            if (res.data.other !== "ADMIN") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "This page is only for ADMINs"
                });
                navigate("/", { replace: true });
            } else {
                document.getElementById("ManageProducts").style.display = "";
            }
        }).catch(() => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Not Allowed"
            });
            navigate("/", { replace: true });
        });
    }, []);

    const clearModalForm = () => {
        const inputs = document.querySelectorAll("#product-form input, #product-form textarea");
        inputs.forEach(input => {
            input.value = "";
        });
    };

    useEffect(() => {
        axios.get(ServerRoute + "/products", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("posjwt")
            }
        }).then((res) => {
            const p = {};
            res.data.forEach(product => {
                let id = product["id"];
                p[id] = {
                    productName: product["productName"],
                    price: product["price"],
                    stock: product["stock"],
                    description: product["description"],
                    mediaSource: product["mediaSource"]
                };
            });
            setProducts(p);
        });

        const productForm = document.getElementById('product-form');
        if (productForm) {
            productForm.addEventListener('hidden.bs.modal', () => {
                clearModalForm();
                setIsEditMode(false);
                setEditingProductId(null);
            });
        }
    }, []);

    const addProduct = () => {
        const requestData = {
            productName: document.getElementById("product-name").value,
            description: document.getElementById("product-desc").value,
            price: document.getElementById("price").value,
            stock: document.getElementById("stock").value,
            mediaSource: document.getElementById("media-source").value
        };

        Swal.fire({
            title: "Adding product...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
                axios.post(ServerRoute + "/products/add", requestData, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("posjwt")}`
                    }
                }).then((res) => {
                    // console.log(res.data);
                    Swal.fire({
                        icon: "success",
                        title: "Product Added Successfully"
                    });

                    const newKey = res.data.data.id;
                    const newProduct = res.data.data;
                    delete newProduct.id;

                    setProducts(prev => ({
                        ...prev,
                        [newKey]: newProduct
                    }));

                }).catch((error) => {
                    console.error(error);
                    Swal.fire({
                        icon: "error",
                        title: "Error"
                    });
                });
            }
        });
    };

    const updateProduct = () => {
        const requestData = {
            productName: document.getElementById("product-name").value,
            description: document.getElementById("product-desc").value,
            price: document.getElementById("price").value,
            stock: document.getElementById("stock").value,
            mediaSource: document.getElementById("media-source").value
        };

        Swal.fire({
            title: "Updating product...",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();

                axios.put(ServerRoute + "/products/edit/" + editingProductId, requestData, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("posjwt")}`
                    }
                }).then(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Product Updated Successfully"
                    });
                    setProducts(prev => ({
                        ...prev,
                        [editingProductId]: requestData
                    }));
                }).catch((error) => {
                    console.error(error);
                    Swal.fire({
                        icon: "error",
                        title: "Error"
                    });
                });
            }
        });
    };

    const deleteProduct = (productId) => {
        Swal.fire({
            icon: "info",
            title: "Are you sure you want to delete this product?",
            confirmButtonText: "Yes",
            showDenyButton: true,
            denyButtonText: "No"
        }).then((result) => {
            if (result.isDenied) return;
            Swal.fire({
                title: "Removing product...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                    axios.delete(ServerRoute + "/products/remove/" + productId, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem("posjwt")}`
                        }
                    }).then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Product Removed Successfully"
                        });
                        setProducts(prev => {
                            const { [productId]: _, ...rest } = prev;
                            return rest;
                        });
                    }).catch((error) => {
                        console.error(error);
                        Swal.fire({
                            icon: "error",
                            title: "Error"
                        });
                    });
                }
            });
        });
    };

    const showProductForm = (type, id, name, desc, price, stock, mediaSource) => {
        if (type === "edit") {
            document.getElementById("product-name").value = name;
            document.getElementById("product-desc").value = desc;
            document.getElementById("price").value = price;
            document.getElementById("stock").value = stock;
            document.getElementById("media-source").value = mediaSource;
            setIsEditMode(true);
            setEditingProductId(id);
        } else {
            setIsEditMode(false);
        }

        document.getElementById("modal-toggle").click();
    }

    return (
        <div id='ManageProducts' style={{ display: "none" }}>
            <Header />

            {/* Modal Form */}
            <div className='modal fade' id="product-form" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className='modal-dialog modal-dialog-centered' style={{ width: "300px" }}>
                    <div className='modal-content'>
                        <div className='modal-body'>
                            <h3 className='modal-title text-center mb-2'>
                                {isEditMode ? "Edit Product" : "Add New Product"}
                            </h3>
                            <div className='d-flex flex-column justify-content-center align-items-center'>
                                <div className='mb-2' style={{ width: "95%" }}>
                                    <label className='form-label'>Product Name</label>
                                    <input className='form-control' type='text' id='product-name' placeholder='Enter product name' />
                                </div>
                                <div className='mb-2' style={{ width: "95%" }}>
                                    <label className='form-label'>Description</label>
                                    <textarea className='form-control' id='product-desc' placeholder='Enter product description' />
                                </div>
                                <div className='row mb-2' style={{ width: "95%" }}>
                                    <div className='col-6'>
                                        <label className='form-label'>Price</label>
                                        <input className='form-control' type='number' id='price' min={0} placeholder='0' step={0.01} />
                                    </div>
                                    <div className='col-6'>
                                        <label className='form-label'>Stock</label>
                                        <input className='form-control' type='number' id='stock' min={0} placeholder='0' />
                                    </div>
                                </div>
                                <div className='mb-2' style={{ width: "95%" }}>
                                    <label className='form-label'>Media Source</label>
                                    <input className='form-control' type='text' id='media-source' placeholder='Enter an image url' />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={() => isEditMode ? updateProduct() : addProduct()}
                            >
                                Save changes
                            </button>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-bs-target="#product-form">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden Modal Toggle Buttons */}
            <button type='button' id="modal-toggle" style={{ display: "none" }} data-bs-toggle="modal" data-bs-target="#product-form"></button>
            <button type='button' id="modal-dismiss" style={{ display: "none" }} data-bs-dismiss="modal" data-bs-target="#product-form"></button>

            {/* Main Content */}
            <div className='body-container'>
                <div className='d-flex justify-content-center'>
                    <h2>Manage Products</h2>
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    <form>
                        <div className='input-group'>
                            <input className='form-control' type='search' placeholder='Search product' />
                            <button type='button' className='btn btn-primary'>Search</button>
                        </div>
                    </form>
                </div>
                <hr style={{ marginBottom: 0 }} />
                <div className='container-flex d-flex justify-content-center mt-3'>
                    <button
                        className='btn btn-primary'
                        data-bs-toggle="modal"
                        data-bs-target="#product-form"
                    >
                        Add
                    </button>
                </div>
                <div className='container-flex d-flex justify-content-center'>
                    <div className='d-flex mt-4' style={{ width: "90%" }}>
                        <div className='row row-cols-5 justify-content-start'>
                            {Object.keys(products).map((key) => (
                                <div className='col mb-4' key={key}>
                                    <ProductCard
                                        type="manage"
                                        productId={key}
                                        product={products[key]["productName"]}
                                        desc={products[key]["description"]}
                                        price={products[key]["price"]}
                                        currency={currency}
                                        stock={products[key]["stock"]}
                                        mediaSrc={products[key]["mediaSource"]}
                                        handleDelete={deleteProduct}
                                        handleEdit={showProductForm}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageProducts;
