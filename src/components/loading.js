// a ideia é exibir esta tela apenas quando estiver aguardando carregamento

//idealmente exibir quando o tooltip é apagado...

export function loading() {
  const container = document.getElementById('chart-area-container');
  //pseudo elemento criado ao dar o nome da classe
  container.className = 'chart-area-container';

  //imprimindo diretamente no lugar do gráfico:

  // const text = 'Carregando os dados...';
  // container.innerHTML = `<div class="isLoading"><span class="isLoading__text">${text}</span></div>`;
}
