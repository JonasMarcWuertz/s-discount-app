import React from 'react';

export default function DiscountPerUnitPercent({ onChange }) {
    return (
      <div>
        <label htmlFor="discountPerUnitPercentInput">Rabatt pro Einheit in %:</label>
        <input 
          type="number" 
          id="discountPerUnitPercentInput"
          name="discountPerUnitPercent" 
          onChange={onChange} 
        />
      </div>
    );
}
