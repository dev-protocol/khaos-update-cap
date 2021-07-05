import { ethers, providers } from 'ethers'
import { getAddressConfigInstance } from './addressConfig'

export const getLockupInstance = async (
	provider: providers.BaseProvider
): Promise<ethers.Contract> => {
	const addressConfigInstance = await getAddressConfigInstance(provider)
	const lockupAddress = await addressConfigInstance.lockup()
	const lockupContract = new ethers.Contract(lockupAddress, lockupAbi, provider)
	return lockupContract
}

export const lockupAbi = [
	'event Lockedup(address, address, uint256)',
	'event UpdateCap(uint256)',
	'function updateCap(uint256) external',
	'function cap() external view returns (uint256)',
]
