import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

function ProductCard(props) {
    console.log(props.width, props.height);
    return (
        <Card style={{width: props.width, height: props.height, maxHeight: props.height, maxWidth: props.width}}>
            <Card.Img variant='top' src='hotdog.jpg' style={{objectFit: "contain"}} />
            <Card.Body>
                <Card.Title>Hotdog</Card.Title>
                <Card.Text className='overflow-auto' style={{maxHeight: "80px"}}>h</Card.Text>
                <Card.Text style={{textAlign: "right"}}>$10.00</Card.Text>
            </Card.Body>
        </Card>
    );
}

// type ProductProps = {
//     width?: string;
//     height?: string;
// };

export default ProductCard;