import { ethers, providers } from 'ethers'

const addresses = {
	eth: {
		main: {
			registry: '0x1D415aa39D647834786EB9B5a333A50e9935b796',
		},
		ropsten: {
			registry: '0xD6D07f1c048bDF2B3d5d9B6c25eD1FC5348D0A70',
		},
	},
}

export const getAddressConfigInstance = async (
	provider: providers.BaseProvider
): Promise<ethers.Contract> => {
	const abi = [
		'function lockup() external view returns (address)',
		'function token() external view returns (address)',
	]
	// // https://eips.ethereum.org/EIPS/eip-155
	// const network = await provider.detectNetwork()
	// const address =
	// 	network.chainId === 1
	// 		? addresses.eth.main.registry
	// 		: addresses.eth.ropsten.registry
	// eslint-disable-next-line functional/no-expression-statement
	const address = '0x1D415aa39D647834786EB9B5a333A50e9935b796'
	return new ethers.Contract(address, abi, provider)
}
