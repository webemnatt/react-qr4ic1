import { ColorType } from 'lightweight-charts';

export const chartConfiguration = {
  areaSeriesOptions: {
    lineColor: '#2b4d32',
    topColor: 'rgba(47, 120, 62, 0.46)',
    bottomColor: 'rgba(0, 0, 0, 0)',
    crosshairMarkerRadius: 6,
    crosshairMarkerBackgroundColor: '#348344',
    crosshairMarkerBorderWidth: 0,
    lastValueVisible: false,
    priceLineVisible: false,
  },
  createChartOptions: {
    layout: {
      background: {
        type: ColorType.Solid,
        color: '#ffffff',
      },
      textColor: '#333',
      lastValueVisible: false, //false: remove a label fixa com o último valor
    },
    rightPriceScale: {
      // para remover a linha horizontal dos preços
      borderColor: 'transparent', // Define a cor da linha como transparente
      lineWidth: 0, // Define a largura da linha como 0
      //priceScaleOptions: {},
      autoScale: false,
      scaleMargins: {
        top: 0.1,
        bottom: 0.2,
      },
    },
    timeScale: {
      minBarSpacing: 0.1,
      rightBarStaysOnScroll: false,
      fixLeftEdge: true, //se true, impede do gráfico ser achatado para esquerda, permitindo apenas expandir
      fixRightEdge: true, //se true, impede do gráfico ser achatado para direita, permitindo apenas expandir
      rightOffset: 0.2, //distância do gráfico em relação ao eixo y
      borderVisible: false, // remove a linha do eixo x
      tickMarkFormatter: (time) => {
        let [year, month, day] = time.split('-');
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
    handleScroll: {
      // desabilita scroll do gráfico
      mouseWheel: false,
      pressedMouseMove: false,
      horzTouchDrag: false,
      vertTouchDrag: false,
    },
    handleScale: {
      axisPressedMouseMove: false,
      mouseWheel: false, //se true, espreme ou achata o gráfico
      pinch: false,
    },
  },
};
