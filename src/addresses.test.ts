/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import sinon from 'sinon'
import { ethers } from 'ethers'
import { addresses } from './addresses'
import * as providerModules from './common'
import * as contractModules from './common'

let getProvider: sinon.SinonStub<
	[network: string],
	ethers.providers.BaseProvider
>
let getLockupInstance: sinon.SinonStub<
	[provider: ethers.providers.BaseProvider],
	Promise<ethers.Contract>
>

test.before(() => {
	getProvider = sinon.stub(providerModules, 'getProvider')
	getProvider.withArgs('mainnet').returns('mainnet' as any)
	getProvider.withArgs('ropsten').returns('ropsten' as any)
	getLockupInstance = sinon.stub(contractModules, 'getLockupInstance')
	getLockupInstance
		.withArgs('mainnet' as any)
		.resolves({ address: 'mainnet-address' } as any)
	getLockupInstance
		.withArgs('ropsten' as any)
		.resolves({ address: 'ropsten-address' } as any)
})

test('Returns mainnet lockup address', async (t) => {
	const res = await addresses({ network: 'mainnet' })
	t.is(res, 'mainnet-address')
})

test('Returns ropsten lockup address', async (t) => {
	const res = await addresses({ network: 'ropsten' })
	t.is(res, 'ropsten-address')
})
test.after(() => {
	getProvider.restore()
	getLockupInstance.restore()
})
