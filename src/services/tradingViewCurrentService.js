import fetch from 'node-fetch';

export async function fetchCurrentRate() {
  const url = 'https://es.tradingview.com/symbols/USDBRL/';
  const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';

  try {
    const response = await fetch(url, { headers: { 'User-Agent': userAgent } });
    const html = await response.text();
    const anchor = "El tipo de cambio actual de USDBRL es ";
    const idx = html.indexOf(anchor);
    const value = parseFloat(html.substring(idx + anchor.length, idx + anchor.length + 6).replace(",", "."));
    return value;
  } catch (error) {
    throw new Error(`Error fetching current rate: ${error.message}`);
  }
}
