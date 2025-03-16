# Crypto Price & Market Analysis MCP Server (JJ Fork)

A Model Context Protocol (MCP) server that provides comprehensive cryptocurrency analysis using the CoinCap API. This server offers real-time price data, market analysis, and historical trends through an easy-to-use interface.

## About This Fork

This is a fork of the original [mcp-crypto-price](https://github.com/truss44/mcp-crypto-price) project by Tracey Russell, with updates to use the new API and additional future changes/testing.

## Usage

Add this configuration to your Claude Desktop config file:

- **MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-coincap-jj": {
      "command": "npx",
      "args": ["-y", "mcp-coincap-jj"]
    }
  }
}
```

## Optional: CoinCap API Key

For higher rate limits, add an API key to your configuration:

```json
{
  "mcpServers": {
    "mcp-coincap-jj": {
      "command": "npx",
      "args": ["-y", "mcp-coincap-jj"],
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

This project is a fork of Tracey Russell's [mcp-crypto-price](https://github.com/truss44/mcp-crypto-price), which was inspired by Alex Andru's [coincap-mcp](https://github.com/QuantGeekDev/coincap-mcp) project.

## License

This project is licensed under the MIT License
