import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, ButtonGroup, Card } from 'react-bootstrap';
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
    <Card style={{ width, height }} className="d-flex flex-column">
      <Card.Img
        variant="top"
        src={imageSrc}
        style={{ objectFit: 'contain', width: '100%', height: 'auto', maxHeight: '50%' }}
      />
      <Card.Body className="flex-grow-1 d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text className='product-desc'>
          {description}
        </Card.Text>
        <Card.Text className='text-end'>
            <strong>{price}</strong>
        </Card.Text>
        <Card.Footer className='text-end'>
            yello
            {/* <ButtonGroup>
                <Button variant='primary'>Add To Cart</Button>
                <Button variant='primary'>Buy</Button>
            </ButtonGroup> */}
        </Card.Footer>
      </Card.Body>
    </Card>
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
