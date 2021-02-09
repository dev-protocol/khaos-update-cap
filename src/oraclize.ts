import BigNumber from 'bignumber.js'
import { pow, bignumber, divide } from 'mathjs'
import { ethers, providers } from 'ethers'
import { FunctionOraclizer } from '@devprotocol/khaos-core'
import {
	getLockupContract,
	getProvider,
	getTransactionBlockNumber,
} from './contract'
import { getLockupSumValues, getAuthinticatedProperty } from './graphql'

export const oraclize: FunctionOraclizer = async ({ query, network }) => {
	const geometricMean = await calculateGeometricMean(network)
	const provider = getProvider(network)
	const lockupContract = await getLockupContract(provider)
	const isSameValue = await isSameVal(lockupContract, geometricMean)
	const isLatestEvent = await isLatestLockedupEvent(
		provider,
		lockupContract,
		query.transactionhash
	)
	const result =
		isLatestEvent && isSameValue
			? {
					message: geometricMean,
					status: 0,
					statusMessage: `${network} ${query.publicSignature}`,
			  }
			: undefined
	return result
}

const calculateGeometricMean = async (network: string): Promise<string> => {
	const valueMap = await getLockupValuesMap(network)
	const authinticatedProperties = await getAuthinticatedPropertyList(network)
	const values = authinticatedProperties.map((property) => {
		const value = valueMap.get(property)
		const tmp = typeof value === 'undefined' ? 1 : value
		return new BigNumber(tmp)
	})
	const result = values.reduce((data1, data2) => {
		return data1.times(data2)
	})
	const tmp = divide(1, values.length)
	const calculationResults = pow(
		bignumber(result.toString()),
		bignumber(tmp.toString())
	)
	return bignumber(calculationResults.toString()).toFixed(0)
}

const getAuthinticatedPropertyList = async (
	network: string
): Promise<readonly string[]> => {
	const authinticatedPropertoes = await getAuthinticatedProperty(network)
	const properties = authinticatedPropertoes.map((data) => {
		return data.property
	})
	return properties
}

const getLockupValuesMap = async (
	network: string
): Promise<ReadonlyMap<string, string>> => {
	const lockupSumValues = await getLockupSumValues(network)
	const values = lockupSumValues.map<readonly [string, string]>(
		({ property_address, sum_values }) => [property_address, sum_values]
	)
	return new Map<string, string>(values)
}

const isSameVal = async (
	lockup: ethers.Contract,
	geometricMean: string
): Promise<boolean> => {
	const cap = await lockup.cap()
	return new BigNumber(cap).toString() === geometricMean
}

const isLatestLockedupEvent = async (
	provider: providers.BaseProvider,
	lockup: ethers.Contract,
	transactionHash: string
): Promise<boolean> => {
	const blockNumber = await getTransactionBlockNumber(provider, transactionHash)
	const lockedup = lockup.filters.Lockedup()
	const events = await lockup.queryFilter(lockedup, blockNumber + 1, 'latest')
	return events.length === 0
}
