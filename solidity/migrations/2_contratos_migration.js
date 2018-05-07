var Contratos = artifacts.require("./Contratos.sol");

module.exports = function(deployer) {
  deployer.deploy(Contratos);
};
