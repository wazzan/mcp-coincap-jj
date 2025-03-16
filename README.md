# Crypto Price & Market Analysis MCP Server (JJ Fork)

A Model Context Protocol (MCP) server that provides comprehensive cryptocurrency analysis using the CoinCap API. This server offers real-time price data, market analysis, and historical trends through an easy-to-use interface.

## About This Fork

This is a fork of the original [mcp-crypto-price](https://github.com/truss44/mcp-crypto-price) project by Tracey Russell, with updates to use the new v3 API and additional future changes/testing.

## Usage

Add this configuration to your Claude Desktop config file:

- **MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

## UPDATE: CoinCap API Key

You now have to obtain an API Key from CoinCap to use the updated v3 api as v2 is being deprecaited:
(https://pro.coincap.io/api-docs/)


Origonal mcpservers config
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

## Running  locally.

- Clone the repo
- `npm intall` # Install dependancies
- `npm run build` # Compile
- `npm test` # Test to make sure everything is fine
- `npm start` # Starts the server - You can exit this if you want to run it via npx at this point going forward (as per below)

Set up the mcpserver config as follows in your client (Claude Desktop App or any other compatabile client, I used a vm windows 11 here because I did not want to clog my mac with uncessary installations.)

```json
"mcp-coincap-jj": {
  "command": "cmd.exe",
  "args": [
    "/c",
    "C:\\Program Files\\nodejs\\npx.cmd",
    "C:\\Users\\YOUR-WINDOWS-USERNAME\\repos\\github\\mcp-coincap-jj"
  ],
  "env": {
    "COINCAP_API_KEY": "YOUR_API_KEY_HERE"
  },
  "disabled": false,
  "alwaysAllow": []
}
```
I found that using aboslute paths allows you to work flawlessly and negate any uncessary config issues. In the above example I pointed the path to my nodejs/npx installation and under it the path to the local repo. This allows the mcp client to run npx and load up the server on demand.

Launch Claude Desktop (or any other client) to start using the crypto analysis tools.

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
