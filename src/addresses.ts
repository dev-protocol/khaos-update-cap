/* eslint-disable functional/no-expression-statement */
import { FunctionAddresses } from '@devprotocol/khaos-core'
import { getLockupInstance } from './common'
import { getProvider } from './common'

export const addresses: FunctionAddresses = async ({ network, context }) => {
	context?.log.info(`network name:${network}`)
	const endpoint = process.env[`KHAOS_${network.toUpperCase()}_JSON_RPC`]
	context?.log.info(`endpoint name:${endpoint}`)
	const provider = getProvider(network)
	const net = await provider.detectNetwork()
	context?.log.info(`chainId id:${net.chainId}`)
	const lockup = await getLockupInstance(provider)
	context?.log.info(`lockup address:${lockup.address}`)
	return lockup.address
}
