/* eslint-disable functional/immutable-data */
import test from 'ava'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { getLockupSumValues, getAuthinticatedProperty } from './graphql'

test('get the data for lockup sum values.', async (t) => {
	t.timeout(10000)
	const lockupSumValues = await getLockupSumValues('v1')
	t.is(lockupSumValues.length > 0, true)
	lockupSumValues.map((data) => {
		t.is(ethers.utils.isAddress(data.property_address), true)
		const tmp = new BigNumber(data.sum_values)
		t.is(tmp.gt(new BigNumber(0)), true)
	})
})

test('Property_authintication data can be retrieved.', async (t) => {
	t.timeout(10000)
	const lockupSumValues = await getAuthinticatedProperty('v1')
	t.is(lockupSumValues.length > 0, true)
	lockupSumValues.map((data) => {
		t.is(ethers.utils.isAddress(data.property), true)
	})
})
