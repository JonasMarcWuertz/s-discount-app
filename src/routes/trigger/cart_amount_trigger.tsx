import React, { useState } from 'react';
import { DiscountType } from '../types'; // Pfad zur types.ts-Datei

export default function CartAmountTrigger() {
  const [selectedDiscountType, setSelectedDiscountType] = useState<DiscountType | ''>(''); // Typisierung mit DiscountType

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
      <h1>Cart Amount Trigger</h1>
      <form onSubmit={handleSubmit}>
        <h2>Rabattart auswählen</h2>
        <label htmlFor="discountTypeSelect">Rabattart:</label>
        <select id="discountTypeSelect" onChange={e => setSelectedDiscountType(e.target.value as DiscountType)} name="discountType">
          <option value={DiscountType.PercentFlat}>Rabatt in %</option>
          <option value={DiscountType.Flat}>Pauschaler Rabatt</option>
          <option value={DiscountType.PerUnitFlat}>Rabatt pro Einheit</option>
          <option value={DiscountType.PerUnitPercent}>Rabatt pro Einheit in %</option>
        </select>

        <h2>Warenkorb-Gesamtbetrag für den Trigger</h2>
        <label htmlFor="cartAmountTriggerInput">Warenkorb Betrag:</label>
        <input id="cartAmountTriggerInput" type="number" name="cartAmountTrigger" placeholder="Betrag in €" />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
