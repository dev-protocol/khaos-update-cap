import test from 'ava'
import { getAddressConfigInstance } from './addressConfig'

// getAddressConfigInstance
test('get the AddressConfig contract object.(mainnet)', async (t) => {
	const addressConfig = await getAddressConfigInstance({
		network: {
			chainId: 1
		},
		_isProvider: true
	} as any)
	t.is(addressConfig.address, '0x1D415aa39D647834786EB9B5a333A50e9935b796')
})

test('get the AddressConfig contract object.(ropsten)', async (t) => {
	const addressConfig = await getAddressConfigInstance({
		network: {
			chainId: 3
		},
		_isProvider: true
	} as any)
	t.is(addressConfig.address, '0xD6D07f1c048bDF2B3d5d9B6c25eD1FC5348D0A70')
})
