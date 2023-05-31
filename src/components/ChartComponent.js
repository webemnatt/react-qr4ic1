import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

import { chartLegend } from './chartLegend';

import { loading } from './loading';
import { chartConfiguration } from '../configurations/chartConfigurations';

export const ChartComponent = ({ data, isLoading = false }) => {
  const { createChartOptions, areaSeriesOptions } = chartConfiguration;

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth, //largura conforme o tamanho da janela do usuário
      height: 291, // altura fixa
      //demais opções
      ...createChartOptions,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries(areaSeriesOptions);
    newSeries.setData(data);

    if (!isLoading) {
      chartLegend(chart, newSeries);
    } else {
      /*
      const legends = document.querySelectorAll('.chart-area-container');
      legends.forEach((item) => item.remove());
      */
      loading();
    }

    window.addEventListener('resize', handleResize);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [data, isLoading]);

  return <div ref={chartContainerRef}></div>;
};
