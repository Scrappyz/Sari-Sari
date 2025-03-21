import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import '/src/global.css';
import './Products.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import bigDecimal from 'js-big-decimal';
import Swal from 'sweetalert2';

function Products() {
    const [products, setProducts] = useState({});
    const [checkout, setCheckout] = useState({
        "products": {},
        "total": new bigDecimal(0)
    });
    const currency = "₱";
    // console.log("Checkout:", checkout);

    useEffect(() => { // Get products on document load
        axios.get("http://localhost:8080/products").then((res) => {
            const p = {};

            for(let i = 0; i < res.data.length; i++) {
                console.log(res.data[i]);
                let id = res.data[i]["id"];
                p[id] = {};
                p[id]["productName"] = res.data[i]["productName"];
                p[id]["price"] = res.data[i]["price"];
                p[id]["stock"] = res.data[i]["stock"];
                p[id]["description"] = res.data[i]["description"];
                p[id]["mediaSource"] = res.data[i]["mediaSource"];
            }

            setProducts(p);
        });
    }, []);

    const addProduct = (productId, productName, price, quantity) => {
        if(products[productId]["stock"] < quantity) {
            Swal.fire({
                title: "Out of Stock",
                icon: "error"
            });
            return;
        }

        let newProduct = {};

        if(productId in checkout["products"]) {
            newProduct = checkout["products"][productId];
            newProduct.quantity += quantity;
        } else {
            newProduct = {
                "productName": productName,
                "price": price,
                "quantity": quantity
            };
        }

        let total = checkout["total"].add(new bigDecimal(price * quantity));

        setCheckout({
            ...checkout,
            "products": {
                ...checkout["products"],
                [productId]: newProduct
            },
            "total": total
        });

        setProducts({
            ...products,
            [productId]: {
                ...products[productId],
                "stock": products[productId]["stock"] - quantity
            }
        });
    }

    const checkoutProducts = () => {
        const requestData = [];

        for(const [key, value] of Object.entries(checkout["products"])) {
            requestData.push({
                productId: key,
                quantity: value["quantity"]
            });
        }
        
        if(requestData.length < 1) {
            return;
        }

        Swal.fire({
            title: "Proceed To Checkout?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, checkout",
            cancelButtonText: "No"
        }).then((result) => {
            if(!result.isConfirmed) {
                return;
            }
        
            Swal.fire({
                title: "Processing your order...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();

                    axios.post("http://localhost:8080/orders/add", requestData).then((response) => {
                        Swal.close();

                        Swal.fire({
                            title: "Success!",
                            text: "Your order has been placed successfully.",
                            icon: "success"
                        });
                    }).catch((error) => {
                        Swal.close();

                        Swal.fire({
                            title: "Error",
                            text: "There was an error processing your order.",
                            icon: "error",
                            confirmButtonText: "Try Again"
                        });
                    });
                }
            });
        });  

    }

    return (
        <div>
            <Header />
            <div className='body-container'>
                <div className='d-flex justify-content-center'>
                    <h2>Products</h2>
                </div>
                <div className='d-flex justify-content-center mt-3'>
                    <form>
                        <div className='input-group'>
                            <input className='form-control' type='search' placeholder='Search product' />
                            <button type='button' className='btn btn-primary'>Search</button>
                        </div>
                    </form>
                </div>
                <hr style={{marginBottom: 0}} />
                <div className='container-fluid d-flex justify-content-between'>
                    <div className='d-flex mt-4 mr-3' style={{width: "50%", height: "70vh"}}>
                        <div className='row row-cols-3 justify-content-start' style={{overflowY: "auto"}}>
                            {
                                Object.keys(products).map((key) => {
                                    return (
                                        <div className='col mb-4' key={key}>
                                            <ProductCard 
                                                productId={key}
                                                product={products[key]["productName"]} 
                                                desc={products[key]["description"]} 
                                                price={products[key]["price"]}
                                                currency={currency} 
                                                stock={products[key]["stock"]} 
                                                mediaSrc={products[key]["mediaSource"]} 
                                                onBuy={addProduct} 
                                            />
                                        </div>
                                    ) 
                                })
                            }
                        </div>
                    </div>
                    <div className='d-flex mt-4 justify-content-center' style={{width: "49%"}}>
                        <div className='card rounded shadow' style={{width: "50%", height: "fit-content"}}>
                            <div className='card-header text-center pallete-primary'>
                                <h1>Receipt</h1>
                            </div>
                            <div className='card-body'>
                                <div className='row' style={{marginLeft: "2%", marginRight: "2%"}}>
                                    <table className='table table-borderless' style={{width: "100%"}}>
                                        <thead>
                                            <tr>
                                                <th style={{width: "20%"}}>Qty</th>
                                                <th style={{width: "70%"}}>Product Name</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            Object.keys(checkout["products"]).map((key) => {
                                                let totalProductPrice = new bigDecimal(checkout["products"][key]["price"] * checkout["products"][key]["quantity"]);
                                                return (
                                                    <tr key={key}>
                                                        <td style={{paddingTop: "0px", paddingBottom: "0px"}}>{checkout["products"][key]["quantity"]}x</td>
                                                        <td style={{paddingTop: "0px", paddingBottom: "0px"}}>{checkout["products"][key]["productName"]}</td>
                                                        <td style={{paddingTop: "0px", paddingBottom: "0px"}}>{currency}{totalProductPrice.round(2).getPrettyValue()}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td><strong>Total:</strong></td>
                                                <td></td>
                                                <td><strong>{currency}{checkout["total"].round(2).getPrettyValue()}</strong></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                                <div className='row justify-content-center mb-3'>
                                    <button className='btn btn-primary' style={{width: "50%"}} onClick={() => checkoutProducts()}>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;