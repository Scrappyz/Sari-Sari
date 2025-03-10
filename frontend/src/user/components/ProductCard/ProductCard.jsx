import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import './ProductCard.css';

function ProductCard() {
    return (
		<div className='card p-0 rounded-3 shadow' style={{maxWidth: "16rem"}}>
			<img src='hotdog.jpg' />
			<div className='card-body'>
				<div>
					<h5 className='card-title'>Hotdog</h5>
				</div>
				<div>
					<p className='card-text'>Good old hotdog</p>
				</div>
				<div className='d-flex justify-content-between mt-4' style={{fontSize: "16px"}}>
					<strong className='card-text'>Price:</strong>
					<p className='card-text' style={{color: "green"}}>PHP 10</p>
				</div>
			</div>
		</div>
	)
}

export default ProductCard;
