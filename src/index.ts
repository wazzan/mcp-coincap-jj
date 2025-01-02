import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const COINCAP_API_BASE = "https://api.coincap.io/v2";

// Define Zod schema for validation
const GetPriceArgumentsSchema = z.object({
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
}

interface AssetsResponse {
  data: CryptoAsset[];
}

// Format crypto price data
function formatPriceInfo(asset: CryptoAsset): string {
  const price = parseFloat(asset.priceUsd).toFixed(2);
  const change = parseFloat(asset.changePercent24Hr).toFixed(2);
  const volume = (parseFloat(asset.volumeUsd24Hr) / 1000000).toFixed(2);
  
  return [
    `${asset.name} (${asset.symbol})`,
    `Price: $${price}`,
    `24h Change: ${change}%`,
    `24h Volume: $${volume}M`,
    `Rank: #${asset.rank}`,
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

      // Get all assets to find the matching one
      const assetsData = await makeCoinCapRequest<AssetsResponse>("/assets");

      if (!assetsData) {
        return {
          content: [
            {
              type: "text",
              text: "Failed to retrieve cryptocurrency data",
            },
          ],
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

      const formattedInfo = formatPriceInfo(asset);

      return {
        content: [
          {
            type: "text",
            text: formattedInfo,
          },
        ],
      };
    } else {
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