import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Contract } from 'web3-eth-contract'
// import { useCake, useLottery, useCryptoDogeController, useOneDoge, useCryptoDogeNFT, useMagicStoneController, useLaunchPool } from './useContract'
import { useCryptoRunner, useClaim } from './useContract'
import { getAllowance } from '../utils/erc20'

// Retrieve lottery allowance
// export const useLotteryAllowance = () => {
//   const [allowance, setAllowance] = useState(new BigNumber(0))
//   const { account }: { account: string } = useWallet()
//   const lotteryContract = useLottery()
//   const cakeContract = useCake()

//   useEffect(() => {
//     const fetchAllowance = async () => {
//       const res = await getAllowance(cakeContract, lotteryContract, account)
//       setAllowance(new BigNumber(res))
//     }

//     if (account && cakeContract && cakeContract) {
//       fetchAllowance()
//     }
//     const refreshInterval = setInterval(fetchAllowance, 10000)
//     return () => clearInterval(refreshInterval)
//   }, [account, cakeContract, lotteryContract])

//   return allowance
// }

// export const useCryptoDogeControllerAllowance = () => {
//   const [allowance, setAllowance] = useState(new BigNumber(0))
//   const { account }: { account: string } = useWallet()
//   const cryptoDogeControllerContract = useCryptoDogeController()
//   const oneDogeContract = useOneDoge()

//   useEffect(() => {
//     const fetchAllowance = async () => {
//       const res = await getAllowance(oneDogeContract, cryptoDogeControllerContract, account)
//       setAllowance(new BigNumber(res))
//     }

//     if (account && oneDogeContract && oneDogeContract) {
//       fetchAllowance()
//     }
//     const refreshInterval = setInterval(fetchAllowance, 1000)
//     return () => clearInterval(refreshInterval)
//   }, [account, oneDogeContract, cryptoDogeControllerContract])

//   return allowance
// }

// export const useMagicStoneControllerAllowance = () => {
//   const [allowance, setAllowance] = useState(new BigNumber(0))
//   const { account }: { account: string } = useWallet()
//   const magicStoneControllerContract = useMagicStoneController()
//   const oneDogeContract = useOneDoge()

//   useEffect(() => {
//     const fetchAllowance = async () => {
//       const res = await getAllowance(oneDogeContract, magicStoneControllerContract, account)
//       setAllowance(new BigNumber(res))
//     }

//     if (account && oneDogeContract && oneDogeContract) {
//       fetchAllowance()
//     }
//     const refreshInterval = setInterval(fetchAllowance, 1000)
//     return () => clearInterval(refreshInterval)
//   }, [account, oneDogeContract, magicStoneControllerContract])

//   return allowance
// }

// export const useCryptoDogeNFTAllowance = () => {
//   const [allowance, setAllowance] = useState(new BigNumber(0))
//   const { account }: { account: string } = useWallet()
//   const cryptoDogeNFTContract = useCryptoDogeNFT()
//   const oneDogeContract = useOneDoge()

//   useEffect(() => {
//     const fetchAllowance = async () => {
//       const res = await getAllowance(oneDogeContract, cryptoDogeNFTContract, account)
//       setAllowance(new BigNumber(res))
//     }

//     if (account && oneDogeContract && oneDogeContract) {
//       fetchAllowance()
//     }
//     const refreshInterval = setInterval(fetchAllowance, 1000)
//     return () => clearInterval(refreshInterval)
//   }, [account, oneDogeContract, cryptoDogeNFTContract])

//   return allowance
// }

// // Retrieve IFO allowance
// export const useIfoAllowance = (tokenContract: Contract, spenderAddress: string, dependency?: any) => {
//   const { account }: { account: string } = useWallet()
//   const [allowance, setAllowance] = useState(null)

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await tokenContract.methods.allowance(account, spenderAddress).call()
//         setAllowance(new BigNumber(res))
//       } catch (e) {
//         setAllowance(null)
//       }
//     }
//     fetch()
//   }, [account, spenderAddress, tokenContract, dependency])

//   return allowance
// }

// export const useLaunchPoolAllowance = () => {
//   const [allowance, setAllowance] = useState(new BigNumber(0))
//   const { account }: { account: string } = useWallet()
//   const launchPoolContract = useLaunchPool()
//   const oneDogeContract = useOneDoge()

//   useEffect(() => {
//     const fetchAllowance = async () => {
//       const res = await getAllowance(oneDogeContract, launchPoolContract, account)
//       setAllowance(new BigNumber(res))
//     }

//     if (account && oneDogeContract && oneDogeContract) {
//       fetchAllowance()
//     }
//     const refreshInterval = setInterval(fetchAllowance, 1000)
//     return () => clearInterval(refreshInterval)
//   }, [account, oneDogeContract, launchPoolContract])

//   return allowance
// }

export const useClaimAllowance = () => {
    const [allowance, setAllowance] = useState(new BigNumber(0))
    const { account }: { account: string } = useWallet()
    const claimContract = useClaim()
    const cryptoRunnerContract = useCryptoRunner()
  
    useEffect(() => {
      const fetchAllowance = async () => {
        const res = await getAllowance(cryptoRunnerContract, claimContract, account)
        setAllowance(new BigNumber(res))
      }
  
      if (account && cryptoRunnerContract && cryptoRunnerContract) {
        fetchAllowance()
      }
      const refreshInterval = setInterval(fetchAllowance, 1000)
      return () => clearInterval(refreshInterval)
    }, [account, cryptoRunnerContract, claimContract])
  
    return allowance
}

export default useClaimAllowance;