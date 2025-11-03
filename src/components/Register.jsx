import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

     
      const updatedUsers = [...storedUsers, formData];

     
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      alert('Registro falló. Intente nuevamente.');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="login-container">
      <div className="card">
        <h2 className="login-title">Registro de Usuario</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Nombres"
            className="input"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Apellidos"
            className="input"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            className="input"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Dirección"
            className="input"
            value={formData.address}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary full-width">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

