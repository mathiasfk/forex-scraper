import { fetchAverage } from './services/polygonApiHistoryService.js';
import { fetchCurrentRate } from './services/tradingViewCurrentService.js';
import { showInfoDialog } from './utils/dialogUtils.js';

async function main() {
  try {
    const avg = await fetchAverage();
    const currentRate = await fetchCurrentRate();

    console.log(`Cotação Atual: ${currentRate}`);
    console.log(`Média da Semana: ${avg}`);

    if (currentRate < avg) {
      showInfoDialog(`
        Considere comprar dólares agora! \n
        Cotação atual: ${currentRate.toLocaleString("pt-br")} \n
        Média da última semana: ${avg.toLocaleString("pt-br")}
      `);
    }
  } catch (error) {
    console.error(`Erro: ${error.message}`);
  }
}

main();
