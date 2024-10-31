import 'dotenv/config';

export const config = {
  apiKey: process.env.API_KEY,
  updateFrequencyInMinutes: process.env.UPDATE_FREQUENCY_MINUTES || 10,
  thresholdPercentage: process.env.THRESHOLD_PERCENTAGE || 0.5
};