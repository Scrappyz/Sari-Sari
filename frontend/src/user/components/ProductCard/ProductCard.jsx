import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import './ProductCard.css';

function ProductCard() {
    return (
		<div className='card rounded-3 shadow'>
			<img src='hotdog.jpg' />
			<div className='card-body'>
				<h4 className='card-title'>Hotdog</h4>
				<p className='card-text'>Good old hotdog</p>
			</div>
		</div>
	)
}

export default ProductCard;
