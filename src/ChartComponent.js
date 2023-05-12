import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

import { chartLegend } from './chartLegend';

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
      width: chartContainerRef.current.clientWidth, //largura conforme o tamanho da janela do usuário
      height: 300, // altura fixa
      rightPriceScale: {
        // para remover a linha horizontal dos preços
        borderColor: 'transparent', // Define a cor da linha como transparente
        lineWidth: 0, // Define a largura da linha como 0
      },
      timeScale: {
        rightOffset: 0.2, //distância do gráfico em relação ao eixo y
        borderVisible: false, // remove a linha do eixo x
        tickMarkFormatter: (time) => {
          // formata a data
          const date = new Date(time);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          return `${day}/ ${month}`;
        },
      },
      grid: {
        // linhas-grades do gráfico
        vertLines: {
          color: '#e1e1e1',
          style: 3,
        },
        horzLines: {
          color: '#e1e1e1',
          style: 3,
        },
      },
      crosshair: {
        // linha-guia que acompanha o movimento do mouse
        mode: 1, // comportamento: 0: normal, 1: magnético
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
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor: '#2b4d32', // cor da linha do gráfico
      // lineStyle: 0, // 0: sólida; 1, pontilhado; 3, pontilhado maior; 4, mais espaçado
      // lineWidth: 3, // largura da linha do gráfico
      topColor: 'rgba(47, 120, 62, 0.46)', // cor do topo da área do gráfico abaixo da linha
      bottomColor: 'rgba(0, 0, 0, 0)', // cor da parte de baixo da área do gráfico depois da linha
      invertFilledArea: false,
      crosshairMarkerRadius: 6, // tamanho da bolinha
      crosshairMarkerBackgroundColor: '#348344', // cor da bolinha
      crosshairMarkerBorderWidth: 0, // cor da borda da bolinha
      lastValueVisible: false, //etiqueta fixa do último valor
      priceLineVisible: false, //linha pontilhada do último valor
    });
    newSeries.setData(data);

    newSeries.priceScale().applyOptions({
      autoScale: false, // disables auto scaling based on visible content
      scaleMargins: {
        top: 0.2,
        bottom: 0.2,
      },
    });

    chartLegend(chart,newSeries)

    window.addEventListener('resize', handleResize);

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
