import { FunctionAddresses } from '@devprotocol/khaos-core'
import { getLockupContract, getProvider } from './contract'

export const addresses: FunctionAddresses = async ({ network }) => {
	const provider = getProvider(network)
	const lockup = await getLockupContract(provider)
	return lockup.address
}
