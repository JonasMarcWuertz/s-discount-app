import React, { useState, useEffect } from 'react';
import { ProductVariant } from '../types';  // Importieren Sie den ProductVariant-Typ aus types.ts

export default function ProductVariantTrigger() {
  
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedDiscountType, setSelectedDiscountType] = useState('');

  useEffect(() => {
    // Daten von get_shopify_data.ts abrufen
    fetch('/api/get_shopify_data')
      .then(response => response.json())
      .then(data => {
        setVariants(data.variants);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // Daten an manage_triggers.ts senden
    fetch('/api/manage_triggers', {
      method: 'POST',
      body: formData
    }).then(() => {
      // Nach erfolgreicher Speicherung weiterleiten oder Benachrichtigung anzeigen
    });
  };

  return (
    <div>
      <h1>Product Variant Trigger</h1>
      <form onSubmit={handleSubmit}>
        <h2>Rabattart auswählen</h2>
        <label htmlFor="discountTypeSelect">Rabattart:</label>
        <select id="discountTypeSelect" onChange={e => setSelectedDiscountType(e.target.value)} name="discountType">
          <option value="discount_percent">Rabatt in %</option>
          <option value="discount_flat">Pauschaler Rabatt</option>
          <option value="discount_per_unit">Rabatt pro Einheit</option> 
          <option value="discount_per_unit_percent">Rabatt pro Einheit in %</option>
        </select>

        <h2>Produktvarianten für den Trigger ausschließen</h2>
         <label htmlFor="excludeForTriggerSelect">Produktvarianten ausschließen:</label>
         <select id="excludeForTriggerSelect" multiple name="excludeForTrigger">
         {variants.map(variant => (
         <option key={variant.id} value={variant.id}>{variant.name}</option>  // Verwenden Sie variant.name anstelle von variant.title
          ))}
        </select>

        <h2>Produktvarianten vom Rabatt ausschließen</h2>
         <label htmlFor="excludeForDiscountSelect">Produktvarianten vom Rabatt ausschließen:</label>
         <select id="excludeForDiscountSelect" multiple name="excludeForDiscount">
         {variants.map(variant => (
         <option key={variant.id} value={variant.id}>{variant.name}</option>  // Verwenden Sie variant.name anstelle von variant.title
         ))}
        </select>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
