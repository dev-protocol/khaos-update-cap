import bent from 'bent'

export const createGraphQLPropertyLockupSumValuesFetcher = (
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
export const createGraphQLPropertyAuthenticationFetcher = (
	fetcher: bent.RequestFunction<bent.ValidResponse>
) => async (
	offset = 0
): Promise<GraphQLPropertyPropertyAuthenticationResponse> =>
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
		(r) => (r as unknown) as GraphQLPropertyPropertyAuthenticationResponse
	)

export const graphql = (
	network: string
): bent.RequestFunction<bent.ValidResponse> => {
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const endpoint = process.env[`KHAOS_${network.toUpperCase()}_GRAPHQL`]!
	return bent(endpoint, 'POST', 'json')
}

export type GraphQLPropertyLockupSumValuesResponse = {
	readonly data: {
		readonly property_lockup_sum_values: ReadonlyArray<{
			readonly property_address: string
			readonly sum_values: string
		}>
	}
}

export type GraphQLPropertyPropertyAuthenticationResponse = {
	readonly data: {
		readonly property_authentication: ReadonlyArray<{
			readonly property: string
		}>
	}
}
