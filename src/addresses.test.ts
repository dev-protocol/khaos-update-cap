/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import { addresses } from './addresses'

test('Returns mainnet lockup address', async (t) => {
	const res = await addresses({ network: 'mainnet' })
	t.is(res, '0x54cb6A94D7191Df4E4b6F9C6Ce225427c0038593')
})

test('Returns ropsten lockup address', async (t) => {
	const res = await addresses({ network: 'ropsten' })
	t.is(res, '0xb8b7a92A716318F2CCed7eA856BE029969552582')
})
