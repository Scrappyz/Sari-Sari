import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';

function Products() {
    return (
        <div>
            <Header />
            <div>
                <ProductCard />
            </div>
        </div>
    );
}

export default Products;