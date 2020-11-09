# Description
this contract is a mining projrect for staking tokens to get SOTE

## A. Use cases for miner
1. stake - stake tokens to get SOTE 
2. exit - withdraw tokens staked and get all rewards
3. getReward - get all rewards
 
## B. Contract info
| interface                                  | type    | paras                                | description                                                  |
| ------------------------------------------ | ------- | ------------------------------------ | ------------------------------------------------------------ |
| `approve(address spender, uint256 amount)` | erc20   | spender:contract addr;amount:amount  | The approve interface is for authorizing the mining contract.|
| `stake(uint256 amount)`                    | soteria | amount:amount for staking            | users stake tokens                                           |
| `getReward()`                              | soteria |                                      | users get reward                                             |
| `exit()`                                   | soteria |                                      | users get the principal back and get the reward              |



