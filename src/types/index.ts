export interface CacheEntry<T> {
  data: T;
  timestamp: number;
}
export interface CryptoAsset {
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

export interface AssetsResponse {
  data: CryptoAsset[];
}

export interface HistoricalData {
  data: Array<{
    time: number;
    priceUsd: string;
    circulatingSupply: string;
    date: string;
  }>;
}

export interface Market {
  exchangeId: string;
  baseSymbol: string;
  quoteSymbol: string;
  priceUsd: string;
  volumeUsd24Hr: string;
  percentExchangeVolume: string;
}

export interface MarketsResponse {
  data: Market[];
}