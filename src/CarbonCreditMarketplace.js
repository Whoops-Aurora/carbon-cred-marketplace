import React, { useState, useEffect } from 'react';
import web3 from './web3'; // Import initialized Web3 instance

function CarbonCreditMarketplace() {
  const [accounts, setAccounts] = useState([]);
  const [connected, setConnected] = useState(false); // State variable to track connection status

  useEffect(() => {
    const getAccounts = async () => {
      // Get the accounts from MetaMask
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
      // Update connection status
      setConnected(accounts.length > 0);
    };

    // Call getAccounts initially and set up event listener for account change
    getAccounts();

    // Set up event listener for MetaMask account change
    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      // Clean up event listener on unmount
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []); // Run once on component mount

  const handleAccountsChanged = async () => {
    // Update accounts when MetaMask account changes
    const updatedAccounts = await web3.eth.getAccounts();
    setAccounts(updatedAccounts);
    // Update connection status
    setConnected(updatedAccounts.length > 0);
  };

  const toggleConnection = async () => {
    if (!connected) {
      // Connect to MetaMask
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const updatedAccounts = await web3.eth.getAccounts();
        setAccounts(updatedAccounts);
        // Update connection status
        setConnected(updatedAccounts.length > 0);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      // Disconnect from MetaMask
      if (window.ethereum.disconnect) {
        window.ethereum.disconnect();
      } else {
        // Fallback to resetting the accounts array
        setAccounts([]);
      }
      // Update connection status
      setConnected(false);
    }
  };

  return (
    <div>
      <h2>Carbon Credit Marketplace</h2>
      <p>Connected Ethereum Accounts:</p>
      <ul>
        {accounts.map(account => (
          <li key={account}>{account}</li>
        ))}
      </ul>
      <button onClick={toggleConnection}>{connected ? 'Disconnect' : 'Connect to wallet'}</button>
    </div>
  );
}

export default CarbonCreditMarketplace;
