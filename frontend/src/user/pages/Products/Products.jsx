import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';

function Products() {
    return (
        <div>
            <Header />
            <div>
                <ProductCard imageSrc={"hotdog.jpg"} title={"Hotdog"} description={"Goodffffffffffffh Hotdog"} price={"$10"}/>
            </div>
        </div>
    );
}

export default Products;