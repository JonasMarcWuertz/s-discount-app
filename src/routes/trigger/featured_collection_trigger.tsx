import React, { useState, useEffect } from 'react';
import { Collection } from '../types'; // Pfad zur types.ts-Datei

export default function FeaturedCollectionTrigger() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedDiscountType, setSelectedDiscountType] = useState('');

  useEffect(() => {
    // Daten von get_shopify_data.ts abrufen
    fetch('/api/get_shopify_data')
      .then(response => response.json())
      .then(data => {
        setCollections(data.collections);
      });
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => { // Typisierung des Events
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement); // Typisierung des Targets
    fetch('/api/manage_triggers', {
      method: 'POST',
      body: formData
    }).then(() => {
      // Nach erfolgreicher Speicherung weiterleiten oder Benachrichtigung anzeigen
    });
  };

  return (
    <div>
      <h1>Featured Collection Trigger</h1>
      <form onSubmit={handleSubmit}>
        <h2>Rabattart auswählen</h2>
        <label htmlFor="discountTypeSelect">Rabattart:</label>
        <select id="discountTypeSelect" onChange={e => setSelectedDiscountType(e.target.value)} name="discountType">
          <option value="discount_percent">Rabatt in %</option>
          <option value="discount_flat">Pauschaler Rabatt</option>
          <option value="discount_per_unit">Rabatt pro Einheit</option>
          <option value="discount_per_unit_percent">Rabatt pro Einheit in %</option>
        </select>

        <h2>Kollektionen für den Trigger ausschließen</h2>
        <label htmlFor="excludeForTriggerSelect">Kollektionen ausschließen:</label>
        <select id="excludeForTriggerSelect" multiple name="excludeForTrigger">
          {collections.map(collection => (
            <option key={collection.id} value={collection.id}>{collection.title}</option>
          ))}
        </select>

        <h2>Kollektionen vom Rabatt ausschließen</h2>
        <label htmlFor="excludeForDiscountSelect">Kollektionen vom Rabatt ausschließen:</label>
        <select id="excludeForDiscountSelect" multiple name="excludeForDiscount">
          {collections.map(collection => (
            <option key={collection.id} value={collection.id}>{collection.title}</option>
          ))}
        </select>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
