# Koalified Campus — React + RainbowKit Vercel Version v2

## Install

```bash
npm install
```

## Local test

```bash
npm run dev
```

## Important: NFT Holder Multiplier

The holder multiplier is now technically ready through ERC721 `balanceOf`.

Before launch, create a file called `.env` in the project root and add:

```bash
VITE_KOALIFIED_CONTRACT_ADDRESS=0xYOUR_KOALIFIED_CONTRACT_ADDRESS
```

Then restart:

```bash
npm run dev
```

Multiplier logic:

- 0 NFTs = x1.0
- 1+ NFT = x1.5
- 5+ NFTs = x2.0
- 10+ NFTs = x3.0

## Vercel

Add the same environment variable in:

Vercel → Project Settings → Environment Variables

Name:

```txt
VITE_KOALIFIED_CONTRACT_ADDRESS
```

Value:

```txt
0xYOUR_KOALIFIED_CONTRACT_ADDRESS
```

Then redeploy.

## WalletConnect Project ID

Already configured:

`657c76b436df4cbecbb8fc273014e715`

## Changes in v2

- Removed Koala emoji from top-left brand.
- Removed extra wallet button inside Campus modal.
- Safety box restyled to black/yellow.
- Wallet status is shown through RainbowKit shell.
- NFT holder multiplier is ready via ERC721 balanceOf.
