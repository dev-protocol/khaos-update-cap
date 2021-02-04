import test from 'ava'
import { abi } from './abi'

test('Returns abi informations.', async (t) => {
	t.is(
		abi.toString(),
		'event Lockedup(address, address, uint256),function updateCap(uint256) external'
	)
})
