/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import sinon from 'sinon'
import { ethers } from 'ethers'
import { addresses } from './addresses'
import { getLockupAddress } from './test-utils'
import * as contractModules from './contract'

let stub: sinon.SinonStub<[network: string], ethers.providers.BaseProvider>
test.before(() => {
	const mainnetProvider = ethers.getDefaultProvider('homestead')
	const ropstenProvider = ethers.getDefaultProvider('ropsten')
	stub = sinon.stub(contractModules, 'getProvider')
	stub.withArgs('mainnet').returns(mainnetProvider)
	stub.withArgs('ropsten').returns(ropstenProvider)
})

test('Returns mainnet lockup address', async (t) => {
	const provider = ethers.getDefaultProvider('homestead')
	const res = await addresses({ network: 'mainnet' })
	const lockupAddress = await getLockupAddress(
		'0x1D415aa39D647834786EB9B5a333A50e9935b796',
		provider
	)
	t.is(res, lockupAddress)
})

test('Returns ropsten lockup address', async (t) => {
	const provider = ethers.getDefaultProvider('ropsten')
	const res = await addresses({ network: 'ropsten' })
	const lockupAddress = await getLockupAddress(
		'0xD6D07f1c048bDF2B3d5d9B6c25eD1FC5348D0A70',
		provider
	)
	t.is(res, lockupAddress)
})
test.after(() => {
	stub.restore()
})
