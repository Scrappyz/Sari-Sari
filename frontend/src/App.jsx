import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './user/pages/Home/Home';
import Products from './user/pages/Products/Products';
import ManageProducts from './user/pages/ManageProducts/ManageProducts';
import Login from './user/pages/Login/Login'
import Logout from './user/pages/Logout/Logout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/products' element={<Products />} />
        <Route path='/manage/products' element={<ManageProducts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
