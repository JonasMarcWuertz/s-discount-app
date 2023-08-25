import React from 'react';

export default function DiscountPercentFlat({ onChange }) {
    return (
      <div>
        <label htmlFor="discountPercentFlatInput">Rabatt in %:</label>
        <input 
          type="number" 
          id="discountPercentFlatInput"
          name="discountPercentFlat" 
          onChange={onChange} 
        />
      </div>
    );
}
