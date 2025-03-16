import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

function Header() {
    return (
        <nav className='navbar sticky-top navbar-expand-lg shadow'>
            <a className="navbar-brand" href="/home">Sari-Sari</a>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className='nav-link' href='/products'>Products</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;