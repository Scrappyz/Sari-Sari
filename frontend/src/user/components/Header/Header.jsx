import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.css';

function Header() {
    return (
        <nav className='navbar sticky-top navbar-expand-lg shadow' style={{marginBottom: "20px"}}>
            <a className="navbar-brand" href="/home">Sari-Sari</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className='nav-link' href='/products'>Products</a>
                    </li>
                    <li className='nav-item dropdown'>
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Manage
                        </a>
                        <ul className='dropdown-menu' aria-labelledby="navbarDropdown">
                            <li><a className='dropdown-item' href="/manage/products">Products</a></li>
                            <li><a className='dropdown-item' href="#">Orders</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;