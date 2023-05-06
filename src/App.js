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
      },

      width: chartContainerRef.current.clientWidth,
      height: 300,
      crosshair: {
        vertLine: {
          color: '#333',
          width: 1,
          style: 0,
        },
        horzLine: {
          color: '#333',
          width: 1,
          style: 0,
        },
      },
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: '#2b4d32',
      topColor: '#2b4d32',
      bottomColor: '#ffffff',
      crosshairMarkerBackgroundColor: '#348344',
      crosshairMarkerBorderWidth: 0,
    });
    newSeries.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [data, colors]);

  return <div ref={chartContainerRef} />;
};

const chartList = [
  {
    name: 'Açúcar',
    data: [
      { time: '2018-12-22', value: 32.51 },
      { time: '2018-12-23', value: 31.11 },
      { time: '2018-12-24', value: 27.02 },
      { time: '2018-12-25', value: 27.32 },
      { time: '2018-12-26', value: 25.17 },
      { time: '2018-12-27', value: 28.89 },
      { time: '2018-12-28', value: 25.46 },
      { time: '2018-12-29', value: 23.92 },
      { time: '2018-12-30', value: 22.68 },
      { time: '2018-12-31', value: 22.67 },
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
        <button
          disabled={activeButton === `button1` || !disable}
          onClick={() => {
            changeSelectedChart(0);
            handleButtonClick(`button1`);
          }}
        >
          {chartList[0].name}
        </button>
        <button
          disabled={activeButton === `button2`}
          onClick={() => {
            changeSelectedChart(1);
            handleButtonClick(`button2`);
          }}
        >
          {chartList[1].name}
        </button>
        <button
          disabled={activeButton === `button3`}
          onClick={() => {
            changeSelectedChart(2);
            handleButtonClick(`button3`);
          }}
        >
          {chartList[2].name}
        </button>
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
