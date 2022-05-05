/* eslint-disable no-await-in-loop */
import Web3 from 'web3'
import { getWeb3 } from 'utils/web3'

const API_URL = process.env.REACT_APP_API_URL;

export const addDB = async (list) => {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', '*');

  headers.append('GET', 'POST', 'OPTIONS');

  const res = await fetch(`${API_URL}/api/addList`, {
      method: "POST",
      headers,
      body: JSON.stringify({
          list
      })
  });
  const response = await res.json();
  let result = false;
  if(response){
    result = true;
  }
  return result;
}

export const addClaimList = async (list, amount, claimContract, account) => {
  // console.log('addClaimList')
  // console.log(list);
  try {
    return claimContract.methods.addClaimUsers(list, Web3.utils.toWei(amount, "wei")).send({from: account}).on('transactionHash', (tx) => {
      return tx.transactionHash
    });
  } catch (err) {
    console.log(err)
    return console.error('err')
  }
}

export const addRewardList = async(list, claimContract, account) => {
  try {
    return claimContract.methods.addRewardUsers(list).send({from: account}).on('transactionHash', (tx) => {
      return tx.transactionHash
    });
  } catch (err) {
    console.log(err)
    return console.error('err')
  }
}

export const getNewTweetedRefereeList = async () => {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', '*');

  headers.append('GET', 'POST');

  const res = await fetch(`${API_URL}/api/getTweetedReferee`, {
      method: "POST",
      headers,
      body: JSON.stringify({})
  });
  const response = await res.json();
  return response;
}

export const confirmNewTweetedRefereeList = async (list) => {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', '*');

  headers.append('GET', 'POST', 'OPTIONS');

  const res = await fetch(`${API_URL}/api/setRewardReferee`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        list,
      })
  });
  const response = await res.json();
  let result = false;
  if(response){
    result = true;
  }
  return result;
}

export const addTweetedRefereeList = async (list, amount, claimContract, account) => {
  try {
    return claimContract.methods.addClaimUsers(list, Web3.utils.toWei(amount, "wei")).send({from: account}).on('transactionHash', (tx) => {
      return tx.transactionHash
    });
  } catch (err) {
    console.log(err)
    return console.error('err')
  }
}

export const getPermission = async (claimContract, account) => {
  const owner = await claimContract.methods.owner().call();
  const dev = await claimContract.methods.dev().call();
  if(account === owner || account === dev){
    return true;
  }
  return false;
}