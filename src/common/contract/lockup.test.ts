/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */

import test from 'ava'
import { lockupAbi, getLockupInstance, getLockupAddress } from './lockup'

// lockupAbi
test('lthis function can get the ABI of the Lockup contract.', (t) => {
	t.is(lockupAbi[0], 'event Lockedup(address, address, uint256)')
	t.is(lockupAbi[1], 'function updateCap(uint256) external')
	t.is(lockupAbi[2], 'function cap() external view returns (uint256)')
})

// getLockupInstance
test('get the mainnet Lockup contract object.', async (t) => {
	const lockup = await getLockupInstance(null as any, 'mainnet')
	t.is(lockup.address, '0x54cb6A94D7191Df4E4b6F9C6Ce225427c0038593')
})

test('get the ropsten Lockup contract object.', async (t) => {
	const lockup = await getLockupInstance(null as any, 'ropsten')
	t.is(lockup.address, '0xb8b7a92A716318F2CCed7eA856BE029969552582')
})

// getLockup
test('Returns mainnet dev address', async (t) => {
	const res = await getLockupAddress('mainnet')
	t.is(res, '0x54cb6A94D7191Df4E4b6F9C6Ce225427c0038593')
})

test('Returns ropsten dev address', async (t) => {
	const res = await getLockupAddress('ropsten')
	t.is(res, '0xb8b7a92A716318F2CCed7eA856BE029969552582')
})
