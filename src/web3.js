import Web3 from 'web3';

let web3;

// Check if Web3 has been injected by the browser (MetaMask)
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // Use MetaMask's provider
  web3 = new Web3(window.ethereum);
  // Request account access if needed
  window.ethereum.enable();
} else {
  // Fallback to a local provider
  const provider = new Web3.providers.HttpProvider(
    'http://localhost:8545' // Use your local Ganache instance
  );
  web3 = new Web3(provider);
}

export default web3;
