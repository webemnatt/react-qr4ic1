import React from 'react';

const stockExchange = [
  {
    id: 1,
    name: 'Bolsa de Chicago',
    value: -120,
  },
];

export const StockExchange = () => {
  return stockExchange.map((item, id) => {
    let value = '';
    if (Math.sign(item.value) === 0) {
      value = 'stable';
    } else if (Math.sign(item.value) > 0) {
      value = 'positive';
    } else {
      value = 'negative';
    }

    return (
      <div className="quotation" key={id}>
        <span className="quotation__name">{item.name}</span>
        <span className={`quotation__value quotation__value-${value}`}>
          {Math.abs(item.value)} pts
        </span>
      </div>
    );
  });
};
