import { ethers, providers } from 'ethers'

export const getLockupAddress = async (
	addressConfig: string,
	provider: providers.BaseProvider
): Promise<string> => {
	const abi = ['function lockup() external view returns (address)']
	const addressConfigInstance = new ethers.Contract(
		addressConfig,
		abi,
		provider
	)
	return await addressConfigInstance.lockup()
}
