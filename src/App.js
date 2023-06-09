import React, { useState } from 'react';

import { chartList } from './chartlist';
import { ChartComponent } from './components/ChartComponent ';
import { StockExchange } from './StockExchange';

import './style.scss';

export default function Component(props) {
  const [selectedChartIndex, setSelectedChartIndex] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  const [disable, setDisable] = useState(false);

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (`${button}1`) setDisable(true);
  };

  const changeSelectedChart = (index) => {
    setSelectedChartIndex(index);
  };

  const selectedChartData = chartList[selectedChartIndex].data;

  return (
    <div className="grafico-cotacoes-container">
      <div className="grafico-cotacoes-commodities">
        {chartList.map((commodity, index) =>
          index == 0 ? (
            <button
              disabled={activeButton === `button${index + 1}` || !disable}
              onClick={() => {
                changeSelectedChart(index);
                handleButtonClick(`button${index + 1}`);
              }}
            >
              {commodity.name}
            </button>
          ) : (
            <button
              disabled={activeButton === `button${index + 1}`}
              onClick={() => {
                changeSelectedChart(index);
                handleButtonClick(`button${index + 1}`);
              }}
            >
              {commodity.name}
            </button>
          )
        )}
      </div>
      <StockExchange />

      <div id="chart-area-container" className="chart-area-container">
        <ChartComponent {...props} data={selectedChartData} />
      </div>

      <span className="update">Atualizado em: 28/01/2021 - 17h27</span>
    </div>
  );
}
