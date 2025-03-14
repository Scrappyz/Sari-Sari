import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import '/src/global.css';
import './Products.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([]);
    const [checkout, setCheckout] = useState({});
    console.log(checkout);

    useEffect(() => { // Get products on document load
        axios.get("http://localhost:8080/products").then((res) => {
            setProducts(res.data);
        });
    }, []);

    // console.log(products);

    const addProduct = (productId, productName, price, quantity) => {
        let newProduct = {};

        if(productId in checkout) {
            newProduct = checkout[productId];
            newProduct.quantity = newProduct.quantity + quantity;
        } else {
            newProduct = {
                "productName": productName,
                "price": price,
                "quantity": quantity
            };
        }

        setCheckout({...checkout, [productId]: newProduct});
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
                <div className='container-fluid d-flex justify-content-between'>
                    <div className='d-flex mt-4 mr-3' style={{width: "50%", height: "70vh"}}>
                        <div className='row row-cols-3 justify-content-start' style={{overflowY: "auto"}}>
                            {
                                products.map((product, i) => {
                                    return (
                                        <div className='col mb-4'>
                                            <ProductCard 
                                                productId={product["id"]}
                                                product={product["productName"]} 
                                                desc={product["description"]} 
                                                price={"₱" + product["price"]} 
                                                stock={product["stock"]} 
                                                mediaSrc={product["mediaSource"]} 
                                                onBuy={addProduct} 
                                            />
                                        </div>
                                    ) 
                                })
                            }
                        </div>
                    </div>
                    <div className='d-flex mt-4 justify-content-center' style={{width: "49%"}}>
                        <div className='card rounded shadow' style={{width: "50%"}}>
                            <div className='card-header text-center pallete-primary'>
                                <h1>Receipt</h1>
                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <table className='table table-borderless' style={{width: "100%"}}>
                                        <tr>
                                            <th>Qty</th>
                                            <th style={{width: "70%"}}>Product Name</th>
                                            <th>Price</th>
                                        </tr>
                                        {
                                            Object.keys(checkout).map((key) => {
                                                return (
                                                    <tr>
                                                        <td>{checkout[key]["quantity"]}x</td>
                                                        <td>{checkout[key]["productName"]}</td>
                                                        <td>{checkout[key]["price"]}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </table>
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