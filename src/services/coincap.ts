import { COINCAP_API_BASE, CACHE_TTL } from '../config/index.js';
import type { AssetsResponse, CacheEntry, HistoricalData, MarketsResponse } from '../types/index.js';

const cache = new Map<string, CacheEntry<any>>();

// Expose cache clear function for testing
export function clearCache(): void {
  cache.clear();
}

function getCachedData<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;

  const now = Date.now();
  if (now - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }

  return entry.data;
}

function setCacheData<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

async function makeCoinCapRequest<T>(endpoint: string): Promise<T | null> {
  // Check cache first
  const cachedData = getCachedData<T>(endpoint);
  if (cachedData) {
    return cachedData;
  }

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
    const data = await response.json() as T;
    
    // Cache the successful response
    setCacheData(endpoint, data);
    
    return data;
  } catch (error) {
    console.error("Error making CoinCap request:", error);
    return null;
  }
}

export async function getAssets(): Promise<AssetsResponse | null> {
  return makeCoinCapRequest<AssetsResponse>('/assets');
}

export async function getMarkets(assetId: string): Promise<MarketsResponse | null> {
  return makeCoinCapRequest<MarketsResponse>(`/assets/${assetId}/markets`);
}

export async function getHistoricalData(
  assetId: string, 
  interval: string,
  start: number,
  end: number
): Promise<HistoricalData | null> {
  return makeCoinCapRequest<HistoricalData>(
    `/assets/${assetId}/history?interval=${interval}&start=${start}&end=${end}`
  );
}