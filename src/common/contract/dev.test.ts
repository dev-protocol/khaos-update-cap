/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import { getDevAddress } from './dev'

test('Returns mainnet dev address', async (t) => {
	const res = await getDevAddress('mainnet')
	t.is(res, '0x5cAf454Ba92e6F2c929DF14667Ee360eD9fD5b26')
})

test('Returns ropsten dev address', async (t) => {
	const res = await getDevAddress('ropsten')
	t.is(res, '0x5312f4968901Ec9d4fc43d2b0e437041614B14A2')
})
