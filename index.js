import { get } from 'https';
import dialog from 'dialog';
import 'dotenv/config';

const apiKey = process.env.API_KEY;

function formatDate(date) {
  return new Date(date).toISOString().substring(0,10);
}

const today = new Date();
const endDate = new Date(today).setDate(today.getDate() - 1);
const startDay = new Date(today).setDate(today.getDate() - 7);

const formattedEndDate = formatDate(endDate);
const formattedStartDate = formatDate(startDay);

function fetchAverage() {
  var options = {
    host: 'api.polygon.io',
    port: 443,
    path: `/v2/aggs/ticker/C:USDBRL/range/1/day/${formattedStartDate}/${formattedEndDate}?adjusted=true&sort=asc&apiKey=${apiKey}`
  };

  return new Promise((resolve, reject) => {
    let res_data = '';
    
    const req = get(options, (response) => {
      response.on('data', (chunk) => {
        res_data += chunk;
      });
      
      response.on('end', () => {
        try {
          const json = JSON.parse(res_data);
          const closings = json.results.map(r => r.c);
          console.log(closings);
          const avg = closings.reduce((acc, cur) => acc + cur, 0) / json.results.length;
          resolve(avg);
        } catch (error) {
          reject('Erro ao analisar JSON: ' + error.message);
        }
      });
    });

    req.on('error', (err) => {
      reject('Erro na requisição: ' + err.message);
    });
  });
}

const avg = await fetchAverage();

var options = {
    host: 'es.tradingview.com',
    port: 443,
    path: '/symbols/USDBRL/',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'
    }
  };
var req = get(options, function(response) {
  var res_data = '';
  response.on('data', function(chunk) {
    res_data += chunk;
  });
  response.on('end', function() {
    const anchor = "El tipo de cambio actual de USDBRL es ";
    const idx = res_data.indexOf(anchor);
    const value = parseFloat(res_data.substring(idx + anchor.length, idx + anchor.length + 6).replace(",","."));

    console.log(value);

    if(value < avg){
      dialog.info(`
        Considere comprar dólares agora! \n
        Quotação atual: ${value.toLocaleString("pt-br")} \n
        Média da última semana: ${avg.toLocaleString("pt-br")}
        `);
    }
  });
});
req.on('error', function(err) {
  console.log("Request error: " + err.message);
});
