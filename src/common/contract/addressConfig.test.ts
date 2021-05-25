import test from 'ava'
import { getAddressConfigInstance } from './addressConfig'

// getAddressConfigInstance
test('get the AddressConfig contract object.', async (t) => {
	const addressConfig = await getAddressConfigInstance(null as any)
	t.is(addressConfig.address, '0x1D415aa39D647834786EB9B5a333A50e9935b796')
})
