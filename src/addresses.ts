import { FunctionAddresses } from '@devprotocol/khaos-core'
import { getLockupInstance } from './common'
import { getProvider, isL1 } from './common'
import { NetworkName } from '@devprotocol/khaos-core'

export const addresses: FunctionAddresses = async ({ network }) => {
	return isL1(network) ? await getLockupAddress(network) : undefined
}

const getLockupAddress = async (network: NetworkName): Promise<string> => {
	const provider = getProvider(network)
	const lockup = await getLockupInstance(provider)
	return lockup.address
}
