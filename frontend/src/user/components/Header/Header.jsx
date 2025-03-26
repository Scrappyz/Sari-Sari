import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <nav className='navbar sticky-top navbar-expand-lg shadow' style={{marginBottom: "20px"}}>
            <a className="navbar-brand" href="/home">Sari-Sari</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' to='/products'>Products</Link>
                    </li>
                    <li className='nav-item dropdown'>
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Manage
                        </a>
                        <ul className='dropdown-menu' aria-labelledby="navbarDropdown">
                            <li><Link className='dropdown-item' to="/manage/products">Products</Link></li>
                            <li><Link className='dropdown-item' to="#">Orders</Link></li>
                        </ul>
                    </li>
                    <li className='nav-item'>
                        <Link className="nav-link" to="/logout">Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;