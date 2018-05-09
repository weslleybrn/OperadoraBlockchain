var Servicos = artifacts.require("./Servicos.sol");

module.exports = function(deployer) {
  deployer.deploy(Servicos);
};