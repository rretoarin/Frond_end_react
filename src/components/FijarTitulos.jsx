import React, { useState, useEffect } from "react";
import banner1 from "../assets/images/banner1.jpg";
import banner2 from "../assets/images/banner2.jpg";
import "../index.css";

// Etiquetas visibles al usuario
const categoryLabels = {
  all: "Todos",
  cleaning: "Limpieza",
  canned: "Conservas",
  dairy: "Lácteos",
  drinks: "Bebidas"
};

function Fijar({ category, setCategory }) {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [banner1, banner2];

  // rotar banners cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <>
      {/* NAVBAR DE CATEGORÍAS (sticky debajo del header) */}
      <div className="categories-navbar sticky-categories">
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button
            key={key}
            className={`nav-btn ${category === key ? "active" : ""}`}
            onClick={() => setCategory(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* BANNER ROTATIVO (fluye normal, no sticky) */}
      <div className="banner-container">
        <img
          src={banners[currentBanner]}
          alt="Promoción"
          className="banner-img"
        />
      </div>
    </>
  );
}

export default Fijar;

