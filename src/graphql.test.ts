/* eslint-disable functional/immutable-data */
import test from 'ava'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import {
	createGraphQLPropertyLockupSumValuesFetcher,
	createGraphQLPropertyAuthenticationFetcher,
	graphql,
	GraphQLPropertyLockupSumValuesResponse,
	GraphQLPropertyPropertyAuthenticationResponse,
} from './graphql'

test('get the data for lockup sum values.', async (t) => {
	process.env[`KHAOS_MAINNET_GRAPHQL`] = 'https://api.devprtcl.com/v1/graphql'
	const fetchGraphQL = createGraphQLPropertyLockupSumValuesFetcher(
		graphql('mainnet')
	)
	const lockupSumValues = await (async () =>
		new Promise<
			GraphQLPropertyLockupSumValuesResponse['data']['property_lockup_sum_values']
		>((resolve) => {
			const f = async (
				prev: GraphQLPropertyLockupSumValuesResponse['data']['property_lockup_sum_values'] = []
			): Promise<void> => {
				const { data } = await fetchGraphQL()
				const { property_lockup_sum_values: items } = data
				const next = [...prev, ...items]
				resolve(next)
			}
			f().catch(console.error)
		}))()
	t.is(lockupSumValues.length > 0, true)
	lockupSumValues.map((data) => {
		t.is(ethers.utils.isAddress(data.property_address), true)
		const tmp = new BigNumber(data.sum_values)
		t.is(tmp.gt(new BigNumber(0)), true)
	})
})

test('Property_authintication data can be retrieved.', async (t) => {
	process.env[`KHAOS_MAINNET_GRAPHQL`] = 'https://api.devprtcl.com/v1/graphql'
	const fetchGraphQL = createGraphQLPropertyAuthenticationFetcher(
		graphql('mainnet')
	)
	const lockupSumValues = await (async () =>
		new Promise<
			GraphQLPropertyPropertyAuthenticationResponse['data']['property_authentication']
		>((resolve) => {
			const f = async (
				prev: GraphQLPropertyPropertyAuthenticationResponse['data']['property_authentication'] = []
			): Promise<void> => {
				const { data } = await fetchGraphQL()
				const { property_authentication: items } = data
				const next = [...prev, ...items]
				resolve(next)
			}
			f().catch(console.error)
		}))()
	t.is(lockupSumValues.length > 0, true)
	lockupSumValues.map((data) => {
		t.is(ethers.utils.isAddress(data.property), true)
	})
})
