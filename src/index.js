import { fetchAverage } from './services/polygonApiHistoryService.js';
import { fetchCurrentRate } from './services/tradingViewCurrentService.js';
import { showInfoDialog } from './utils/dialogUtils.js';
import { wait } from './utils/timeUtils.js';
import { config } from './config/env.js';

async function main() {
  try {
    let lastBestRate = Number.MAX_VALUE;
    const threshold = (1 - config.thresholdPercentage / 100);
    while(true){
      const avg = await fetchAverage();
      const currentRate = await fetchCurrentRate();

      console.log(`Cotação Atual: ${currentRate}`);
      console.log(`Média da Semana: ${avg}`);

      if (currentRate < avg * threshold && currentRate < lastBestRate * threshold) {
        showInfoDialog(`
          Considere comprar dólares agora! \n
          Cotação atual: ${currentRate.toLocaleString("pt-br")} \n
          Última melhor cotação: ${lastBestRate == Number.MAX_VALUE ? '-':  lastBestRate.toLocaleString("pt-br")} \n
          Média da última semana: ${avg.toLocaleString("pt-br")}
        `);
        lastBestRate = currentRate;
      }
      await wait(config.updateFrequencyInMinutes * 60);
    }
  } catch (error) {
    console.error(`Erro: ${error.message}`);
  }
}

main();
