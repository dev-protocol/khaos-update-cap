/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import test from 'ava'
import { bignumber, BigNumber } from 'mathjs'
import sinon from 'sinon'
import { oraclize } from './oraclize'
import * as providerModules from './common'
import * as capModules from './original'
import * as checkModules from './original'
import { BaseProvider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'

let getProvider: sinon.SinonStub<[network: string], BaseProvider>
let getCap: sinon.SinonStub<[provider: BaseProvider], Promise<BigNumber>>
let isUpdateCap: sinon.SinonStub<
	[provider: BaseProvider, lockupContract: Contract, transactionHash: string],
	Promise<boolean>
>
let isSameVal: sinon.SinonStub<
	[lockup: Contract, nextCap: BigNumber],
	Promise<boolean>
>
let getLockupInstance: sinon.SinonStub<
	[provider: BaseProvider],
	Promise<Contract>
>

const dummyNumber =
	'3175573141986827732.839958658618868394957633106846215492361'

test.before(() => {
	getProvider = sinon.stub(providerModules, 'getProvider')
	getProvider.withArgs('mainnet').returns({ network: 'mainnet' } as any)
	getLockupInstance = sinon.stub(providerModules, 'getLockupInstance')
	getLockupInstance
		.withArgs({ network: 'mainnet' } as any)
		.returns({ name: 'lockup' } as any)
	isUpdateCap = sinon.stub(checkModules, 'isUpdateCap')
	getCap = sinon.stub(capModules, 'getCap')
	isSameVal = sinon.stub(checkModules, 'isSameVal')
})

test('Returns oraclize data', async (t) => {
	isUpdateCap
		.withArgs(
			{ network: 'mainnet' } as any,
			{ name: 'lockup' } as any,
			'dummy-transaction'
		)
		.resolves(true)
	getCap
		.withArgs({ network: 'mainnet' } as any)
		.resolves(bignumber(dummyNumber))
	isSameVal
		.withArgs({ name: 'lockup' } as any, bignumber(dummyNumber.split('.')[0]))
		.resolves(false)
	const query = {
		transactionhash: 'dummy-transaction',
		publicSignature: 'dummy-sig',
	}
	const res = await oraclize({
		query: query as any,
		network: 'mainnet',
		signatureOptions: null as any,
	})
	t.is(res!.message, '3175573141986827732')
	t.is(res!.status, 0)
	t.is(res!.statusMessage, 'mainnet dummy-sig')
})

test('Returns undefind', async (t) => {
	isUpdateCap
		.withArgs(
			{ network: 'mainnet' } as any,
			{ name: 'lockup' } as any,
			'dummy-transaction2'
		)
		.resolves(false)
	const query = {
		transactionhash: 'dummy-transaction2',
		publicSignature: 'dummy-sig',
	}
	const res = await oraclize({
		query: query as any,
		network: 'mainnet',
		signatureOptions: null as any,
	})
	t.true(typeof res === 'undefined')
})

test.after(() => {
	getProvider.restore()
	getCap.restore()
	isUpdateCap.restore()
	isSameVal.restore()
	getLockupInstance.restore()
})
