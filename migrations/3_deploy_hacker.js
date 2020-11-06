const EtherVault = artifacts.require('EtherVault');
const Hacker = artifacts.require('Hacker');

module.exports = function (deployer) {
  deployer.deploy(Hacker, EtherVault.networks['5777'].address);
};
