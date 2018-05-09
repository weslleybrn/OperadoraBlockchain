var Prestadores = artifacts.require("./Prestadores.sol");

module.exports = function(deployer) {
  deployer.deploy(Prestadores);
};