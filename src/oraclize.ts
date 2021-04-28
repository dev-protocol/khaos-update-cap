import { FunctionOraclizer } from '@devprotocol/khaos-core'
import { getProvider } from './common/provider'
import { isUpdateCap } from './original/check'
import { getCap } from './original/cap'

export const oraclize: FunctionOraclizer = async ({ query, network }) => {
	const provider = getProvider(network)
	const cap = await getCap(provider)
	const isUpdate = await isUpdateCap(provider, cap, query.transactionhash)
	const result =
		isUpdate
			? {
				message: cap.toString(),
				status: 0,
				statusMessage: `${network} ${query.publicSignature}`,
			}
			: undefined
	return result
}
