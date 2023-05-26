import React, { useState } from 'react';

export function Button({ quoteValue, children, onChange, ...rest }) {
  return (
    <>
      <input
        type="radio"
        name="chart-radio-button"
        className="grafico-cotacoes-commodities__input"
        id={quoteValue}
        value={quoteValue}
        onChange={onChange}
        {...rest}
      />
      <label
        htmlFor={quoteValue}
        className="grafico-cotacoes-commodities__button"
      >
        {children}
      </label>
    </>
  );
}
