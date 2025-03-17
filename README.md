# Crypto Price & Market Analysis MCP Server (JJ Fork)

[![smithery badge](https://smithery.ai/badge/@wazzan/mcp-coincap-jj)](https://smithery.ai/server/@wazzan/mcp-coincap-jj)
[![npm downloads](https://img.shields.io/npm/dt/@bujaayjaay/mcp-coincap-jj.svg)](https://www.npmjs.com/package/@bujaayjaay/mcp-coincap-jj)

<a href="https://glama.ai/mcp/servers/4lz96gw3yb">
  <img width="380" height="200" src="https://glama.ai/mcp/servers/4lz96gw3yb/badge" />
</a>

A Model Context Protocol (MCP) server that provides comprehensive cryptocurrency analysis using the CoinCap API. This server offers real-time price data, market analysis, and historical trends through an easy-to-use interface.

## 📌 About This Fork

This is a fork of the original [mcp-crypto-price](https://github.com/truss44/mcp-crypto-price) project by Tracey Russell

✅ What’s changed:
   - Updated to use the CoinCap v3 API (as v2 is being sunset).
   - Additional improvements and testing planned as time permits.

💡 Shoutout to Coin Cap for their “stake-to-API” subscription model—something I hope more API providers adopt. Subscription fatigue is real!

> **Package Note**: This project is hosted on GitHub as `wazzan/mcp-coincap-jj` but published to npm as `@bujaayjaay/mcp-coincap-jj`

---
## 🚀 Quick Start (For First-Time Users)

If you’re new to MCP servers, this guide provides step-by-step instructions to get you started.

I tested this on a Windows 11 VM to avoid cluttering my Mac—worked flawlessly!

Claude Desktop Config Locations:

- **MacOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

--- 
🟢 **Windows Setup Guide (Same Steps for Any MCP Client)**

1.	Install Node.js: (https://nodejs.org/en)
2.	Install Claude Desktop
3.	Configure Claude Desktop:
   - Open the hamburger menu (top-left corner) → File → Settings → Developer → Edit Config
   - This opens the claude_desktop_config.json file location in Windows Explorer.
   - Edit it with your favorite editor and add the following configuration (make sure to include all closing braces!):

> Note you can use these same instructions for any other MCP Client

```json
{
  "mcpServers": {
    "mcp-coincap-jj": {
      "command": "npx",
      "args": [
        "-y",
        "@bujaayjaay/mcp-coincap-jj"
      ],
      "env": {
        "COINCAP_API_KEY": "INPUT_YOUR_API_KEY_HERE"
      }
    }
  }
}
```

## 🛠️  Developer Setup (Local Installation)

For developers and contributors who want to work on the project locally:

##### 🖥️ Option 1: Install From npm

```bash
npm install @bujaayjaay/mcp-coincap-jj
```

##### 🖥️ Option 2: Clone & Run Locally

```bash
git clone https://github.com/wazzan/mcp-coincap-jj.git
cd mcp-coincap-jj
npm install        # Install dependencies
npm run build      # Compile TypeScript code
npm test           # Run tests to verify everything works
npm start          # Starts the MCP server locally
```

MCP Server Config for Local Testing (Windows Example)
- If running locally with npx, use this configuration in Claude Desktop (or any MCP client):

```json
{
  "mcpServers": {
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
  }
}
```
🔧 Pro Tip: Using absolute paths on Windows ensures a smooth experience, especially when running multiple environments.

### Smithery Installation (Optional but Easy)

Although it takes away some of the personal learning experience, it’s a great quick start!

1. Ensure you have Smithery installed for your Claude Desktop app
2. Run the following command:
   ```
   smithery install @bujaayjaay/mcp-coincap-jj
   ```
3. You'll be prompted to enter your CoinCap API key during setup

## UPDATE: CoinCap API Key

You now have to obtain an API Key from CoinCap to use the updated v3 API as v2 is being deprecated:
(https://pro.coincap.io/api-docs/)

## ⚡Usage - Tools

#### `get-crypto-price`

Gets current price and 24h stats for any cryptocurrency, including:
- Current price in USD
- 24-hour price change
- Trading volume
- Market cap
- Market rank

#### `get-market-analysis`

Provides detailed market analysis including:
- Top 5 exchanges by volume
- Price variations across exchanges
- Volume distribution analysis
- VWAP (Volume Weighted Average Price)

#### `get-historical-analysis`

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

- This project is a fork of Tracey Russell's [mcp-crypto-price](https://github.com/truss44/mcp-crypto-price),
- Tracey’s project was inspired by Alex Andru’s [coincap-mcp](https://github.com/QuantGeekDev/coincap-mcp) project.

## License

This project is licensed under the MIT License
