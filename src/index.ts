import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const COINCAP_API_BASE = "https://api.coincap.io/v2";

// Define Zod schemas for validation
const GetPriceArgumentsSchema = z.object({
  symbol: z.string().min(1),
});

const GetMarketAnalysisSchema = z.object({
  symbol: z.string().min(1),
});

const GetHistoricalAnalysisSchema = z.object({
  symbol: z.string().min(1),
  interval: z.enum(['m5', 'm15', 'm30', 'h1', 'h2', 'h6', 'h12', 'd1']).default('h1'),
  days: z.number().min(1).max(30).default(7),
});

const GetExchangeAnalysisSchema = z.object({
  symbol: z.string().min(1),
});

// Create server instance
const server = new Server(
  {
    name: "mcp-crypto-price",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Helper function for making CoinCap API requests
async function makeCoinCapRequest<T>(endpoint: string): Promise<T | null> {
  const headers: HeadersInit = {};
  const apiKey = process.env.COINCAP_API_KEY;
  
  if (apiKey) {
    headers['Authorization'] = `Bearer ${apiKey}`;
  }

  try {
    const response = await fetch(`${COINCAP_API_BASE}${endpoint}`, {
      headers
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making CoinCap request:", error);
    return null;
  }
}

interface CryptoAsset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
  volumeUsd24Hr: string;
  marketCapUsd: string;
  supply: string;
  maxSupply: string;
  vwap24Hr: string;
}

interface AssetsResponse {
  data: CryptoAsset[];
}

interface HistoricalData {
  data: Array<{
    time: number;
    priceUsd: string;
    circulatingSupply: string;
    date: string;
  }>;
}

interface Market {
  exchangeId: string;
  baseSymbol: string;
  quoteSymbol: string;
  priceUsd: string;
  volumeUsd24Hr: string;
  percentExchangeVolume: string;
}

interface MarketsResponse {
  data: Market[];
}

// Format price info
function formatPriceInfo(asset: CryptoAsset): string {
  const price = parseFloat(asset.priceUsd).toFixed(2);
  const change = parseFloat(asset.changePercent24Hr).toFixed(2);
  const volume = (parseFloat(asset.volumeUsd24Hr) / 1000000).toFixed(2);
  const marketCap = (parseFloat(asset.marketCapUsd) / 1000000000).toFixed(2);
  
  return [
    `${asset.name} (${asset.symbol})`,
    `Price: $${price}`,
    `24h Change: ${change}%`,
    `24h Volume: $${volume}M`,
    `Market Cap: $${marketCap}B`,
    `Rank: #${asset.rank}`,
  ].join('\n');
}

// Format market analysis
function formatMarketAnalysis(asset: CryptoAsset, markets: Market[]): string {
  const totalVolume = markets.reduce((sum, market) => sum + parseFloat(market.volumeUsd24Hr), 0);
  const topMarkets = markets
    .sort((a, b) => parseFloat(b.volumeUsd24Hr) - parseFloat(a.volumeUsd24Hr))
    .slice(0, 5);

  const marketInfo = topMarkets.map(market => {
    const volumePercent = (parseFloat(market.volumeUsd24Hr) / totalVolume * 100).toFixed(2);
    const volume = (parseFloat(market.volumeUsd24Hr) / 1000000).toFixed(2);
    return `${market.exchangeId}: $${market.priceUsd} (Volume: $${volume}M, ${volumePercent}% of total)`;
  }).join('\n');

  return [
    `Market Analysis for ${asset.name} (${asset.symbol})`,
    `Current Price: $${parseFloat(asset.priceUsd).toFixed(2)}`,
    `24h Volume: $${(parseFloat(asset.volumeUsd24Hr) / 1000000).toFixed(2)}M`,
    `VWAP (24h): $${parseFloat(asset.vwap24Hr || '0').toFixed(2)}`,
    '\nTop 5 Markets by Volume:',
    marketInfo
  ].join('\n');
}

// Format historical analysis
function formatHistoricalAnalysis(asset: CryptoAsset, history: HistoricalData['data']): string {
  const currentPrice = parseFloat(asset.priceUsd);
  const oldestPrice = parseFloat(history[0].priceUsd);
  const highestPrice = Math.max(...history.map(h => parseFloat(h.priceUsd)));
  const lowestPrice = Math.min(...history.map(h => parseFloat(h.priceUsd)));
  const priceChange = ((currentPrice - oldestPrice) / oldestPrice * 100).toFixed(2);

  return [
    `Historical Analysis for ${asset.name} (${asset.symbol})`,
    `Period High: $${highestPrice.toFixed(2)}`,
    `Period Low: $${lowestPrice.toFixed(2)}`,
    `Price Change: ${priceChange}%`,
    `Current Price: $${currentPrice.toFixed(2)}`,
    `Starting Price: $${oldestPrice.toFixed(2)}`,
    '\nVolatility Analysis:',
    `Price Range: $${(highestPrice - lowestPrice).toFixed(2)}`,
    `Range Percentage: ${((highestPrice - lowestPrice) / lowestPrice * 100).toFixed(2)}%`
  ].join('\n');
}

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get-crypto-price",
        description: "Get current price and 24h stats for a cryptocurrency",
        inputSchema: {
          type: "object",
          properties: {
            symbol: {
              type: "string",
              description: "Cryptocurrency symbol (e.g., BTC, ETH)",
            },
          },
          required: ["symbol"],
        },
      },
      {
        name: "get-market-analysis",
        description: "Get detailed market analysis including top exchanges and volume distribution",
        inputSchema: {
          type: "object",
          properties: {
            symbol: {
              type: "string",
              description: "Cryptocurrency symbol (e.g., BTC, ETH)",
            },
          },
          required: ["symbol"],
        },
      },
      {
        name: "get-historical-analysis",
        description: "Get historical price analysis with customizable timeframe",
        inputSchema: {
          type: "object",
          properties: {
            symbol: {
              type: "string",
              description: "Cryptocurrency symbol (e.g., BTC, ETH)",
            },
            interval: {
              type: "string",
              description: "Time interval (m5, m15, m30, h1, h2, h6, h12, d1)",
              default: "h1",
            },
            days: {
              type: "number",
              description: "Number of days to analyze (1-30)",
              default: 7,
            },
          },
          required: ["symbol"],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "get-crypto-price") {
      const { symbol } = GetPriceArgumentsSchema.parse(args);
      const upperSymbol = symbol.toUpperCase();

      const assetsData = await makeCoinCapRequest<AssetsResponse>("/assets");
      if (!assetsData) {
        return {
          content: [{ type: "text", text: "Failed to retrieve cryptocurrency data" }],
        };
      }

      const asset = assetsData.data.find(
        (a) => a.symbol.toUpperCase() === upperSymbol
      );

      if (!asset) {
        return {
          content: [
            {
              type: "text",
              text: `Could not find cryptocurrency with symbol ${upperSymbol}`,
            },
          ],
        };
      }

      return {
        content: [{ type: "text", text: formatPriceInfo(asset) }],
      };
    } 
    else if (name === "get-market-analysis") {
      const { symbol } = GetMarketAnalysisSchema.parse(args);
      const upperSymbol = symbol.toUpperCase();

      const assetsData = await makeCoinCapRequest<AssetsResponse>("/assets");
      if (!assetsData) {
        return {
          content: [{ type: "text", text: "Failed to retrieve cryptocurrency data" }],
        };
      }

      const asset = assetsData.data.find(
        (a) => a.symbol.toUpperCase() === upperSymbol
      );

      if (!asset) {
        return {
          content: [{ type: "text", text: `Could not find cryptocurrency with symbol ${upperSymbol}` }],
        };
      }

      const marketsData = await makeCoinCapRequest<MarketsResponse>(`/assets/${asset.id}/markets`);
      if (!marketsData) {
        return {
          content: [{ type: "text", text: "Failed to retrieve market data" }],
        };
      }

      return {
        content: [{ type: "text", text: formatMarketAnalysis(asset, marketsData.data) }],
      };
    }
    else if (name === "get-historical-analysis") {
      const { symbol, interval, days } = GetHistoricalAnalysisSchema.parse(args);
      const upperSymbol = symbol.toUpperCase();

      const assetsData = await makeCoinCapRequest<AssetsResponse>("/assets");
      if (!assetsData) {
        return {
          content: [{ type: "text", text: "Failed to retrieve cryptocurrency data" }],
        };
      }

      const asset = assetsData.data.find(
        (a) => a.symbol.toUpperCase() === upperSymbol
      );

      if (!asset) {
        return {
          content: [{ type: "text", text: `Could not find cryptocurrency with symbol ${upperSymbol}` }],
        };
      }

      const end = Date.now();
      const start = end - (days * 24 * 60 * 60 * 1000);
      const historyData = await makeCoinCapRequest<HistoricalData>(
        `/assets/${asset.id}/history?interval=${interval}&start=${start}&end=${end}`
      );

      if (!historyData || !historyData.data.length) {
        return {
          content: [{ type: "text", text: "Failed to retrieve historical data" }],
        };
      }

      return {
        content: [{ type: "text", text: formatHistoricalAnalysis(asset, historyData.data) }],
      };
    }
    else {
      throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Invalid arguments: ${error.errors
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", ")}`
      );
    }
    throw error;
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Crypto Price MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});