import { ethers, providers } from 'ethers'
import { addresses } from '@devprotocol/dev-kit'

export const getAddressConfigInstance = async (
	provider: providers.BaseProvider
): Promise<ethers.Contract> => {
	const abi = [
		'function lockup() external view returns (address)',
		'function token() external view returns (address)',
	]
	// https://eips.ethereum.org/EIPS/eip-155
	const network = await provider.detectNetwork()
	const address =
		network.chainId === 1
			? addresses.eth.main.registry
			: addresses.eth.ropsten.registry
	return new ethers.Contract(address, abi, provider)
}
