import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
import { ethers } from 'ethers'
import { useDispatch } from 'react-redux'
// import { updateUserAllowance, fetchFarmUserDataAsync } from 'state/actions'
import { approve } from 'utils/callHelpers'
// import { useMasterchef, useCake, useSousChef, useLottery, useCryptoDogeController, useOneDoge, useCryptoDogeNFT, useMagicStoneController, useLaunchPool } from './useContract'
import { useCryptoRunner, useClaim } from './useContract'

// Approve a Farm
// export const useApprove = (lpContract: Contract) => {
//   const dispatch = useDispatch()
//   const { account }: { account: string } = useWallet()
//   const masterChefContract = useMasterchef()

//   const handleApprove = useCallback(async () => {
//     try {
//       const tx = await approve(lpContract, masterChefContract, account)
//       dispatch(fetchFarmUserDataAsync(account))
//       return tx
//     } catch (e) {
//       return false
//     }
//   }, [account, dispatch, lpContract, masterChefContract])

//   return { onApprove: handleApprove }
// }

// // Approve a Pool
// export const useSousApprove = (lpContract: Contract, sousId) => {
//   const dispatch = useDispatch()
//   const { account }: { account: string } = useWallet()
//   const sousChefContract = useSousChef(sousId)

//   const handleApprove = useCallback(async () => {
//     try {
//       const tx = await approve(lpContract, sousChefContract, account)
//       dispatch(updateUserAllowance(sousId, account))
//       return tx
//     } catch (e) {
//       return false
//     }
//   }, [account, dispatch, lpContract, sousChefContract, sousId])

//   return { onApprove: handleApprove }
// }

// // Approve the lottery
// export const useLotteryApprove = () => {
//   const { account }: { account: string } = useWallet()
//   const cakeContract = useCake()
//   const lotteryContract = useLottery()

//   const handleApprove = useCallback(async () => {
//     try {
//       const tx = await approve(cakeContract, lotteryContract, account)
//       return tx
//     } catch (e) {
//       return false
//     }
//   }, [account, cakeContract, lotteryContract])

//   return { onApprove: handleApprove }
// }

// export const useCryptoDogeControllerApprove = () => {
//   const { account }: { account: string } = useWallet()
//   const oneDogeContract = useOneDoge()
//   const cryptoDogeControllerContract = useCryptoDogeController()

//   const handleApprove = useCallback(async () => {
//     try {
//       const tx = await approve(oneDogeContract, cryptoDogeControllerContract, account)
//       return tx
//     } catch (e) {
//       return false
//     }
//   }, [account, oneDogeContract, cryptoDogeControllerContract])

//   return { onApprove: handleApprove }
// }

// export const useMagicStoneControllerApprove = () => {
//   const { account }: { account: string } = useWallet()
//   const oneDogeContract = useOneDoge()
//   const magicStoneControllerContract = useMagicStoneController()

//   const handleApprove = useCallback(async () => {
//     try {
//       const tx = await approve(oneDogeContract, magicStoneControllerContract, account)
//       return tx
//     } catch (e) {
//       return false
//     }
//   }, [account, oneDogeContract, magicStoneControllerContract])

//   return { onApprove: handleApprove }
// }

// export const useCryptoDogeNFTApprove = () => {
//   const { account }: { account: string } = useWallet()
//   const oneDogeContract = useOneDoge()
//   const cryptoDogeNFTContract = useCryptoDogeNFT()

//   const handleApprove = useCallback(async () => {
//     try {
//       const tx = await approve(oneDogeContract, cryptoDogeNFTContract, account)
//       return tx
//     } catch (e) {
//       return false
//     }
//   }, [account, oneDogeContract, cryptoDogeNFTContract])

//   return { onApprove: handleApprove }
// }

// // Approve an IFO
// export const useIfoApprove = (tokenContract: Contract, spenderAddress: string) => {
//   const { account } = useWallet()
//   const onApprove = useCallback(async () => {
//     try {
//       const tx = await tokenContract.methods
//         .approve(spenderAddress, ethers.constants.MaxUint256)
//         .send({ from: account })
//       return tx
//     } catch {
//       return false
//     }
//   }, [account, spenderAddress, tokenContract])

//   return onApprove
// }

// export const useLaunchPoolApprove = () => {
//   const { account }: { account: string } = useWallet()
//   const oneDogeContract = useOneDoge()
//   const launchPoolContract = useLaunchPool()

//   const handleApprove = useCallback(async () => {
//     try {
//       const tx = await approve(oneDogeContract, launchPoolContract, account)
//       return tx
//     } catch (e) {
//       return false
//     }
//   }, [account, oneDogeContract, launchPoolContract])

//   return { onApprove: handleApprove }
// }

export const useClaimApprove = () => {
  const { account }: { account: string } = useWallet()
  const cryptoRunnerContract = useCryptoRunner()
  const claimContract = useClaim()

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(cryptoRunnerContract, claimContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, cryptoRunnerContract, claimContract])

  return { onApprove: handleApprove }
}

export default useClaimApprove;