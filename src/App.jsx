import React, { useEffect, useRef, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { isAddress } from 'viem';

const KOALIFIED_CONTRACT_ADDRESS =
  import.meta.env.VITE_KOALIFIED_CONTRACT_ADDRESS ||
  '0xe48c3334c53d2111111ec3e4527e86e9c44a7a11';

const ETH_RPCS = [
  'https://ethereum.publicnode.com',
  'https://rpc.flashbots.net',
  'https://eth.llamarpc.com',
];

function shortAddress(address) {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function getMultiplierFromCount(count) {
  if (count >= 10) return 3.0;
  if (count >= 5) return 2.0;
  if (count >= 1) return 1.5;
  return 1.0;
}

function getHolderLabel(nftCount, checking) {
  if (checking) return 'Checking NFTs...';
  if (nftCount >= 10) return '🏆 10+ NFT HOLDER';
  if (nftCount >= 5) return '🎋 5+ NFT HOLDER';
  if (nftCount >= 1) return '🐨 1+ NFT HOLDER';
  return 'No NFT detected';
}

async function checkNFTBalanceOriginal(walletAddr) {
  if (!walletAddr || !isAddress(walletAddr) || !isAddress(KOALIFIED_CONTRACT_ADDRESS)) {
    return 0;
  }

  const padded = walletAddr.slice(2).padStart(64, '0');
  const data = '0x70a08231' + padded;

  for (const rpc of ETH_RPCS) {
    try {
      const res = await fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_call',
          params: [{ to: KOALIFIED_CONTRACT_ADDRESS, data }, 'latest'],
        }),
      });

      const json = await res.json();

      if (json && json.result) {
        const count = parseInt(json.result, 16);
        console.log('Koalified NFTs via ' + rpc + ':', count);
        return Number.isNaN(count) ? 0 : count;
      }

      if (json && json.error) {
        console.warn('Koalified NFT RPC error via ' + rpc + ':', json.error);
      }
    } catch (e) {
      console.warn('Koalified NFT RPC failed ' + rpc + ':', e?.message || e);
    }
  }

  return 0;
}

export default function App() {
  const iframeRef = useRef(null);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [frameReady, setFrameReady] = useState(false);
  const [nftCount, setNftCount] = useState(0);
  const [checkingNfts, setCheckingNfts] = useState(false);

  const multiplier = getMultiplierFromCount(nftCount);
  const holderLabel = getHolderLabel(nftCount, checkingNfts);

  async function refreshNftBalance(currentAddress) {
    if (!currentAddress) {
      setNftCount(0);
      return;
    }

    setCheckingNfts(true);

    try {
      const count = await checkNFTBalanceOriginal(currentAddress);
      setNftCount(count);
    } catch (e) {
      console.warn('NFT check failed:', e);
      setNftCount(0);
    } finally {
      setCheckingNfts(false);
    }
  }

  function sendWalletToCampus() {
    if (!iframeRef.current?.contentWindow || !address) return;

    iframeRef.current.contentWindow.postMessage(
      {
        type: 'KOALIFIED_WALLET_CONNECTED',
        address,
        nftCount,
        multiplier,
        holderLabel,
      },
      window.location.origin
    );
  }

  useEffect(() => {
    if (isConnected && address) {
      refreshNftBalance(address);
    } else {
      setNftCount(0);
    }
  }, [address, isConnected]);

  useEffect(() => {
    sendWalletToCampus();
  }, [address, isConnected, frameReady, nftCount, multiplier, holderLabel]);

  useEffect(() => {
    const timer = setInterval(sendWalletToCampus, 2500);
    return () => clearInterval(timer);
  }, [address, nftCount, multiplier, holderLabel]);

  return (
    <div className="app-shell">
      <div className="wallet-bar">
        <div className="brand">
          <div>
            <div className="brand-title">KOALIFIED CAMPUS</div>
            <div className="brand-sub">
              {isConnected
                ? `Wallet connected! ${shortAddress(address)}`
                : 'Warm-Up Season'}
            </div>
          </div>
        </div>

        <div className="wallet-actions">
          <ConnectButton
            accountStatus={{
              smallScreen: 'avatar',
              largeScreen: 'avatar',
            }}
            chainStatus={{
              smallScreen: 'icon',
              largeScreen: 'icon',
            }}
            showBalance={false}
          />

          {isConnected && (
            <button className="tiny-btn" onClick={() => disconnect()}>
              Disconnect
            </button>
          )}
        </div>
      </div>

      {isConnected && (
        <div className="holder-status">
          <span>{shortAddress(address)}</span>
          <strong>x{multiplier}</strong>
          <span>{holderLabel}</span>
        </div>
      )}

      <iframe
        ref={iframeRef}
        src="/campus.html"
        title="Koalified Campus Game"
        className="campus-frame"
        onLoad={() => setFrameReady(true)}
        allow="clipboard-read; clipboard-write; fullscreen"
      />
    </div>
  );
}
