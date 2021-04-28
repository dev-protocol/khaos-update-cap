import { FunctionAddresses } from '@devprotocol/khaos-core'
import { getLockupInstance } from './common/contract'
import { getProvider } from './common/provider'

export const addresses: FunctionAddresses = async ({ network }) => {
	const provider = getProvider(network)
	const lockup = await getLockupInstance(provider)
	return lockup.address
}
