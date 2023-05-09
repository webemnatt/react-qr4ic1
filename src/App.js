import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

export const ChartComponent = ({ data, colors = {} }) => {
  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: {
          type: ColorType.Solid,
          color: '#ffffff',
        },
        textColor: '#333',
        lastValueVisible: false,
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
      rightOffset: 0,

      timeScale: {
        borderVisible: true,
        tickMarkFormatter: (time) => {
          const date = new Date(time);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          return `${day}/ ${month}`;
        },
      },
      grid: {
        vertLines: {
          color: '#e1e1e1',
          style: 2,
        },
        horzLines: {
          color: '#e1e1e1',
          style: 2,
        },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          labelVisible: false, //etiqueta exibida ao mover o cursor
          color: '#333',
          width: 1,
          style: 0,
        },
        horzLine: {
          // labelVisible: false, //etiqueta exibida ao mover o cursor
          color: '#333',
          width: 1,
          style: 0,
          labelVisible: false,
          labelBackgroundColor: 'rgba(29, 52, 34, 0.9)',
          labelFontSize: 12,
        },
      },
    });

    chart.timeScale().applyOptions({
      rightOffset: -1,
    });

    chart.timeScale().time;

    chart.timeScale().fitContent();

    const dateFormatter = (timestamp) => {
      const date = new Date(timestamp * 1000);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month}`;
    };

    const newSeries = chart.addAreaSeries({
      lineColor: '#2b4d32',
      topColor: '#2b4d32',
      bottomColor: '#ffffff',
      crosshairMarkerBackgroundColor: '#348344',
      crosshairMarkerBorderWidth: 0,
      lastValueVisible: false, //etiqueta fixa do último valor
      priceLineVisible: false, //linha pontilhada do último valor
    });
    newSeries.setData(data);

    newSeries.priceScale().applyOptions({
      autoScale: false, // disables auto scaling based on visible content
      scaleMargins: {
        top: 0.1,
        bottom: 0,
      },
    });

    //inserindo uma legenda...
    const container = document.getElementById('container');

    const legend = document.createElement('div');
    legend.className = 'legend';
    container.appendChild(legend);

    const symbolValue = document.createElement('span');
    symbolValue.className = 'symbolValue';
    legend.appendChild(symbolValue);

    chart.subscribeCrosshairMove((param) => {
      let priceFormatted = '';
      let symbolName = '';

      if (param.time) {
        const data = param.seriesData.get(newSeries);
        const price = data.value !== undefined ? data.value : data.close;
        priceFormatted = price;
        symbolName = `Default`;
      }

      const x = param.point && param.point.x;
      const y = param.point && param.point.y;

      if (param.point && param.point.x && param.point && param.point.y) {
        legend.style.left = `${x - 100}px`; // Adicione um valor de deslocamento horizontal
        legend.style.top = `${y + 80}px`; // Adicione um valor de deslocamento vertical
        legend.style.padding = `4px 10px`;
      } else {
        legend.style.left = `0px`; // Adicione um valor de deslocamento horizontal
        legend.style.top = `0px`; // Adicione um valor de deslocamento vertical
        legend.style.padding = `0px`;
      }

      legend.innerHTML = `${priceFormatted} ${symbolName}`;
    });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [data, colors]);

  return (
    <div>
      <div id="container" />
      <div ref={chartContainerRef}></div>
    </div>
  );
};

const chartList = [
  {
    name: 'Açúcar',
    data: [
      { time: '2018-12-02', value: 32.51 },
      { time: '2018-12-03', value: 31.11 },
      { time: '2018-12-04', value: 27.02 },
      { time: '2018-12-05', value: 27.32 },
      { time: '2018-12-06', value: 25.17 },
      { time: '2018-12-07', value: 28.89 },
      { time: '2018-12-08', value: 25.46 },
      { time: '2018-12-09', value: 23.92 },
      { time: '2018-12-10', value: 22.68 },
      { time: '2018-12-11', value: 22.67 },
    ],
  },
  {
    name: 'Milho',
    data: [
      { time: '2018-12-22', value: 52.51 },
      { time: '2018-12-23', value: 51.11 },
      { time: '2018-12-24', value: 57.02 },
      { time: '2018-12-25', value: 57.32 },
      { time: '2018-12-26', value: 55.17 },
      { time: '2018-12-27', value: 58.89 },
      { time: '2018-12-28', value: 55.46 },
      { time: '2018-12-29', value: 53.92 },
      { time: '2018-12-30', value: 52.68 },
      { time: '2018-12-31', value: 52.67 },
    ],
  },
  {
    name: 'Soja',
    data: [
      { time: '2018-12-22', value: 82.51 },
      { time: '2018-12-23', value: 81.11 },
      { time: '2018-12-24', value: 77.02 },
      { time: '2018-12-25', value: 87.32 },
      { time: '2018-12-26', value: 85.17 },
      { time: '2018-12-27', value: 88.89 },
      { time: '2018-12-28', value: 85.46 },
      { time: '2018-12-29', value: 53.92 },
      { time: '2018-12-30', value: 82.68 },
      { time: '2018-12-31', value: 82.67 },
    ],
  },
];

const stockExchange = [
  {
    id: 1,
    name: 'Bolsa de Chicago',
    value: -120,
  },
];

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
      <div className="commodities">
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
      {stockExchange.map((item, id) => {
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
      })}

      <div>
        <ChartComponent {...props} data={selectedChartData} />
      </div>
    </div>
  );
}
