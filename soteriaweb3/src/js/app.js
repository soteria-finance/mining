let BN = require('bignumber.js');

var coinOne = new BN("1000000000000000000");
var coinOneHundred = new BN("100000000000000000000");

App = {
  account:null,
  web3Provider: null,
  contracts: {},
  reward: null,
  staking:null,
  soteria:null,
  rewardsAddress:"0xB48E1B16829C7f5Bd62B76cb878A6Bb1c4625D7A",
  stakingAddress:"0xc4CC602A7345518d0B7A84049d4Bc8575eBF3398",
  poolAddress:"0xda54ecF5A234D6CD85Ce93A955860834aCA75878",

  init: async function() {
    

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);


    //显示当前钱包地址
    App.account = window.ethereum.selectedAddress;
    $("#wallet").html(App.account);

    return App.initContract();
  },

  initContract: function() {
    //实例化合约
    $.getJSON('Erc20Standrad.json', function(data) {
      var ERC20Artifact = data;
      var erc20 = TruffleContract(ERC20Artifact);
      erc20.setProvider(App.web3Provider);
      erc20.at(App.rewardsAddress).then(function (instance) {
        App.reward = instance;

        // 初始化页面显示余额
        instance.balanceOf(App.account).then(function(amount) {
          $('#rbalance').html(amount.toString());
        })
      });
      erc20.at(App.stakingAddress).then(function (instance) {
        App.staking = instance;

        // 初始化页面显示余额
        instance.balanceOf(App.account).then(function(amount) {
          $('#sbalance').html(amount.toString());
        })
      });
      
    });

    $.getJSON('SoteriaRewards.json', function(data) {
      var SoteriaRewardsArtifact = data;
      var soteria = TruffleContract(SoteriaRewardsArtifact);
      soteria.setProvider(App.web3Provider);
      soteria.at(App.poolAddress).then(function (instance) {
        App.soteria = instance;

        // 初始化页面显示余额
        instance.balanceOf(App.account).then(function(amount) {
          $('#mbalance').html(amount.toString());
        });

        // 挖到的奖励
        instance.earned(App.account).then(function(amount) {
          $('#wbalance').html(amount.toString());
        });
      });
      
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '#mint', App.handleMint);
    $(document).on('click', '#approve', App.handleApprove);
    $(document).on('click', '#deposit', App.handleDeposit);
    $(document).on('click', '#claim', App.handleClaim);
    $(document).on('click', '#exit', App.handleExit);
  },

  // 铸造测试币
  handleMint: function(event) {
    event.preventDefault();

    // console.log(App.staking);
    App.staking.mint(App.account,coinOne.toString(),{from: App.account}).then(function () {
      location.reload();
    });
  },

  // erc20授权
  handleApprove: function(event) {
    event.preventDefault();

    var amount = $('#dAmout').val();
    //给pool合约授权充值数量
    App.staking.approve(App.poolAddress,new BN('1e+18').times(amount).toString(),{from: App.account}).then(function () {
      // location.reload();
    });
  },

  // 充值
  handleDeposit: function(event) {
    event.preventDefault();

    var amount = $('#dAmout').val();
    //抵押挖矿
    App.soteria.stake(new BN('1e+18').times(amount).toString(),{from: App.account}).then(function () {
      location.reload();
    });
  },

  // 领取收益
  handleClaim: function(event) {
    event.preventDefault();

    App.soteria.getReward({from: App.account}).then(function () {
      location.reload();
    });
  },

  // 退出
  handleExit: function(event) {
    event.preventDefault();

    App.soteria.exit({from: App.account}).then(function () {
      location.reload();
    });
  }

};



$(function() {
  $(window).load(function() {
    //metamask账户改变
    ethereum.on('accountsChanged', function (accounts) {
      App.account = accounts[0];
      $("#wallet").html(accounts[0]);
    });
    App.init();
  });
});
