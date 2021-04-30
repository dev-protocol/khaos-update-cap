/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */

import test from 'ava'
import { BigNumber, Contract } from 'ethers'
import sinon from 'sinon'
import { isUpdateCap } from './check'
import * as checkDetailsModules from './check-details'
import * as commonModules from './../../common'
import { BaseProvider } from '@ethersproject/providers'

let isSameVal: sinon.SinonStub<[lockup: Contract, nextCap: BigNumber], Promise<boolean>>
let isLatestLockedupEvent: sinon.SinonStub<[provider: BaseProvider, lockup: Contract, transactionHash: string], Promise<boolean>>
let getLockupInstance: sinon.SinonStub<[provider: BaseProvider], Promise<Contract>>



test.before(() => {
	isSameVal = sinon.stub(
		checkDetailsModules,
		'isSameVal'
	)
	isLatestLockedupEvent = sinon.stub(
		checkDetailsModules,
		'isLatestLockedupEvent'
	)
	getLockupInstance = sinon.stub(
		commonModules,
		'getLockupInstance'
	)
	getLockupInstance.withArgs(null as any)
		.resolves(null as any)
})

test('If it is the last event and the current value is the same.', async (t) => {
	isSameVal
		.withArgs(null as any, BigNumber.from(100))
		.resolves(true)
	isLatestLockedupEvent.withArgs(null as any, null as any, 'dummy-hash')
		.resolves(true)
	const res = await isUpdateCap(null as any, BigNumber.from(100), 'dummy-hash')
	t.false(res)
})

test('If it is not the last event and the current value is the same.', async (t) => {
	isSameVal
		.withArgs(null as any, BigNumber.from(300))
		.resolves(true)
	isLatestLockedupEvent.withArgs(null as any, null as any, 'dummy-hash2')
		.resolves(false)
	const res = await isUpdateCap(null as any, BigNumber.from(300), 'dummy-hash2')
	t.false(res)
})

test('If it is the last event and the current value is different', async (t) => {
	isSameVal
		.withArgs(null as any, BigNumber.from(200))
		.resolves(false)
	isLatestLockedupEvent.withArgs(null as any, null as any, 'dummy-hash3')
		.resolves(true)
	const res = await isUpdateCap(null as any, BigNumber.from(200), 'dummy-hash3')
	t.true(res)
})

test('If it is not the last event and the current value is different', async (t) => {
	isSameVal
		.withArgs(null as any, BigNumber.from(400))
		.resolves(false)
	isLatestLockedupEvent.withArgs(null as any, null as any, 'dummy-hash4')
		.resolves(false)
	const res = await isUpdateCap(null as any, BigNumber.from(400), 'dummy-hash4')
	t.false(res)
})

test.after(() => {
	isSameVal.restore()
	isLatestLockedupEvent.restore()
	getLockupInstance.restore()
})
