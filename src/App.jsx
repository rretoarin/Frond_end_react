import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Products from './components/Products';
import Cart from './components/Cart';
import Login from './components/Login';
import Footer from './components/Footer';
import Register from './components/Register';
import Checkout from "./components/Checkout";

function App() {
  const [searchQuery, setSearchQuery] = useState(""); //  Estado global de búsqueda

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* Pasamos setSearchQuery al Header */}
          <Header onSearch={setSearchQuery} />
          <main className="container">
            <Routes>
              {/* Pasamos searchQuery a Products */}
              <Route path="/" element={<Products searchQuery={searchQuery} />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
             <Route path="/register" element={<Register />} />
             <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;


