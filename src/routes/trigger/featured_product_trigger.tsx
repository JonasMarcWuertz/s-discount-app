import React, { useState, useEffect } from 'react';
import { Product } from '../types';  // Importieren Sie den Product-Typ aus types.ts

export default function FeaturedProductTrigger() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedDiscountType, setSelectedDiscountType] = useState('');

  useEffect(() => {
    // Daten von get_shopify_data.ts abrufen
    fetch('/api/get_shopify_data')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('/api/manage_triggers', {
      method: 'POST',
      body: formData
    }).then(() => {
      // Nach erfolgreicher Speicherung weiterleiten oder Benachrichtigung anzeigen
    });
  };

  return (
    <div>
      <h1>Featured Product Trigger</h1>
      <form onSubmit={handleSubmit}>
        <h2>Rabattart auswählen</h2>
        <label htmlFor="discountTypeSelect">Rabattart:</label>
        <select id="discountTypeSelect" onChange={e => setSelectedDiscountType(e.target.value)} name="discountType">
          <option value="discount_percent">Rabatt in %</option>
          <option value="discount_flat">Pauschaler Rabatt</option>
          <option value="discount_per_unit">Rabatt pro Einheit</option>
          <option value="discount_per_unit_percent">Rabatt pro Einheit in %</option>
        </select>

        <h2>Produkte für den Trigger ausschließen</h2>
        <label htmlFor="excludeForTriggerSelect">Produkte ausschließen:</label>
        <select id="excludeForTriggerSelect" multiple name="excludeForTrigger">
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>  // Verwenden Sie product.name anstelle von product.title
          ))}
        </select>

        <h2>Produkte vom Rabatt ausschließen</h2>
        <label htmlFor="excludeForDiscountSelect">Produkte vom Rabatt ausschließen:</label>
        <select id="excludeForDiscountSelect" multiple name="excludeForDiscount">
          {products.map(product => (
            <option key={product.id} value={product.id}>{product.name}</option>  // Verwenden Sie product.name anstelle von product.title
          ))}
        </select>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
