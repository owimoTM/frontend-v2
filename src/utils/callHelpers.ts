import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { useMasterchef } from 'hooks/useContract'
import contracts from '../config/constants/contracts'
import { getAddress } from './addressHelpers'
import { getCookie, LamaCookieName } from './cookieHelper'
import multicall from "./multicall";
import lamaHerdAbi from "../config/abi/lamaHerd.json";

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

async function getReferral() {
  let referral = '0x0000000000000000000000000000000000000000'
  const cookie = getCookie(LamaCookieName);
  if (cookie != null) {
    try {
      const response: any = await fetch(`https://app.llamaswap.finance/toAddress/${cookie}`)
      const json = await response.json()
      referral = json.result;
    } catch (error) {
      // ignore
    }
  }
  return referral;
}

export const stake = async (masterChefContract, pid, amount, account) => {
  const referral = await getReferral();

  return masterChefContract.methods
    .deposit(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(), referral)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousStakeBnb = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(amount).times(new BigNumber(10).pow(18)).toString() })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(pid, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const getRefs = async (lamaHerdContract, account) => {
  if(!account) return [];
  const count = await getRefCount(lamaHerdContract, account);
  const calls = [];
  for (let index = 0; index < count; index++) {
    calls.push({
      address: getAddress(contracts.lamaHerd),
      name: "lamas",
      params: [account, index]
    })
  }

  const res = await multicall(lamaHerdAbi, calls)
  return res;
}

export const getRefCount = async (lamaHerdContract, account) => {
  return lamaHerdContract.methods
    .referredCount(account)
    .call();
}

export const getAccruedLama = async (lamaHerdContract, shepherd) => {
  return lamaHerdContract.methods
    .shepherdsFees(shepherd)
    .call();
}

export const harvestAccruedLama = async (lamaHerdContract, account) => {
  return lamaHerdContract.methods
    .withdrawShepherdReward()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}



export const sousUnstake = async (sousChefContract, amount, account) => {
  // shit code: hard fix for old CTK and BLK
  if (sousChefContract.options.address === '0x3B9B74f48E89Ebd8b45a53444327013a2308A9BC') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  if (sousChefContract.options.address === '0xBb2B66a2c7C2fFFB06EA60BeaD69741b3f5BF831') {
    return sousChefContract.methods
      .emergencyWithdraw()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        return tx.transactionHash
      })
  }
  return sousChefContract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const sousEmegencyUnstake = async (sousChefContract, amount, account) => {
  return sousChefContract.methods
    .emergencyWithdraw()
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const harvest = async (masterChefContract, pid, account) => {
  const referral = '0x0000000000000000000000000000000000000000'

  return masterChefContract.methods
    .deposit(pid, '0', referral)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const massHarvest = async (masterChefContract, pids, autoStake, extraStake, account) => {    
  const extra = extraStake ? new BigNumber( extraStake):new BigNumber(0);
  const extraStakeAmt = extra.times(new BigNumber(10).pow(18)).toString(); 
  return masterChefContract.methods
    .massHarvestStake(pids, autoStake, extraStakeAmt)
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvest = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit('0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}

export const soushHarvestBnb = async (sousChefContract, account) => {
  return sousChefContract.methods
    .deposit()
    .send({ from: account, value: new BigNumber(0) })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}
