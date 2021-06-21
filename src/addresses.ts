import { FunctionAddresses } from '@devprotocol/khaos-core'
import { getLockupAddress } from './common'

export const addresses: FunctionAddresses = async ({ network }) => {
	return getLockupAddress(network)
}
