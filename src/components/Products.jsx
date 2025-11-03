import React, { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import Fijar from "./FijarTitulos";

// imágenes de productos
import aceImg from "../assets/images/detergenteace.jpg";
import arielImg from "../assets/images/detergenteliquidoariel.jpg";
import jabonbarraImg from "../assets/images/jabonbolivarbarra.jpg";
import atunImg from "../assets/images/atun.jpg";
import atunrealImg from "../assets/images/atunreal.jpg";
import atuntunyImg from "../assets/images/atuntuny.jpg";
import lechegloriaImg from "../assets/images/lechegloria.jpg";
import yogurtImg from "../assets/images/yogurtgloria.jpg";
import lechelaivetImg from "../assets/images/lechelaive.jpg";
import cocacolaImg from "../assets/images/cocacola.jpg";
import inkakolaImg from "../assets/images/inkakola.jpg";
import crushImg from "../assets/images/crush.jpg";

// Lista de productos
const PRODUCT_LIST = [
  { id: 1, name: "Detergente Ace", price: 4.5, description: "Detergente Ace en 1 kg, saca todas las manchas al bolsillo de todos", image: aceImg, category: "cleaning" },
  { id: 2, name: "Detergente Ariel Líquido", price: 6.5, description: "Detergente Ariel Líquido en 1 lt, perfecto para sacar grasa en prendas blancas", image: arielImg, category: "cleaning" },
  { id: 3, name: "Jabón Bolivar Barra", price: 3.5, description: "Jabón Bolivar en barra tu mejor aliado en sacar manchas de salsas y dejando un aroma a flores", image: jabonbarraImg, category: "cleaning" },
  { id: 4, name: "Atún Tuna", price: 4.5, description: "Atún Tuna, tu mejor aliada para ensaladas, listo para preparar al instante", image: atunImg, category: "canned" },
  { id: 5, name: "Atún Real", price: 4.5, description: "Atún Real, preferido por todas las familias del Perú", image: atunrealImg, category: "canned" },
  { id: 6, name: "Atún Tuny", price: 5.5, description: "Atún Tuny, preferido por todos los ingreídos del hogar", image: atuntunyImg, category: "canned" },
  { id: 7, name: "Leche Gloria", price: 3.5, description: "Leche Gloria, más de 60 años acompañando a los niños del Perú", image: lechegloriaImg, category: "dairy" },
  { id: 8, name: "Yogurt Gloria", price: 4.5, description: "Yogurt Gloria, el preferido en los desayunos de los engreídos de casa", image: yogurtImg, category: "dairy" },
  { id: 9, name: "Leche Laive", price: 4.5, description: "Leche Laive tu mejor aliada para todos los desayuno con tus engreídos", image: lechelaivetImg, category: "dairy" },
  { id: 10, name: "Coca Cola", price: 2.9, description: "Coca Cola, te acompaña desde toda tu vida, lista para la mesa", image: cocacolaImg, category: "drinks" },
  { id: 11, name: "Inka Kola", price: 2.5, description: "Inka Kola, la bebida peruana preferida por todos lo que sabemos del buen sabor.", image: inkakolaImg, category: "drinks" },
  { id: 12, name: "Crush", price: 2.0, description: "Crush, atrévete a vivir la vida, ve un paso adelante siempre", image: crushImg, category: "drinks" },
];

function Products({ searchQuery }) {
  const [category, setCategory] = useState("all");
  const { addToCart } = useCart();

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return PRODUCT_LIST.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const query = searchQuery ? searchQuery.toLowerCase() : "";
      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [category, searchQuery]);

  return (
    <div className="products-page">
      {/* Categorías + Banner */}
      <Fijar category={category} setCategory={setCategory} />

      {/* PRODUCTOS */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">
            No hay productos que coincidan con la búsqueda.
          </p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card product-card">
              <img src={product.image} alt={product.name} />
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">S/ {product.price.toFixed(2)}</span>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;






