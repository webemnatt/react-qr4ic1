export const ChartLegend = () => {
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
    } else {
      legend.style.left = `0px`;
      legend.style.top = `0px`;
      legend.style.padding = `0px`;
      symbolValue.style.paddingRight = `0px`;
    }
    symbolValue.innerHTML = `${priceFormatted}`;
    symbolName.innerHTML = `${symbolFormatted}`;
  });
};
