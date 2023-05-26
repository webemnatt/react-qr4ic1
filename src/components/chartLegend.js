export function chartLegend(chart, series) {
  const container = document.getElementById('chart-area-container');

  // Create and style the legend html element
  const legend = document.createElement('div');
  legend.className = 'legend';
  container.appendChild(legend);

  // update legend
  chart.subscribeCrosshairMove((param) => {
    if (
      param.point === undefined ||
      !param.time ||
      param.point.x < 0 ||
      param.point.x > container.clientWidth ||
      param.point.y < 0 ||
      param.point.y > container.clientHeight
    ) {
      legend.style.display = 'none';
    } else {
      legend.style.display = 'block';
      const data = param.seriesData.get(series);
      const price = data.value !== undefined ? data.value : data.close;
      const value = 'Default';
      legend.innerHTML = `<span class='legend__price'
      >
    ${Math.round(100 * price) / 100}</span>
    <span class='legend__value'>${value}</span>`;

      const legendWidth = 98;
      const legendHeight = -40;
      const legendMargin = 12;

      const coordinate = series.priceToCoordinate(price);
      let shiftedCoordinate = param.point.x - 50;
      if (coordinate === null) {
        return;
      }
      shiftedCoordinate = Math.max(
        0,
        Math.min(container.clientWidth - legendWidth, shiftedCoordinate)
      );
      const coordinateY =
        coordinate - legendHeight - legendMargin > 0
          ? coordinate - legendHeight - legendMargin
          : Math.max(
              0,
              Math.min(
                container.clientHeight - legendHeight - legendMargin,
                coordinate + legendMargin
              )
            );
      legend.style.left = shiftedCoordinate + 'px';
      legend.style.top = coordinateY + 'px';

      /*
      const y = param.point.y;
		let left = param.point.x + legendMargin;
		if (left > container.clientWidth - legendWidth) {
			left = param.point.x - legendMargin - legendWidth;
		}

		let top = y + legendMargin;
		if (top > container.clientHeight - legendHeight) {
			top = y - legendHeight - legendMargin;
		}
		legend.style.left = left + 'px';
		legend.style.top = top + 'px';
      */
    }
  });
}
