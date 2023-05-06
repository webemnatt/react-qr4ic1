import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

import './style.scss';

const commoditiesList = ['Açúcar', 'Milho', 'Soja', 'Café', 'Boi'];

const newData = [
  { time: '2019-01-01', value: 25 },
  { time: '2019-01-02', value: 26 },
  { time: '2019-01-03', value: 24 },
  { time: '2019-01-04', value: 28 },
  { time: '2019-01-05', value: 27 },
];

const chartList = [
  {
    index: 0,
    name: 'Botão 1',
    data: [
      { time: '2019-01-01', value: 25 },
      { time: '2019-01-02', value: 26 },
      { time: '2019-01-03', value: 24 },
      { time: '2019-01-04', value: 28 },
      { time: '2019-01-05', value: 27 },
    ],
  },
  {
    index: 1,
    name: 'Botão 2',
    data: [
      { time: '2019-01-01', value: 30 },
      { time: '2019-01-02', value: 32 },
      { time: '2019-01-03', value: 29 },
      { time: '2019-01-04', value: 35 },
      { time: '2019-01-05', value: 33 },
    ],
  },
  {
    index: 2,
    name: 'Botão 3',
    data: [
      { time: '2019-01-01', value: 20 },
      { time: '2019-01-02', value: 22 },
      { time: '2019-01-03', value: 23 },
      { time: '2019-01-04', value: 18 },
      { time: '2019-01-05', value: 24 },
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

export const ChartComponent = (props) => {
  const {
    data,
    colors: {
      backgroundColor = '#ffffff',
      lineColor = '#2b4d32',
      lineType = 0,
      PriceLineStyle = 0,
      textColor = '#333333',
      fontFamily = "'Source Sans Pro', 'sans-serif'",
      fontSize = 12,
      areaTopColor = '#2b4d32',
      areaBottomColor = '#ffffff',
      topColor = 'white',
      bottomColor = 'white',
      invertFilledArea = true,
      value = 1,
      colorType = 'gradient',
      TickMarkType = 1,
      baseLineVisible = false,
      baseLineColor = 'white',
      CrosshairMode = 0,
      crosshairMarkerRadius = 5,
      PriceLineSource = 0,
      AutoScaleMargins = 100,
      LastBar = 0,
      LastVisible = 1,
    } = {},
  } = props;

  const chartContainerRef = useRef();
  const [chartData, setChartData] = useState(data);

  const [activeButton, setActiveButton] = useState(null);

  const addNewData = () => {
    newData;
    setChartData([...chartData, ...newData]);
  };

  const addNewData02 = () => {
    const dados = chartList.find((item) => item.name === 'Botão 3').data;
    setChartData([...chartData, ...newData]);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
    addNewData02();
  };

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: backgroundColor },
        textColor,
        fontSize,
        fontFamily,
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
        visible: false,
        labelVisible: true,
        labelBackgroundColor: 'pink',
      },
    });
    chart.timeScale().fitContent({
      borderColor: 'red',
      barSpacing: 10000,
      ticksVisible: false,
    });

    const newSeries = chart.addAreaSeries({
      lineColor,
      lineType,
      // topColor,
      // bottomColor,
      // invertFilledArea,
      value,
      colorType,
      TickMarkType,
      baseLineVisible,
      baseLineColor,
      // PriceLineStyle,
      // CrosshairMode,
      crosshairMarkerRadius,
      // PriceLineSource,
      AutoScaleMargins,
      // LastBar,
      // LastVisible,
      topColor: areaTopColor,
      bottomColor: areaBottomColor,
      crosshairMarkerBackgroundColor: '#348344',
      crosshairMarkerBorderWidth: 0,
    });
    newSeries.setData(chartData);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [
    chartData,
    backgroundColor,
    lineColor,
    textColor,
    fontSize,
    fontFamily,
    areaTopColor,
    areaBottomColor,
    AutoScaleMargins,
  ]);

  return (
    <div>
      <div className="commodities">
        {chartList.map((commodity, index) => (
          <button
            disabled={activeButton === `button${index + 1}`}
            onClick={() => {
              handleButtonClick(`button${index + 1}`);
            }}
          >
            {commodity.name}
          </button>
        ))}
      </div>
      <button onClick={addNewData}>Adicionar nova série de dados</button>

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
      <div ref={chartContainerRef} />
    </div>
  );
};

const initialData = [
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
];

export default function App(props) {
  return (
    <div>
      <div className="grafico-cotacoes-container">
        <ChartComponent {...props} data={initialData}></ChartComponent>
      </div>
    </div>
  );
}
