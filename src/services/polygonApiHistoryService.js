import fetch from 'node-fetch';
import { config } from '../config/env.js';
import { getFormattedDateRange } from '../utils/dateUtils.js';

export async function fetchAverage() {
  const { startDate, endDate } = getFormattedDateRange();
  const url = `https://api.polygon.io/v2/aggs/ticker/C:USDBRL/range/1/day/${startDate}/${endDate}?adjusted=true&sort=asc&apiKey=${config.apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status != 'OK'){
      throw new Error(data.message);
    }

    const closings = data.results.map(r => r.c);
    const avg = closings.reduce((acc, cur) => acc + cur, 0) / data.results.length;
    return avg;
  } catch (error) {
    throw new Error(`Error fetching average: ${error.message}`);
  }
}