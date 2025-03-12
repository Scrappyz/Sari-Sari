import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import '/src/global.css';
import { useState } from 'react';

function ProductCard({
	productId,
	product,
	desc,
	price,
	stock,
	mediaSrc = "no-pic.jpg",
	onBuy
}) {
	const [quantity, setQuantity] = useState(1);

    return (
		<div className='card rounded-3 shadow' style={{maxWidth: "16rem", maxHeight: "28rem"}}>
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
				<div className='d-flex justify-content-between mt-4' style={{fontSize: "16px"}}>
					<strong className='card-text'>Price:</strong>
					<p className='card-text' style={{color: "green"}}>{price}</p>
				</div>
				<div className='d-flex justify-content-between'>
					<strong className='card-text'>In Stock:</strong>
					<p className='card-text'>{stock}</p>
				</div>
			</div>
			<div className='card-footer'>
				<div className='d-flex justify-content-between'>
					<div className='d-flex justify-content-start' style={{width: "50%"}}>
						<label className='form-label' style={{marginRight: "10px"}}><strong>Qty:</strong></label>
						<input
							className='form-control form-control-sm'
							type='number'
							value={quantity}
							onChange={(e) => setQuantity(Number(e.target.value))}
							min={1}
							max={stock}
						/>
					</div>
					<button className='btn btn-primary btn-sm' onClick={() => onBuy(productId, product, quantity)}>Buy</button>
				</div>
			</div>
		</div>
	)
}

export default ProductCard;
