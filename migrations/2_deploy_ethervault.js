const EtherVault = artifacts.require('EtherVault');

module.exports = function (deployer) {
  deployer.deploy(EtherVault);
};
