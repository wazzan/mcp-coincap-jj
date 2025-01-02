# Crypto Price & Market Analysis MCP Server

A Model Context Protocol (MCP) server that provides comprehensive cryptocurrency analysis using the CoinCap API. This server offers real-time price data, market analysis, and historical trends through an easy-to-use interface.

## Features

### 1. Basic Price Information (`get-crypto-price`)
- Real-time cryptocurrency prices
- 24-hour price changes
- Trading volume
- Market cap
- Market rank
- Supply information

### 2. Market Analysis (`get-market-analysis`)
- Top 5 exchanges by volume
- Price variations across exchanges
- Volume distribution analysis
- VWAP (Volume Weighted Average Price)
- Market dominance metrics

### 3. Historical Analysis (`get-historical-analysis`)
- Customizable time intervals (5min to 1 day)
- Historical price trends
- Price range analysis
- Volatility metrics
- Support for up to 30 days of historical data
- Configurable intervals: m5, m15, m30, h1, h2, h6, h12, d1

## Prerequisites

- Node.js (v16 or higher)
- npm
- Claude for Desktop or another MCP client

## Installation

1. Clone or download this repository:
```bash
git clone [repository-url]
cd mcp-crypto-price
```

2. Install dependencies:
```bash
npm install @modelcontextprotocol/sdk zod
npm install -D @types/node typescript
```

3. Create the project structure:
```bash
mkdir src
touch src/index.ts
```

4. Create configuration files:
   - Add the provided `package.json`
   - Add the provided `tsconfig.json`
   - Add the source code to `src/index.ts`

5. Build the server:
```bash
npm run build
```

## Configuration

### Basic Setup (No API Key)
The server works without authentication, but with rate limits. No additional configuration is needed.

### Enhanced Setup (With API Key)
For higher rate limits:

1. Get an API key from [CoinCap](https://coincap.io/)

2. Configure Claude for Desktop by editing the configuration file:

For MacOS (`~/Library/Application Support/Claude/claude_desktop_config.json`):
```json
{
    "mcpServers": {
        "mcp-crypto-price": {
            "command": "node",
            "args": [
                "/ABSOLUTE/PATH/TO/mcp-crypto-price/build/index.js"
            ],
            "env": {
              "COINCAP_API_KEY": "YOUR_API_KEY_HERE"
            }
        }
    }
}
```

For Windows (`%AppData%\Claude\claude_desktop_config.json`):
```json
{
    "mcpServers": {
        "mcp-crypto-price": {
            "command": "node",
            "args": [
                "C:\\ABSOLUTE\\PATH\\TO\\mcp-crypto-price\\build\\index.js"
            ],
            "env": {
              "COINCAP_API_KEY": "YOUR_API_KEY_HERE"
            }
        }
    }
}
```

## Usage

### With Claude for Desktop

1. Start Claude for Desktop
2. Look for the hammer icon indicating available MCP tools
3. Try queries like:

#### Basic Price Information
- "What's the current price of Bitcoin?"
- "Show me Ethereum's price"
- "What are the current stats for DOGE?"

#### Market Analysis
- "Show me market analysis for BTC"
- "What's the exchange distribution for ETH?"
- "Give me volume analysis for DOGE"

#### Historical Analysis
- "Show me historical analysis for BTC over the last 7 days"
- "What's the price trend for ETH using 1-hour intervals?"
- "Give me 30-day analysis for DOGE with daily intervals"

### API Reference

The server provides three main tools:

1. `get-crypto-price`
   - Input: `symbol` (e.g., "BTC")
   - Output: Current price, 24h change, volume, market cap, rank

2. `get-market-analysis`
   - Input: `symbol` (e.g., "BTC")
   - Output: Top exchanges, volume distribution, VWAP analysis

3. `get-historical-analysis`
   - Input:
     - `symbol`: Cryptocurrency symbol (e.g., "BTC")
     - `interval`: Time interval (m5, m15, m30, h1, h2, h6, h12, d1)
     - `days`: Number of days to analyze (1-30)
   - Output: Historical trends, price ranges, volatility metrics

## Development

### Project Structure

```
mcp-crypto-price/
├── src/
│   └── index.ts    # Main server code with all tools implementation
├── build/          # Compiled JavaScript
├── package.json    # Project configuration and dependencies
└── tsconfig.json   # TypeScript configuration
```

### Required Configuration Files

#### package.json
```json
{
  "name": "mcp-crypto-price",
  "version": "1.0.0",
  "type": "module",
  "bin": {
    "mcp-crypto-price": "./build/index.js"
  },
  "scripts": {
    "build": "tsc && node -e \"require('fs').chmodSync('build/index.js', '755')\"",
    "start": "node build/index.js"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "latest",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "typescript": "^5.3.3"
  },
  "files": [
    "build"
  ]
}
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Building

```bash
npm run build
```

### Running Locally

```bash
npm start
```

## Troubleshooting

1. **Server not showing in Claude for Desktop**
   - Check the configuration file path and syntax
   - Ensure all paths are absolute
   - Restart Claude for Desktop

2. **"Symbol not found" errors**
   - Verify the cryptocurrency symbol is correct
   - Check if the symbol is listed on CoinCap

3. **Rate limit errors**
   - Consider adding a CoinCap API key
   - Reduce request frequency

4. **Historical data issues**
   - Verify the interval parameter is valid
   - Ensure requested time range is within 30 days
   - Check if the cryptocurrency has sufficient historical data

5. **Build errors**
   - Ensure all dependencies are installed
   - Check TypeScript version compatibility
   - Verify file permissions

## Data Sources

All cryptocurrency data is provided by the CoinCap API 2.0. The server uses the following endpoints:
- `/assets` for basic cryptocurrency information
- `/assets/{id}/markets` for market analysis
- `/assets/{id}/history` for historical data

For more information about the API endpoints, visit the [CoinCap API documentation](https://docs.coincap.io/).

## Rate Limits

- Without API key: 200 requests per minute
- With API key: Increased limits (refer to CoinCap documentation)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. When contributing:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Security

- Never commit API keys to the repository
- Use environment variables for sensitive data
- Keep dependencies updated

## Acknowledgments

- Built using the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)
- Cryptocurrency data provided by [CoinCap API](https://docs.coincap.io/)
- Special thanks to the MCP and CoinCap teams

## Support

For issues related to:
- MCP implementation: Create an issue in this repository
- CoinCap API: Contact CoinCap support
- Claude for Desktop: Contact Anthropic support