import test from 'ava'
import {
	getErc20Instance,
} from './erc20'

const DUMMY_ERC20_ADDRESS = '0xF9A78B4fE89C11493dCcC66d95b1f071191149D5'

// getErc20Instance
test('get the erc20 contract object.', async (t) => {
	const erc20 = await getErc20Instance(DUMMY_ERC20_ADDRESS, null as any)
	t.is(erc20.address, DUMMY_ERC20_ADDRESS)
})
