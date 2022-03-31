import { useCallback, useState, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useClaim } from 'hooks/useContract'
import useRefresh from './useRefresh'
import { 
  addClaimList,
  addDB,
  getNewTweetedRefereeList,
  addTweetedRefereeList,
  confirmNewTweetedRefereeList,
  addRewardList
} from '../utils/cryptoRunnerUtils'

export const useAddClaimList = () => {
  const { account } = useWallet()
  const claimContract = useClaim();
  const handleAddList = useCallback(
    async (list, amount) => {
      try {
        const res = await addDB(list);
        console.log('res : ', res)
        if(res){
          console.log('-----')
          const result = await addClaimList(list, amount, claimContract, account);
          console.log('result: ', result)
          return result
        }
        console.log('end?')
        return "db connection was failed.";
      } catch (e) {
        return false
      }
    },
    [account, claimContract],
  )

  return { onAddList: handleAddList }
}

export const useNewTweetedReferee = () => {

  const [referees, setReferees] = useState([])
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    const fetchBalance = async () => {
      const list = await getNewTweetedRefereeList()
      setReferees(list)
    }
    fetchBalance()
  }, [fastRefresh])

  return referees
}

export const useAddTweetedRefereeList = () => {
  const { account } = useWallet();
  const claimContract = useClaim();
  const handleGetNewTweetedRefereeList = useCallback(
    async (tweetedList) => {
      try {
        console.log(tweetedList)
        const addressList = [];
        for(let i = 0; i < tweetedList.length; i ++){
          addressList.push(tweetedList[i].address);
        }
        console.log(tweetedList);
        const result = await addRewardList(addressList, claimContract, account);
        if(result) {
          const res = await confirmNewTweetedRefereeList(tweetedList);
          return res;
        }
        return "failed.";
      } catch(e) {
        return e;
      }
    },
    [claimContract, account]
  )
  return{onAddTweetedRefereeList: handleGetNewTweetedRefereeList}
}