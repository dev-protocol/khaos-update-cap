import { ethers, providers } from 'ethers'

export const getAddressConfigInstance = (
	provider: providers.BaseProvider
): ethers.Contract => {
	const abi = [
		'function lockup() external view returns (address)',
		'function token() external view returns (address)'
	]
	return new ethers.Contract('0x1D415aa39D647834786EB9B5a333A50e9935b796', abi, provider)
}
