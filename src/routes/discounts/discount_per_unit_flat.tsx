import React from 'react';

export default function DiscountPerUnitFlat({ onChange }) {
    return (
      <div>
        <label htmlFor="discountPerUnitFlatInput">Rabatt pro Einheit (Pauschal):</label>
        <input 
          type="number" 
          id="discountPerUnitFlatInput"
          name="discountPerUnitFlat" 
          onChange={onChange} 
        />
      </div>
    );
}
