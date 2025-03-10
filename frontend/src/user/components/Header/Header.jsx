import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

function Header() {
    return (
        <nav className='navbar sticky-top navbar-expand-lg shadow'>
            <a class="navbar-brand" href="/home">Sari-Sari</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="/home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a className='nav-link' href='/products'>Products</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Header;