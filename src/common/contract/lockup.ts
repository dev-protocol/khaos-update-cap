import { NetworkName } from '@devprotocol/khaos-core'
import { ethers, providers } from 'ethers'

export const getLockupInstance = async (
	provider: providers.BaseProvider,
	network: NetworkName
): Promise<ethers.Contract> => {
	const lockupAddress = getLockupAddress(network)
	const lockupContract = new ethers.Contract(lockupAddress, lockupAbi, provider)
	return lockupContract
}

export const lockupAbi = [
	'event Lockedup(address, address, uint256)',
	'function updateCap(uint256) external',
	'function cap() external view returns (uint256)',
]

export const getLockupAddress = (network: NetworkName): string => {
	return network === 'mainnet'
		? '0x54cb6A94D7191Df4E4b6F9C6Ce225427c0038593'
		: '0xb8b7a92A716318F2CCed7eA856BE029969552582'
}
