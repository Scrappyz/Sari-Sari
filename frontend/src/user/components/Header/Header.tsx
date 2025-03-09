import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import {Container, Navbar, Nav } from 'react-bootstrap';

function Header() {
    return (
        <Navbar sticky='top' expand='lg' className='bg-body-tertiary'>
            <Container>
                <Navbar.Brand>Sari-Sari</Navbar.Brand>
                <Navbar.Collapse>
                    <Nav.Link href='/products'>Products</Nav.Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;