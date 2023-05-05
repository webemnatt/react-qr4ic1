import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

import './style.scss';

const commoditiesList = ['Açúcar', 'Milho', 'Soja', 'Café', 'Boi'];

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
    newSeries.setData(data);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    fontSize,
    fontFamily,
    areaTopColor,
    areaBottomColor,
    AutoScaleMargins,
  ]);

  return <div ref={chartContainerRef} />;
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
  const [activeButton, setActiveButton] = useState(null);
  const chartContainerRef = useRef(null);
  const [showChart, setShowChart] = useState(false);

  const handleButtonClick = (button) => {
    setActiveButton(button);
    setShowChart(true);
  };

  return (
    <div>
      <div className="grafico-cotacoes-container">
        <div className="commodities">
          {commoditiesList.map((commodity, index) => (
            <button
              disabled={activeButton === `button${index + 1}`}
              onClick={() => handleButtonClick(`button${index + 1}`)}
            >
              {commodity}
            </button>
          ))}
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

        <ChartComponent {...props} data={initialData}></ChartComponent>
      </div>
    </div>
  );
}
