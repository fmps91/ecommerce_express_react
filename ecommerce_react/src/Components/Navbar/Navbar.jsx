import React, { useContext, useEffect, useRef, useState } from 'react'
import logo from '/logo.png'
import cart_icon from '/cart_icon.png'
import './Navbar.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../../assets/nav_dropdown.png'


const Navbar = () => {

  const [menu, setMenu] = useState("shop")
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();
  const navigate = useNavigate();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle('open');
  }

  // Función combinada que cambia el menú y cierra el dropdown
  const handleMenuClick = (menuType) => {
    setMenu(menuType);

    // Cerrar menú en móvil
    if (window.innerWidth <= 800) {
      menuRef.current.classList.remove("nav-menu-visible");
      const dropdownIcon = document.querySelector('.nav-dropdown');
      if (dropdownIcon) {
        dropdownIcon.classList.remove('open');
      }
    }
  }


  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => handleMenuClick("shop")}>
          <Link style={{ textDecoration: "none" }} to="/">Shop</Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li onClick={() => handleMenuClick("mens")}>
          <Link style={{ textDecoration: "none" }} to='/mens'>Men</Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li onClick={() => handleMenuClick("womens")}>
          <Link style={{ textDecoration: "none" }} to='/womens'>Women</Link>
          {menu === "womens" ? <hr /> : <></>}
        </li>
        <li onClick={() => handleMenuClick("kids")}>
          <Link style={{ textDecoration: "none" }} to='/kids'>Kids</Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('token') ?
          (
            <button onClick={() => {
              localStorage.removeItem('token');
          window.location.replace('/');
            }}>Logout</button>)
          :
          (<Link to='/login'><button>Login</button></Link>)
        }


        <Link to='/cart'><img src={cart_icon} alt="cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
