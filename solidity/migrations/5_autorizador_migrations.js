var Autorizador = artifacts.require("./Autorizador.sol");

module.exports = function(deployer) {
  deployer.deploy(Autorizador);
};