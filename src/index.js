const EtherVaultArtifact = require('../build/contracts/EtherVault.json');
const HackerArtifact = require('../build/contracts/Hacker.json');
const { ethers } = require('ethers');

window.onload = async () => {
  // Connect
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  // Contracts
  const EtherVault = new ethers.Contract(
    EtherVaultArtifact.networks['5777'].address,
    EtherVaultArtifact.abi,
    provider
  ).connect(signer);

  const Hacker = new ethers.Contract(
    HackerArtifact.networks['5777'].address,
    HackerArtifact.abi,
    provider
  ).connect(signer);

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
  const depositEtherVault = async (event) => {
    event.preventDefault();
    await signer.sendTransaction({
      to: EtherVault.address,
      value: ethers.utils.parseEther(etherVault.deposit.amount.value),
    });
  };

  const withdrawEtherVault = async (event) => {
    event.preventDefault();
    await EtherVault.withdraw(
      ethers.utils.parseUnits(etherVault.withdraw.amount.value)
    );
  };

  const calculateVaultBalances = async () => {
    const vaultBalance = await provider.getBalance(EtherVault.address);
    const address = await signer.getAddress();
    const myBalance = await EtherVault.balance(address);
    etherVault.balance.innerText = ethers.utils.formatUnits(vaultBalance, 18);
    etherVault.myBalance.innerText = ethers.utils.formatUnits(myBalance, 18);
  };

  const fundHacker = async (event) => {
    event.preventDefault();
    await Hacker.fund({
      value: ethers.utils.parseEther(hacker.fund.amount.value),
    });
  };

  const depositHacker = async () => {
    Hacker.deposit();
  };

  const attackHacker = () => {
    Hacker.attack();
  };

  const withdrawHacker = () => {
    Hacker.withdraw();
  };

  const calculateHackerBalances = async () => {
    const hackerBalance = await provider.getBalance(Hacker.address);
    const hackerBalanceInVault = await EtherVault.balance(Hacker.address);
    hacker.balance.innerText = ethers.utils.formatUnits(hackerBalance, 18);
    hacker.vaultBalance.innerText = ethers.utils.formatUnits(
      hackerBalanceInVault,
      18
    );
  };

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
