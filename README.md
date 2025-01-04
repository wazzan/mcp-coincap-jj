# Crypto Price & Market Analysis MCP Server

A Model Context Protocol (MCP) server that provides comprehensive cryptocurrency analysis using the CoinCap API. This server offers real-time price data, market analysis, and historical trends through an easy-to-use interface.

## 🚀 Quick Start

First, clone and build the repository:

```bash
git clone https://github.com/truss44/mcp-crypto-price.git
cd mcp-crypto-price
npm install
npm run build
```

Then add this configuration to your Claude Desktop config file:

- **MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`  
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-crypto-price": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/mcp-crypto-price/build/index.js"]
    }
  }
}
```

### Prerequisites

- Node.js 18+
- npm
- Claude for Desktop or another MCP client

Then, launch Claude Desktop and you're ready to go!

## Sample Prompts

- "What's the current price of Bitcoin?"
- "Show me market analysis for ETH"
- "Give me the 7-day price history for DOGE"
- "What are the top exchanges trading BTC?"
- "Show me the price trends for SOL with 1-hour intervals"

## Tools

#### get-crypto-price

Gets current price and 24h stats for any cryptocurrency, including:
- Current price in USD
- 24-hour price change
- Trading volume
- Market cap
- Market rank

#### get-market-analysis

Provides detailed market analysis including:
- Top 5 exchanges by volume
- Price variations across exchanges
- Volume distribution analysis
- VWAP (Volume Weighted Average Price)

#### get-historical-analysis

Analyzes historical price data with:
- Customizable time intervals (5min to 1 day)
- Support for up to 30 days of historical data
- Price trend analysis
- Volatility metrics
- High/low price ranges

## Development - local build

To build it locally:

- **MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-crypto-price": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/mcp-crypto-price/build/index.js"]
    }
  }
}
```

## Development

Install dependencies:

```bash
npm install
```

Build the server:

```bash
npm run build
```

For development with auto-rebuild:

```bash
npm run watch
```

## Optional: CoinCap API Key

While not required, you can add an API key for higher rate limits:

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

## Project Inspiration

This project was inspired by Alex Andru's [coincap-mcp](https://github.com/QuantGeekDev/coincap-mcp) project.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.