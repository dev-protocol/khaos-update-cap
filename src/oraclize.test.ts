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

let getProvider: sinon.SinonStub<[network: string], BaseProvider>
let getCap: sinon.SinonStub<[provider: BaseProvider], Promise<BigNumber>>
let isUpdateCap: sinon.SinonStub<
	[provider: BaseProvider, nextCap: BigNumber, transactionHash: string],
	Promise<boolean>
>

const dummyNumber =
	'3175573141986827732.839958658618868394957633106846215492361'

test.before(() => {
	getProvider = sinon.stub(providerModules, 'getProvider')
	getProvider.withArgs('mainnet').returns({ network: 'mainnet' } as any)

	getCap = sinon.stub(capModules, 'getCap')
	getCap
		.withArgs({ network: 'mainnet' } as any)
		.resolves(bignumber(dummyNumber))
	isUpdateCap = sinon.stub(checkModules, 'isUpdateCap')
	isUpdateCap
		.withArgs(
			{ network: 'mainnet' } as any,
			bignumber(dummyNumber.split('.')[0]),
			'dummy-transaction'
		)
		.resolves(true)
	isUpdateCap
		.withArgs(
			{ network: 'mainnet' } as any,
			bignumber(dummyNumber.split('.')[0]),
			'dummy-transaction2'
		)
		.resolves(false)
})

test('Returns oraclize data', async (t) => {
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
})
