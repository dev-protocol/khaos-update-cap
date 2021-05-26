import test from 'ava'
import { getAddressConfigInstance } from './addressConfig'

// getAddressConfigInstance
test('get the AddressConfig contract object.(mainnet)', async (t) => {
	const dummyDetectNetwork = async (): Promise<any> => {
		return {
			chainId: 1
		}
	}
	const addressConfig = await getAddressConfigInstance({
		detectNetwork: dummyDetectNetwork,
		_isProvider: true,
	} as any)
	t.is(addressConfig.address, '0x1D415aa39D647834786EB9B5a333A50e9935b796')
})

test('get the AddressConfig contract object.(ropsten)', async (t) => {
	const dummyDetectNetwork = async (): Promise<any> => {
		return {
			chainId: 3
		}
	}
	const addressConfig = await getAddressConfigInstance({
		detectNetwork: dummyDetectNetwork,
		_isProvider: true,
	} as any)
	t.is(addressConfig.address, '0xD6D07f1c048bDF2B3d5d9B6c25eD1FC5348D0A70')
})
