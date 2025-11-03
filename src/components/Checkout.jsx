import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart(); // ✅ ahora usamos clearCart
  const [orderCode, setOrderCode] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // 🔹 Validar fecha de vencimiento MM/YY
  const validateExpiry = (expiry) => {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;

    const [monthStr, yearStr] = expiry.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt("20" + yearStr, 10);

    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    return year > currentYear || (year === currentYear && month >= currentMonth);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{16}$/.test(formData.cardNumber)) {
      alert("La tarjeta debe tener exactamente 16 números");
      return;
    }
    if (!/^\d{3}$/.test(formData.cvv)) {
      alert("El CVV debe tener exactamente 3 números");
      return;
    }
    if (!/^\d{9,}$/.test(formData.phone)) {
      alert("El teléfono debe tener al menos 9 dígitos");
      return;
    }
    if (!validateExpiry(formData.expiry)) {
      alert("La fecha de vencimiento no es válida o ya venció (usa MM/YY)");
      return;
    }

    // Generar código de pedido
    const code = "PED-" + Math.floor(100000 + Math.random() * 900000);

    const order = {
      ...formData,
      items,
      total,
      orderCode: code,
      date: new Date().toISOString()
    };

    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    localStorage.setItem("orders", JSON.stringify([...storedOrders, order]));

    // 🔹 Vaciar carrito después de confirmar pedido
    clearCart();

    setOrderCode(code);
    setShowModal(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      cardNumber: "",
      expiry: "",
      cvv: ""
    });
  };

  return (
    <div className="checkout-container">
      <h2>Finalizar Pedido</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <h3>Datos del Cliente</h3>
        <input type="text" name="name" placeholder="Nombre completo" className="input" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo electrónico" className="input" value={formData.email} onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Teléfono" className="input" value={formData.phone} onChange={handleChange} required />

        <h3>Dirección de Entrega</h3>
        <input type="text" name="address" placeholder="Dirección" className="input" value={formData.address} onChange={handleChange} required />
        <input type="text" name="city" placeholder="Ciudad / Provincia" className="input" value={formData.city} onChange={handleChange} required />
        <input type="text" name="postalCode" placeholder="Código Postal" className="input" value={formData.postalCode} onChange={handleChange} required />

        <h3>Datos de Pago</h3>
        <input type="text" name="cardNumber" placeholder="Número de tarjeta (16 dígitos)" className="input" value={formData.cardNumber} onChange={handleChange} maxLength="16" required />
        <input type="text" name="expiry" placeholder="MM/YY" className="input" value={formData.expiry} onChange={handleChange} required />
        <input type="text" name="cvv" placeholder="CVV (3 dígitos)" className="input" value={formData.cvv} onChange={handleChange} maxLength="3" required />

        <h3>Total a pagar: S/ {total.toFixed(2)}</h3>
        <button type="submit" className="btn btn-primary full-width">Confirmar pedido</button>
      </form>

      {/* 🔹 Modal de confirmación */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>✅ Pedido en curso</h3>
            <p>Tu código de pedido es: <strong>{orderCode}</strong></p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setShowModal(false);
                navigate("/");
              }}
            >
              Volver a la tienda
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;



