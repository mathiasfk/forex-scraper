import { get } from 'https';

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
    const value = res_data.substring(idx + anchor.length, idx + anchor.length + 6);

    console.log(value)
  });
});
req.on('error', function(err) {
  console.log("Request error: " + err.message);
});