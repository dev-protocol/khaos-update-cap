import bent from 'bent'

const createGraphQLPropertyLockupSumValuesFetcher = (
	fetcher: bent.RequestFunction<bent.ValidResponse>
) => async (offset = 0): Promise<GraphQLPropertyLockupSumValuesResponse> =>
		fetcher('/', {
			query: `{
				property_lockup_sum_values(
					offset: ${offset},
					order_by: {property_address: asc}
				) {
					property_address
					sum_values
				}
			}`,
		}).then((r) => (r as unknown) as GraphQLPropertyLockupSumValuesResponse)

// TODO 結局Marketだけにするか、どうするか確認
const createGraphQLPropertyAuthenticationFetcher = (
	fetcher: bent.RequestFunction<bent.ValidResponse>
) => async (
	offset = 0
): Promise<GraphQLPropertyAuthenticationPropertyResponse> =>
		fetcher('/', {
			query: `{
				property_authentication(
					where: {market: {_in: ["0x67d31300953Cd9aB2beE6e541A121cF93640af20", "0x34A7AdC94C4D41C3e3469F98033B372cB2fAf318"]}},
					offset: ${offset},
					order_by: {block_number: asc}
				) {
					property
				}
			}`,
		}).then(
			(r) => (r as unknown) as GraphQLPropertyAuthenticationPropertyResponse
		)

const graphql = (version: string): bent.RequestFunction<bent.ValidResponse> => {
	return bent(`https://api.devprtcl.com/${version}/graphql`, 'POST', 'json')
}

type GraphQLPropertyLockupSumValuesResponse = {
	readonly data: {
		readonly property_lockup_sum_values: ReadonlyArray<{
			readonly property_address: string
			readonly sum_values: string
		}>
	}
}

type GraphQLPropertyAuthenticationPropertyResponse = {
	readonly data: {
		readonly property_authentication: ReadonlyArray<{
			readonly property: string
		}>
	}
}

function sleep(milliseconds: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

export const getLockupSumValues = async (
	version: string
): Promise<
	readonly {
		readonly property_address: string
		readonly sum_values: string
	}[]
> => {
	const fetchGraphQL = createGraphQLPropertyLockupSumValuesFetcher(
		graphql(version)
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
	return lockupSumValues
}

export const getAuthinticatedProperty = async (
	version: string
): Promise<
	readonly {
		readonly property: string
	}[]
> => {
	const fetchGraphQL = createGraphQLPropertyAuthenticationFetcher(
		graphql(version)
	)
	type R = GraphQLPropertyAuthenticationPropertyResponse['data']['property_authentication']
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
	return authinticatedPropertoes
}
