const { ethers } = require('ethers');

window.onload = async () => {
  // Connect
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Contracts

  // Elements
  const etherVault = {
    refresh: document.getElementById('vault-refresh'),
    myBalance: document.getElementById('vault-my-balance'),
    balance: document.getElementById('vault-balance'),
    deposit: {
      amount: document.getElementById('vault-deposit-amount'),
      form: document.getElementById('vault-deposit-form'),
    },
    withdraw: {
      amount: document.getElementById('vault-withdraw-amount'),
      form: document.getElementById('vault-withdraw-form'),
    },
  };

  const hacker = {
    refresh: document.getElementById('hacker-refresh'),
    balance: document.getElementById('hacker-balance'),
    vaultBalance: document.getElementById('hacker-vault-balance'),
    fund: {
      amount: document.getElementById('hacker-fund-amount'),
      form: document.getElementById('hacker-fund-form'),
    },
    deposit: document.getElementById('hacker-deposit'),
    attack: document.getElementById('hacker-attack'),
    withdraw: document.getElementById('hacker-withdraw'),
  };

  // Functions
  const depositEtherVault = async (event) => {};

  const withdrawEtherVault = async (event) => {};

  const calculateVaultBalances = async () => {};

  const fundHacker = async (event) => {};

  const depositHacker = async () => {};

  const attackHacker = () => {};

  const withdrawHacker = () => {};

  const calculateHackerBalances = async () => {};

  // Listeners
  etherVault.deposit.form.onsubmit = depositEtherVault;
  etherVault.withdraw.form.onsubmit = withdrawEtherVault;
  etherVault.refresh.onclick = calculateVaultBalances;

  hacker.fund.form.onsubmit = fundHacker;
  hacker.deposit.onclick = depositHacker;
  hacker.attack.onclick = attackHacker;
  hacker.withdraw.onclick = withdrawHacker;
  hacker.refresh.onclick = calculateHackerBalances;

  // Immediately executed
  calculateVaultBalances();
  calculateHackerBalances();
};
