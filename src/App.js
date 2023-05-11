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
      width: chartContainerRef.current.clientWidth, //largura conforme o tamanho da janela do usuário
      height: 300, // altura fixa
      rightPriceScale: {
        // para remover a linha horizontal dos preços
        borderColor: 'transparent', // Define a cor da linha como transparente
        lineWidth: 0, // Define a largura da linha como 0
      },
      timeScale: {
        rightOffset: -0.5, //distância do gráfico em relação ao eixo y
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
        top: 0.1,
        bottom: 0,
      },
    });

    //inserindo uma legenda...
    const container = document.getElementById('container');

    const legend = document.createElement('div');
    // legend.innerHTML="legend: "; // único necessário para exibir a legenda móvel
    legend.className = 'legend';
    container.appendChild(legend);

    const symbolValue = document.createElement('span');
    symbolValue.className = 'legend__symbol_value';
    legend.appendChild(symbolValue);

    const symbolName = document.createElement('span');
    symbolName.className = 'legend__symbol_name';
    legend.appendChild(symbolName);

    chart.subscribeCrosshairMove((param) => {
      let priceFormatted = ``;
      let symbolFormatted = ``;

      if (param.time) {
        const data = param.seriesData.get(newSeries);
        const price = data.value !== undefined ? data.value : data.close;
        priceFormatted = price;
        symbolFormatted = `Default`;
      }

      const cursorPositionX = param.point && param.point.x;
      const cursorPositionY = param.point && param.point.y;

      if (param.point && param.point.x && param.point && param.point.y) {
        const legendWidth = 80;
        const legendHeight = 80;
        const legendMargin = 20;

        let left = cursorPositionX + legendMargin;
        if (left > container.clientWidth - legendWidth) {
          left = cursorPositionX - legendMargin - legendWidth;
        }

        let top = cursorPositionY + legendMargin;
        if (top > container.clientHeight - legendHeight) {
          top = param.point.y + legendHeight + legendMargin;
        }
        legend.style.left = left + 'px'; // Adicione um valor de deslocamento horizontal
        legend.style.top = top + 'px'; // Adicione um valor de deslocamento vertical

        legend.style.padding = `4px 10px`;
        symbolValue.style.paddingRight = `5px`;

        console.log('if ', param.point.y);
      } else {
        legend.style.left = `0px`;
        legend.style.top = `0px`;
        legend.style.padding = `0px`;
        symbolValue.style.paddingRight = `0px`;
        console.log('else', param.point && param.point.y);
      }
      symbolValue.innerHTML = `${priceFormatted}`;
      symbolName.innerHTML = `${symbolFormatted}`;
    });

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
      { time: '2018-12-12', value: 52.51 },
      { time: '2018-12-13', value: 51.11 },
      { time: '2018-12-14', value: 57.02 },
      { time: '2018-12-15', value: 57.32 },
      { time: '2018-12-16', value: 55.17 },
      { time: '2018-12-17', value: 58.89 },
      { time: '2018-12-18', value: 55.46 },
      { time: '2018-12-19', value: 53.92 },
      { time: '2018-12-20', value: 52.68 },
      { time: '2018-12-22', value: 32.51 },
      { time: '2018-12-23', value: 31.11 },
      { time: '2018-12-24', value: 27.02 },
      { time: '2018-12-25', value: 27.32 },
      { time: '2018-12-26', value: 25.17 },
      { time: '2018-12-27', value: 28.89 },
      { time: '2018-12-28', value: 25.46 },
      { time: '2018-12-29', value: 23.92 },
      { time: '2018-12-30', value: 22.68 },
      { time: '2018-12-31', value: 52.67 },
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

      <ChartComponent {...props} data={selectedChartData} />

      <span className="update">Atualizado em: 28/01/2021 - 17h27</span>
    </div>
  );
}
