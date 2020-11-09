let Web3 = require('web3');
let BN = require('bignumber.js');
const rewardsToken = artifacts.require("Erc20Standrad");
const stakingToken = artifacts.require("Erc20Standrad");
const soteriaRewards = artifacts.require("SoteriaRewards");

contract('soteria', (accounts) => {
  

  it('auto test', async () => {
    // rewardsToken and  stakingToken
    rewards = await rewardsToken.deployed();
    staking = await stakingToken.deployed();
    soteria = await soteriaRewards.deployed();

    console.log("rewardsToken contract address:"+rewards.address);
    console.log("stakingToken contract address:"+staking.address);

    // mint 100 tokens for mine
    await staking.mint(accounts[0],new BN("100000000000000000000"));
    const balance = await rewards.balanceOf(accounts[0]);
    assert.equal(balance.toString(),"100000000000000000000", "mint 100 test tokens");

    console.log("soteria contract address:"+soteria.address);

    soteriarewardsToken = await soteria.rewardsToken();
    assert.equal(soteriarewardsToken, rewards.address, "rewardsToken match");

    await staking.approve(soteria.address,100);
    allow = await staking.allowance(accounts[0],soteria.address);

    assert.equal(allow.toNumber(), 100, "approve the same amount");

    // [mining test] 1. transfer 10000 token to mint contract
    await rewards.mint(accounts[0],new BN("10000000000000000000000"));
    // transfer 
    await rewards.transfer(soteria.address,new BN("10000000000000000000000"));
    // query for the result
    number = await rewards.balanceOf(soteria.address);
    console.log("receive tokens:"+number.toString())

    // [mining test] 2. start mine, two addresses are  35% and 15%
    cAddr1 = "0x6Ecbe1DB9EF729CBe972C83Fb886247691Fb6beb";
    cAddr2 = "0x78dc5D2D739606d31509C31d654056A45185ECb6";
    await soteria.start([cAddr1,cAddr2],[35,15]);

  });


});
