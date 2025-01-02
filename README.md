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
- Claude for Desktop (for use with Claude) or another MCP client

## Installation

1. Clone or download this repository:

```bash
git clone [repository-url]
cd mcp-crypto-price
```

2. Install dependencies:

```bash
npm install
```

3. Build the server:

```bash
npm run build
```

## Configuration

### Basic Setup (No API Key)

The server works without any API key, subject to CoinCap's basic rate limits. No additional configuration is needed.

### Enhanced Setup (With API Key)

To use higher rate limits:

1. Get an API key from [CoinCap](https://coincap.io/)

2. Configure Claude for Desktop by editing the configuration file:

For MacOS (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "mcp-crypto-price": {
      "command": "node",
      "args": ["/ABSOLUTE/PATH/TO/mcp-crypto-price/build/index.js"],
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
      "args": ["C:\\ABSOLUTE\\PATH\\TO\\mcp-crypto-price\\build\\index.js"],
      "env": {
        "COINCAP_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

Replace `YOUR_API_KEY_HERE` with your actual CoinCap API key.

## Usage

### With Claude for Desktop

1. Start Claude for Desktop
2. Look for the hammer icon indicating available MCP tools
3. Try queries like:
   - "What's the current price of Bitcoin?"
   - "Show me Ethereum's price"
   - "What are the current stats for DOGE?"

### With Other MCP Clients

The server exposes a single tool:

- Name: `get-mcp-crypto-price`
- Description: Get current price and 24h stats for a cryptocurrency
- Input: Cryptocurrency symbol (e.g., "BTC", "ETH")
- Output: Formatted text with price, change, volume, and rank information

## Development

### Project Structure

```
mcp-crypto-price/
├── src/
│   └── index.ts    # Main server code
├── build/          # Compiled JavaScript
├── package.json
└── tsconfig.json
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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Built using the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)
- Cryptocurrency data provided by [CoinCap API](https://coincap.io/)
