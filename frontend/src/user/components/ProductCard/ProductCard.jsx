import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import './ProductCard.css';

function ProductCard({
  width = '350px',
  height = '300px',
  imageSrc,
  title,
  description,
  price,
}) {
  return (
    <div>

    </div>
  );
}

ProductCard.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  imageSrc: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
};

export default ProductCard;
