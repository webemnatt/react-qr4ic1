import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import './style.css';

export const ChartComponent = (props) => {
  const {
    data,
    colors: {
      backgroundColor = 'white',
      lineColor = '#348344',
      lineType = 0, //2 suaviza com curvas
      PriceLineStyle = 0,
      textColor = 'gray',
      areaTopColor = '#348344',
      areaBottomColor = 'white',
      topColor = 'white',
      bottomColor = 'white',
      // invertFilledArea=true,
      value = 1,
      colorType = 'gradient',
      TickMarkType = 1,
      baseLineVisible = false,
      baseLineColor = 'white',
      // CrosshairMode = 0,
      crosshairMarkerRadius = 5,
      PriceLineSource = 0, //0 ou 1
      AutoScaleMargins = 100, //TAMANHO DO GRÁFICO
      LastBar = 0,
      LastVisible = 1,
      //sem linhas ao fundo
      //ponto de interseção: uma única tag
      // apenas linha vertical de guia
      // eixo y sem linha à esquerda com cor de texto #707070
      //eixo x também sem linha indicando meses
      //https://tradingview.github.io/lightweight-charts/docs/api/enums/LineStyle
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
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      lineType,
      // topColor,
      // bottomColor,
      // invertFilledArea,
      value,
      colorType,
      // TickMarkType,
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
    // areaTopColor,
    // areaBottomColor,
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
  return (
    <div>
      <h1>Cotação</h1>
      <p>Mais informações</p>
      <ChartComponent {...props} data={initialData}></ChartComponent>
    </div>
  );
}
