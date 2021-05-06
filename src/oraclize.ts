import { FunctionOraclizer } from '@devprotocol/khaos-core'
import { getProvider } from './common'
import { isUpdateCap } from './original'
import { getCap } from './original'

export const oraclize: FunctionOraclizer = async ({ query, network }) => {
	const provider = getProvider(network)
	const cap = await getCap(provider)
	const isUpdate = await isUpdateCap(provider, cap, query.transactionhash)
	const [message] = cap.toFixed().split('.') // Forcibly truncates the decimal point regardless of the BigNumber specifications.
	const result = isUpdate
		? {
				message,
				status: 0,
				statusMessage: `${network} ${query.publicSignature}`,
		  }
		: undefined
	return result
}
