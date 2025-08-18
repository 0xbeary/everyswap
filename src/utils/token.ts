import { DataHandlerContext, BlockData } from "@subsquid/evm-processor";
import { BlockHandlerContext } from "./interfaces/interfaces";
import { StaticTokenDefinition } from "./staticTokenDefinition";
import { Store } from "@subsquid/typeorm-store";
import * as ERC20 from "../abi/ERC20";

// Token data cache
const tokenCache = new Map<string, {
  symbol?: string;
  name?: string;
  decimals?: number;
  totalSupply?: bigint;
}>();

export async function fetchTokensSymbol(
  ctx: BlockHandlerContext<Store>,
  tokenAddresses: string[]
) {
  const symbols = new Map<string, string>();

  for (const address of tokenAddresses) {
    // Check cache first
    let cached = tokenCache.get(address);
    if (!cached) {
      cached = {};
      tokenCache.set(address, cached);
    }

    if (cached.symbol) {
      symbols.set(address, cached.symbol);
      continue;
    }

    try {
      const contract = new ERC20.Contract(ctx, address);
      const symbol = await contract.symbol();
      cached.symbol = symbol;
      symbols.set(address, symbol);
    } catch (error) {
      // Fallback to static definition
      const value = StaticTokenDefinition.fromAddress(address)?.symbol;
      if (value == null) ctx.log.warn(`Missing symbol for token ${address}`);
      const fallbackSymbol = value || "unknown";
      cached.symbol = fallbackSymbol;
      symbols.set(address, fallbackSymbol);
    }
  }

  return symbols;
}

export async function fetchTokensName(
  ctx: BlockHandlerContext<Store>,
  tokenAddresses: string[]
) {
  const names = new Map<string, string>();

  for (const address of tokenAddresses) {
    // Check cache first
    let cached = tokenCache.get(address);
    if (!cached) {
      cached = {};
      tokenCache.set(address, cached);
    }

    if (cached.name) {
      names.set(address, cached.name);
      continue;
    }

    try {
      const contract = new ERC20.Contract(ctx, address);
      const name = await contract.name();
      cached.name = name;
      names.set(address, name);
    } catch (error) {
      // Fallback to static definition
      const value = StaticTokenDefinition.fromAddress(address)?.name;
      if (value == null) ctx.log.warn(`Missing name for token ${address}`);
      const fallbackName = value || "unknown";
      cached.name = fallbackName;
      names.set(address, fallbackName);
    }
  }

  return names;
}

export async function fetchTokensTotalSupply(
  ctx: BlockHandlerContext<Store>,
  tokenAddresses: string[]
) {
  const totalSupplies = new Map<string, bigint>();

  for (const address of tokenAddresses) {
    // Check cache first
    let cached = tokenCache.get(address);
    if (!cached) {
      cached = {};
      tokenCache.set(address, cached);
    }

    if (cached.totalSupply !== undefined) {
      totalSupplies.set(address, cached.totalSupply);
      continue;
    }

    try {
      const contract = new ERC20.Contract(ctx, address);
      const totalSupply = await contract.totalSupply();
      cached.totalSupply = totalSupply;
      totalSupplies.set(address, totalSupply);
    } catch (error) {
      // Fallback to 0 if contract call fails
      cached.totalSupply = 0n;
      totalSupplies.set(address, 0n);
    }
  }

  return totalSupplies;
}

export async function fetchTokensDecimals(
  ctx: BlockHandlerContext<Store>,
  tokenAddresses: string[]
) {
  const decimals = new Map<string, number>();

  for (const address of tokenAddresses) {
    // Check cache first
    let cached = tokenCache.get(address);
    if (!cached) {
      cached = {};
      tokenCache.set(address, cached);
    }

    if (cached.decimals !== undefined) {
      decimals.set(address, cached.decimals);
      continue;
    }

    try {
      const contract = new ERC20.Contract(ctx, address);
      const tokenDecimals = await contract.decimals();
      cached.decimals = tokenDecimals;
      decimals.set(address, tokenDecimals);
    } catch (error) {
      // Fallback to static definition or 18 as default
      const value = StaticTokenDefinition.fromAddress(address)?.decimals || 18;
      cached.decimals = value;
      decimals.set(address, value);
    }
  }

  return decimals;
}
