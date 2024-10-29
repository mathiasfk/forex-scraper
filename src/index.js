import { fetchAverage } from './services/polygonApiHistoryService.js';
import { fetchCurrentRate } from './services/tradingViewCurrentService.js';
import { showInfoDialog } from './utils/dialogUtils.js';
import { wait } from './utils/timeUtils.js';
import { config } from './config/env.js';

async function main() {
  try {
    while(true){
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
      await wait(config.updateFrequencyInMinutes * 60);
    }
  } catch (error) {
    console.error(`Erro: ${error.message}`);
  }
}

main();
