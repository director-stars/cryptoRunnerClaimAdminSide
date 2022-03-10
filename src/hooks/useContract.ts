import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from 'hooks/useWeb3'
// import { getMasterChefAddress, getCakeAddress, getLotteryAddress, getLotteryTicketAddress, getCryptoDogeControllerAddress, getOneDogeAddress, getCryptoDogeNFTAddress, getMarketControllerAddress, getMagicStoneNFTAddress, getMagicStoneControllerAddress, getAirDropAddress, getLaunchPoolAddress } from 'utils/addressHelpers'
import { getClaimAddress, getCryptoRunnerTokenAddress } from 'utils/addressHelpers'
// import { poolsConfig } from 'config/constants'
// import { PoolCategory } from 'config/constants/types'
// import ifo from 'config/abi/ifo.json'
// import erc20 from 'config/abi/erc20.json'
// import rabbitmintingfarm from 'config/abi/rabbitmintingfarm.json'
// import pancakeRabbits from 'config/abi/pancakeRabbits.json'
// import lottery from 'config/abi/lottery.json'
// import lotteryTicket from 'config/abi/lotteryNft.json'
// import masterChef from 'config/abi/masterchef.json'
// import sousChef from 'config/abi/sousChef.json'
// import sousChefBnb from 'config/abi/sousChefBnb.json'
// import cryptoDogeController from 'config/abi/cryptoDogeController.json'
// import oneDoge from 'config/abi/oneDoge.json'
// import cryptoDogeNFT from 'config/abi/cryptoDogeNFT.json'
// import marketController from 'config/abi/marketController.json'
// import magicStoneNFT from 'config/abi/magicStoneNFT.json'
// import magicStoneController from 'config/abi/magicStoneController.json'
// import airDrop from 'config/abi/airDrop.json'
// import launchPool from 'config/abi/launchPool.json'
import cryptoRunner from 'config/abi/cryptoRunner.json'
import claim from 'config/abi/claim.json'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */

// export const useIfoContract = (address: string) => {
//   const ifoAbi = (ifo as unknown) as AbiItem
//   return useContract(ifoAbi, address)
// }

// export const useERC20 = (address: string) => {
//   const erc20Abi = (erc20 as unknown) as AbiItem
//   return useContract(erc20Abi, address)
// }

// export const useCake = () => {
//   return useERC20(getCakeAddress())
// }

// export const useRabbitMintingFarm = (address: string) => {
//   const rabbitMintingFarmAbi = (rabbitmintingfarm as unknown) as AbiItem
//   return useContract(rabbitMintingFarmAbi, address)
// }

// export const usePancakeRabbits = (address: string) => {
//   const pancakeRabbitsAbi = (pancakeRabbits as unknown) as AbiItem
//   return useContract(pancakeRabbitsAbi, address)
// }

// export const useLottery = () => {
//   const abi = (lottery as unknown) as AbiItem
//   return useContract(abi, getLotteryAddress())
// }

// export const useLotteryTicket = () => {
//   const abi = (lotteryTicket as unknown) as AbiItem
//   return useContract(abi, getLotteryTicketAddress())
// }

// export const useMasterchef = () => {
//   const abi = (masterChef as unknown) as AbiItem
//   return useContract(abi, getMasterChefAddress())
// }

// export const useSousChef = (id) => {
//   const config = poolsConfig.find((pool) => pool.sousId === id)
//   const rawAbi = config.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
//   const abi = (rawAbi as unknown) as AbiItem
//   return useContract(abi, config.contractAddress[process.env.REACT_APP_CHAIN_ID])
// }

// export const useCryptoDogeController = () => {
//   const abi = (cryptoDogeController as unknown) as AbiItem
// return useContract(abi, getCryptoDogeControllerAddress())
// }

// export const useOneDoge = () => {
//   const abi = (oneDoge as unknown) as AbiItem
// return useContract(abi, getOneDogeAddress())
// }

// export const useCryptoDogeNFT = () => {
//   const abi = (cryptoDogeNFT as unknown) as AbiItem
//   return useContract(abi, getCryptoDogeNFTAddress());
// }

// export const useMarketController = () => {
//   const abi = (marketController as unknown) as AbiItem
//   return useContract(abi, getMarketControllerAddress());
// }

// export const useMagicStoneNFT = () => {
//   const abi = (magicStoneNFT as unknown) as AbiItem
//   return useContract(abi, getMagicStoneNFTAddress());
// }

// export const useMagicStoneController = () => {
//   const abi = (magicStoneController as unknown) as AbiItem
//   return useContract(abi, getMagicStoneControllerAddress());
// }

// export const useAirDropContract = () => {
//   const abi = (airDrop as unknown) as AbiItem
//   return useContract(abi, getAirDropAddress());
// }

// export const useLaunchPool = () => {
//   const abi = (launchPool as unknown) as AbiItem
//   return useContract(abi, getLaunchPoolAddress());
// }

export const useCryptoRunner = () => {
  const abi = (cryptoRunner as unknown) as AbiItem
  return useContract(abi, getCryptoRunnerTokenAddress());
}

export const useClaim = () => {
  const abi = (claim as unknown) as AbiItem
  return useContract(abi, getClaimAddress());
}

export default useContract
