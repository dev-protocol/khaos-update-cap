import { ethers, providers } from 'ethers'

export const getErc20Instance = (
	address: string,
	provider: providers.BaseProvider
): ethers.Contract => {
	const abi = [
		'function balanceOf(address account) external view returns (uint256)'
	]
	return new ethers.Contract(address, abi, provider)
}
