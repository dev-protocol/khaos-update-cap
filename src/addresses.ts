/* eslint-disable functional/immutable-data */
/* eslint-disable functional/no-expression-statement */
import fetch from 'cross-fetch'
import { FunctionAddresses } from '@devprotocol/khaos-core'
import { getLockupInstance } from './common'
import { getProvider } from './common'

export const addresses: FunctionAddresses = async ({ network }) => {
	const provider = getProvider(network)
	global.fetch = fetch
	const lockup = await getLockupInstance(provider)
	return lockup.address
}
