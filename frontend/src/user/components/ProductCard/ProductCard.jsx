import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import '/src/global.css';
import './ProductCard.css';

function ProductCard({
	product,
	desc,
	price,
	mediaSrc = "no-pic.jpg"
}) {
    return (
		<div className='card p-0 rounded-3 shadow' style={{maxWidth: "16rem", maxHeight: "24rem"}}>
			<div style={{height: "50%"}}>
				<img src={mediaSrc} style={{objectFit: "fill", width: "100%", height: "100%"}} />
			</div>
			<div className='card-body'>
				<div>
					<h5 className='card-title'>{product}</h5>
				</div>
				<div>
					<p className='card-text'>{desc}</p>
				</div>
				<div className='d-flex justify-content-between mt-4 mb-0' style={{fontSize: "16px"}}>
					<strong className='card-text'>Price:</strong>
					<p className='card-text' style={{color: "green"}}>{price}</p>
				</div>
			</div>
			<div className='card-footer'>
				<div className='d-flex justify-content-center'>
					<button className='btn btn-primary btn-sm'>Buy</button>
				</div>
			</div>
		</div>
	)
}

export default ProductCard;
