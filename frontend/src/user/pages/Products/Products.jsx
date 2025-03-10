import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import '/src/global.css';
import './Products.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => { // Get products on document load
        axios.get("http://localhost:8080/products").then((res) => {
            setProducts(res.data);
        });
    }, []);

    console.log(products);

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
                <div className='container-fluid'>
                    <div className='d-flex mt-4' style={{width: "50%", height: "70vh"}}>
                        <div className='row row-cols-3 justify-content-between' style={{overflowY: "auto"}}>
                            {
                                products.map((product, i) => {
                                    return (
                                        <div className='col mb-4'>
                                            <ProductCard product={product["productName"]} desc={product["description"]} price={"₱" + product["price"]} stock={product["stock"]} mediaSrc={product["mediaSource"]} />
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

export default Products;