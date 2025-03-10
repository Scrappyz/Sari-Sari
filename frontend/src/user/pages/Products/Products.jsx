import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

function Products() {
    
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
                <div className='d-flex justify-content-center mt-4'>
                    <ProductCard product={"Hotdog"} price={"PHP 5.00"} mediaSrc={"hotdog.jpg"} desc={"SOme hotdog"}/>
                </div>
            </div>
        </div>
    );
}

export default Products;