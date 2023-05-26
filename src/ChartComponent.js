import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

import { chartLegend } from './chartLegend';
import { chartConfiguration } from './configurations/chartConfigurations';

export const ChartComponent = ({ data }) => {
  const { createChartOptions, areaSeriesOptions, priceScaleOptions } =
    chartConfiguration;

  const chartContainerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth, //largura conforme o tamanho da janela do usuário
      height: 291, // altura fixa
      ...createChartOptions,
    });
    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries(areaSeriesOptions);
    newSeries.setData(data);

    newSeries.priceScale().applyOptions(priceScaleOptions);

    chartLegend(chart, newSeries);

    window.addEventListener('resize', handleResize);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);

      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef}></div>;
};
