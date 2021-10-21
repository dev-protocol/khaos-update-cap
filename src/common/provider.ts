import { ethers, providers } from 'ethers'
import { NetworkName } from '@devprotocol/khaos-core'

export const getProvider = (network: string): providers.BaseProvider => {
	const endpoint = process.env[`KHAOS_${network.toUpperCase()}_JSON_RPC`]
	return new ethers.providers.JsonRpcProvider(endpoint)
}

export const isL1 = (network: NetworkName): boolean => {
	return network === 'mainnet' || network === 'ropsten'
}
