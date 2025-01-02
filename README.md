# Crypto Price MCP Server

A Model Context Protocol (MCP) server that fetches real-time cryptocurrency prices and statistics using the CoinCap API. This server can be used with Claude for Desktop or other MCP clients to get current cryptocurrency prices, 24-hour changes, trading volume, and market rank.

## Features

- Get real-time cryptocurrency prices from CoinCap
- Case-insensitive symbol lookup (e.g., "btc", "BTC", "Btc" all work)
- Returns comprehensive stats including:
  - Current price in USD
  - 24-hour price change percentage
  - 24-hour trading volume
  - Market rank
- Optional API key support for higher rate limits

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

[Your chosen license]

## Acknowledgments

- Built using the [Model Context Protocol (MCP)](https://github.com/anthropics/mcp)
- Cryptocurrency data provided by [CoinCap API](https://coincap.io/)
