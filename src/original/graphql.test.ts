/* eslint-disable functional/immutable-data */
import test from 'ava'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { getLockupSumValues, getAuthinticatedProperty } from './graphql'

test('get the data for lockup sum values.', async (t) => {
	process.env[`KHAOS_MAINNET_GRAPHQL`] = 'https://api.devprtcl.com/v1/graphql'
	const lockupSumValues = await getLockupSumValues('mainnet')
	t.is(lockupSumValues.length > 0, true)
	lockupSumValues.map((data) => {
		t.is(ethers.utils.isAddress(data.property_address), true)
		const tmp = new BigNumber(data.sum_values)
		t.is(tmp.gt(new BigNumber(0)), true)
	})
})

test('Property_authintication data can be retrieved.', async (t) => {
	process.env[`KHAOS_MAINNET_GRAPHQL`] = 'https://api.devprtcl.com/v1/graphql'
	const lockupSumValues = await getAuthinticatedProperty('mainnet')
	t.is(lockupSumValues.length > 0, true)
	lockupSumValues.map((data) => {
		t.is(ethers.utils.isAddress(data.property), true)
	})
})
