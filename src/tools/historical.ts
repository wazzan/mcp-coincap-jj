import { z } from 'zod';
import { getAssets, getHistoricalData } from '../services/coincap.js';
import { formatHistoricalAnalysis } from '../services/formatters.js';

export const GetHistoricalAnalysisSchema = z.object({
  symbol: z.string().min(1),
  interval: z.enum(['m5', 'm15', 'm30', 'h1', 'h2', 'h6', 'h12', 'd1']).default('h1'),
  days: z.number().min(1).max(30).default(7),
});

export async function handleGetHistoricalAnalysis(args: unknown) {
  const { symbol, interval, days } = GetHistoricalAnalysisSchema.parse(args);
  const upperSymbol = symbol.toUpperCase();

  const assetsData = await getAssets();
  if (!assetsData) {
    return {
      content: [{ type: "text", text: "Failed to retrieve cryptocurrency data" }],
    };
  }

  const asset = assetsData.data.find(
    (a: { symbol: string; }) => a.symbol.toUpperCase() === upperSymbol
  );

  if (!asset) {
    return {
      content: [{ type: "text", text: `Could not find cryptocurrency with symbol ${upperSymbol}` }],
    };
  }

  const end = Date.now();
  const start = end - (days * 24 * 60 * 60 * 1000);
  const historyData = await getHistoricalData(asset.id, interval, start, end);

  if (!historyData || !historyData.data.length) {
    return {
      content: [{ type: "text", text: "Failed to retrieve historical data" }],
    };
  }

  return {
    content: [{ type: "text", text: formatHistoricalAnalysis(asset, historyData.data) }],
  };
}