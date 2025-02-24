# Crypto Price & Market Analysis MCP Server
[![smithery badge](https://smithery.ai/badge/@truss44/mcp-crypto-price)](https://smithery.ai/server/@truss44/mcp-crypto-price) ![NPM Downloads](https://img.shields.io/npm/d18m/mcp-crypto-price)

A Model Context Protocol (MCP) server that provides comprehensive cryptocurrency analysis using the CoinCap API. This server offers real-time price data, market analysis, and historical trends through an easy-to-use interface.

## Usage

Add this configuration to your Claude Desktop config file:

- **MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-crypto-price": {
      "command": "npx",
      "args": ["-y", "mcp-crypto-price"]
    }
  }
}
```

## Optional: CoinCap API Key

For higher rate limits, add an API key to your configuration:

```json
{
  "mcpServers": {
    "mcp-crypto-price": {
      "command": "npx",
      "args": ["-y", "mcp-crypto-price"],
      "env": {
        "COINCAP_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

Launch Claude Desktop to start using the crypto analysis tools.

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

## Sample Prompts

- "What's the current price of Bitcoin?"
- "Show me market analysis for ETH"
- "Give me the 7-day price history for DOGE"
- "What are the top exchanges trading BTC?"
- "Show me the price trends for SOL with 1-hour intervals"

## Project Inspiration

This project was inspired by Alex Andru's [coincap-mcp](https://github.com/QuantGeekDev/coincap-mcp) project.

## License

This project is licensed under the MIT License
