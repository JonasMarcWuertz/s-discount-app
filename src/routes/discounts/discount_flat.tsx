import React from 'react';

export default function DiscountFlat({ onChange }) {
    return (
      <div>
        <label htmlFor="discountFlatInput">Pauschaler Rabatt:</label>
        <input 
          type="number" 
          id="discountFlatInput"
          name="discountFlat" 
          onChange={onChange} 
        />
      </div>
    );
}
