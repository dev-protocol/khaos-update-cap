import BigNumber from 'bignumber.js'
import { pow, bignumber, divide } from 'mathjs'
import { FunctionOraclizer } from '@devprotocol/khaos-core'
import {
	getLockupContract,
	getProvider,
	getTransactionBlockNumber,
} from './contract'
import {
	createGraphQLPropertyLockupSumValuesFetcher,
	graphql,
	GraphQLPropertyLockupSumValuesResponse,
	createGraphQLPropertyAuthenticationFetcher,
	GraphQLPropertyPropertyAuthenticationResponse,
} from './graphql'

export const oraclize: FunctionOraclizer = async ({ query, network }) => {
	const geometricMean = await calculateGeometricMean(network)
	const isLatestEvent = await isLatestLockedupEvent(
		network,
		query.transactionhash
	)
	const result = isLatestEvent
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
	const authinticatedProperties = await getAuthinticatedProperty(network)
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

const getAuthinticatedProperty = async (
	network: string
): Promise<readonly string[]> => {
	const fetchGraphQL = createGraphQLPropertyAuthenticationFetcher(
		graphql(network)
	)
	type R = GraphQLPropertyPropertyAuthenticationResponse['data']['property_authentication']
	const authinticatedPropertoes = await (async () => {
		const f = async (i = 0, prev: R = []): Promise<R> => {
			// eslint-disable-next-line functional/no-expression-statement
			await sleep(1000)
			const { data } = await fetchGraphQL(i)
			const { property_authentication: items } = data
			const next = [...prev, ...items]
			return items.length > 0 ? f(i + items.length, next) : next
		}
		return f()
	})()
	const properties = authinticatedPropertoes.map((data) => {
		return data.property
	})
	return properties
}

const getLockupValuesMap = async (
	network: string
): Promise<ReadonlyMap<string, string>> => {
	const fetchGraphQL = createGraphQLPropertyLockupSumValuesFetcher(
		graphql(network)
	)
	type R = GraphQLPropertyLockupSumValuesResponse['data']['property_lockup_sum_values']
	const lockupSumValues = await (async () => {
		const f = async (i = 0, prev: R = []): Promise<R> => {
			// eslint-disable-next-line functional/no-expression-statement
			await sleep(1000)
			const { data } = await fetchGraphQL(i)
			const { property_lockup_sum_values: items } = data
			const next = [...prev, ...items]
			return items.length > 0 ? f(i + items.length, next) : next
		}
		return f()
	})()
	const values = lockupSumValues.map<readonly [string, string]>(
		({ property_address, sum_values }) => [property_address, sum_values]
	)
	return new Map<string, string>(values)
}

const isLatestLockedupEvent = async (
	network: string,
	transactionHash: string
): Promise<boolean> => {
	const provider = getProvider(network)
	const blockNumber = await getTransactionBlockNumber(provider, transactionHash)
	const lockupContract = await getLockupContract(provider)
	const lockedup = lockupContract.filters.Lockedup()
	const events = await lockupContract.queryFilter(
		lockedup,
		blockNumber + 1,
		'latest'
	)
	return events.length === 0
}

function sleep(milliseconds: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, milliseconds))
}
