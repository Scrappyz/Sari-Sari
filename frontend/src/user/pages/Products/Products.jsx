import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import '/src/global.css';
import './Products.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import bigDecimal from 'js-big-decimal';

function Products() {
    const [products, setProducts] = useState([]);
    const [checkout, setCheckout] = useState({
        "products": {},
        "total": new bigDecimal(0)
    });
    const currency = "₱";

    useEffect(() => { // Get products on document load
        axios.get("http://localhost:8080/products").then((res) => {
            setProducts(res.data);
        });
    }, []);

    const addProduct = (productId, productName, price, quantity) => {
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
                                products.map((product, i) => {
                                    return (
                                        <div className='col mb-4'>
                                            <ProductCard 
                                                productId={product["id"]}
                                                product={product["productName"]} 
                                                desc={product["description"]} 
                                                price={product["price"]}
                                                currency={currency} 
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
                                <div className='row' style={{marginLeft: "2%", marginRight: "2%"}}>
                                    <table className='table table-borderless' style={{width: "100%"}}>
                                        <thead>
                                            <th style={{width: "20%"}}>Qty</th>
                                            <th style={{width: "70%"}}>Product Name</th>
                                            <th>Price</th>
                                        </thead>
                                        {
                                            Object.keys(checkout["products"]).map((key) => {
                                                let totalProductPrice = new bigDecimal(checkout["products"][key]["price"] * checkout["products"][key]["quantity"]);
                                                return (
                                                    <tr>
                                                        <td>{checkout["products"][key]["quantity"]}x</td>
                                                        <td>{checkout["products"][key]["productName"]}</td>
                                                        <td>{currency}{totalProductPrice.round(2).getPrettyValue()}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        <tfoot>
                                            <th>Total:</th>
                                            <th></th>
                                            <th>{currency}{checkout["total"].round(2).getPrettyValue()}</th>
                                        </tfoot>
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