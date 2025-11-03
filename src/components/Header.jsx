import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function Header({ onSearch }) {
  const { isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // cada tecla actualiza la búsqueda en App
  };

  return (
    <header className="header-fijo">
      <nav className="navbar">
        <div className="container navbar-content">
          <Link to="/" className="link-unstyled">
            <h1 className="logo-text">Mi tienda Virtual Bodeguera Insuma</h1>
          </Link>

          <div className="navbar-actions">
            {/* Buscador */}
            <form onSubmit={(e) => e.preventDefault()} className="search-container">
              <input
                type="search"
                placeholder="Buscar productos..."
                className="input search-input"
                value={query}
                onChange={handleChange}
              />
              <Search className="search-icon" />
            </form>

            {/* Carrito */}
            <Link to="/cart" className="link-unstyled">
              <div className="cart-icon-container">
                <ShoppingCart />
                {items.length > 0 && (
                  <span className="cart-badge">{items.length}</span>
                )}
              </div>
            </Link>

            {/* Login / Logout */}
            {isAuthenticated ? (
              <button 
                onClick={logout} 
                className="btn-icon link-unstyled" 
                style={{ background: "none", border: "none", cursor: "pointer", color: "#ef4444" }}
                title="Cerrar Sesión"
              >
                <LogOut />
              </button>
            ) : (
              <Link to="/login" className="link-unstyled" title="Iniciar Sesión" style={{ color: "#007bff" }}>
                <User />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
