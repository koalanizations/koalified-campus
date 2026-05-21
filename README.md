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


## Daily Reset V7

This version adds:

- 1 completion per Dojo per UTC day
- UTC reset countdown
- 3 new questions per Dojo per day
- no repeated question per player/season via `question_history`
- `daily_dojo_completions` Supabase table support

Important: `question_history` must not be deleted during the season, otherwise repeated questions can happen.


## V8 Wallet UI

- Wallet connect button is visible only on the login screen.
- After entering the game, the header wallet actions are hidden to save mobile space.
- Mobile wallet button is smaller.


## V9 Wallet Button Login Fix

- Fixes login-screen detection for fixed-position start screen.
- Wallet button is visible on login.
- Wallet button is hidden only after the game actually starts.


## V10 Header Final

- Holder status is merged into the left header text.
- Right-side holder badge removed.
- Wallet connect buttons are visible only on login.
- Game-start detection is now checked directly through the same-origin iframe.
- Season Ranking area is no longer covered by the React wallet/holder UI.


## V11 Randomized Questions

- Questions are now randomized per player.
- Different players receive different daily question sets.
- Questions still never repeat for the same player.
- Daily UTC lock system remains unchanged.
