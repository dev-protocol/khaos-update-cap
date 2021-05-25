import test from 'ava'
import { event } from './event'

test('Returns `Lockedup` when passed network is mainnet', async (t) => {
	t.is(await event({ network: 'mainnet' }), 'Lockedup')
})

test('Returns `Lockedup` when passed network is ropsten', async (t) => {
	t.is(await event({ network: 'ropsten' }), 'Lockedup')
})
