import { FunctionOraclizer } from '@devprotocol/khaos-core'
import { getProvider } from './common'
import { isUpdateCap } from './original'
import { getCap } from './original'
import { bignumber } from 'mathjs'

export const oraclize: FunctionOraclizer = async ({ query, network }) => {
	const provider = getProvider(network)
	const cap = await getCap(provider)
	const [message] = cap.toFixed().split('.') // Forcibly truncates the decimal point regardless of the BigNumber specifications.
	const isUpdate = await isUpdateCap(provider, bignumber(message), query.transactionhash)
	const result = isUpdate
		? {
			message,
			status: 0,
			statusMessage: `${network} ${query.publicSignature}`,
		}
		: undefined
	return result
}
