const rewardsToken = artifacts.require("Erc20Standrad");
const stakingToken = artifacts.require("Erc20Standrad");
const soteriaRewards = artifacts.require("SoteriaRewards");

// ============ Main Migration ============

const migration = async (deployer, network, accounts) => {
  await Promise.all([
    deployToken(deployer, network, accounts),
  ]);
};

module.exports = migration;

async function deployToken(deployer, network, accounts) {
	// console.log(network);
  	await deployer.deploy(rewardsToken);
  	await deployer.deploy(stakingToken);
  	//deploy contract,set mining time - 7days = 604800 seconds
  	await deployer.deploy(soteriaRewards,stakingToken.address,accounts[0],rewardsToken.address,604800);

}
