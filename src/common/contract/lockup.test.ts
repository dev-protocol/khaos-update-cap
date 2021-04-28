/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */

import test from 'ava'
import { ethers } from 'ethers'
import sinon from 'sinon'
import {
	lockupAbi,
	getLockupInstance,
} from './lockup'
import * as addressConfigModules from './addressConfig'

let getAddressConfigInstance: sinon.SinonStub<[provider: ethers.providers.BaseProvider], ethers.Contract>

const DUMMY_LOCKUP_ADDRESS = '0xF9A78B4fE89C11493dCcC66d95b1f071191149D5'

const lockupFunc = async (): Promise<string> => {
	return DUMMY_LOCKUP_ADDRESS
}

test.before(() => {
	getAddressConfigInstance = sinon.stub(addressConfigModules, 'getAddressConfigInstance')
	getAddressConfigInstance.withArgs(null as any).returns({ lockup: lockupFunc } as any)
})

// lockupAbi
test('lthis function can get the ABI of the Lockup contract.', (t) => {
	t.is(lockupAbi[0], 'event Lockedup(address, address, uint256)')
	t.is(lockupAbi[1], 'function updateCap(uint256) external')
	t.is(lockupAbi[2], 'function cap() external view returns (uint256)')
})

// getLockupInstance
test('get the Lockup contract object.', async (t) => {
	const lockup = await getLockupInstance(null as any)
	t.is(lockup.address, DUMMY_LOCKUP_ADDRESS)
})

test.after(() => {
	getAddressConfigInstance.restore()
})
