export function loading() {
  const container = document.getElementById('chart-area-container');

  // Create and style the legend html element
  const loading = document.createElement('span');
  loading.className = 'loading';
  container.appendChild(loading);
  // container.innerHTML = `<span class=loading></span>`;
}
