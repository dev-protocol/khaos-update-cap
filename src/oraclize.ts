import { providers } from 'ethers'
import { FunctionOraclizer } from '@devprotocol/khaos-core'
import { getProvider, getLockupInstance } from './common'
import { isSameVal, isUpdateCap } from './original'
import { getCap } from './original'
import { bignumber } from 'mathjs'

export const oraclize: FunctionOraclizer = async ({ query, network }) => {
	const provider = getProvider(network)
	const lockupContract = await getLockupInstance(provider)
	const isUpdate = await isUpdateCap(provider, lockupContract, query.transactionhash)
	const message = isUpdate ? await getCapValue(provider) : ''
	const isSame = message !== '' ? await isSameVal(lockupContract, bignumber(message)) : true
	const result = isSame
		? undefined
		: {
			message,
			status: 0,
			statusMessage: `${network} ${query.publicSignature}`,
		}
	return result
}

const getCapValue = async (provider: providers.BaseProvider): Promise<string> => {
	const cap = await getCap(provider)
	const [message] = cap.toFixed().split('.') // Forcibly truncates the decimal point regardless of the BigNumber specifications.
	return message
}
