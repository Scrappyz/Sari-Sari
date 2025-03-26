import 'bootstrap/dist/css/bootstrap.min.css';
import '/src/global.css';
import './ManageProducts.css';

import ServerRoute from '../../../ServerRoute';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';

import { useState, useEffect } from 'react';
import axios from 'axios';
import bigDecimal from 'js-big-decimal';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ManageProducts() {
    const [products, setProducts] = useState({});
    const currency = "₱";

    const navigate = useNavigate();

    useEffect(function(){
        if (localStorage.getItem("posjwt") === null) {
            navigate("/login", { replace: true })
            return;
        }
        axios.post(ServerRoute + "/role", {
            token: localStorage.getItem("posjwt")
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("posjwt")
            }
        }).then(function(res) {
            // console.log(res.data);
            if (res.data.other !== "ADMIN") {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "This page is only for ADMINs"
                });
                navigate("/", { replace: true });
            }
        }).catch(function(err) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Not Allowed"
            });
            navigate("/", { replace: true });
        });
    }, []);

    useEffect(() => { // Get products on document load
        axios.get(ServerRoute + "/products", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("posjwt")
            }
        }).then((res) => {
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

    const addProduct = () => {
        
    }

    return (
        <div>
            <Header />
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
                <hr style={{marginBottom: 0}} />
                <div className='container-flex d-flex justify-content-center mt-3'>
                    <button className='btn btn-primary' onClick={() => addProduct()}>Add</button>
                </div>
                <div className='container-flex d-flex justify-content-center'>
                    <div className='d-flex mt-4' style={{width: "90%"}}>
                        <div className='row row-cols-5 justify-content-start'>
                        {
                            Object.keys(products).map((key) => {
                                return (
                                    <div className='col mb-4' key={key}>
                                        <ProductCard
                                            type='manage'
                                            productId={key}
                                            product={products[key]["productName"]} 
                                            desc={products[key]["description"]} 
                                            price={products[key]["price"]}
                                            currency={currency} 
                                            stock={products[key]["stock"]} 
                                            mediaSrc={products[key]["mediaSource"]} 
                                        />
                                    </div>
                                ) 
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageProducts;