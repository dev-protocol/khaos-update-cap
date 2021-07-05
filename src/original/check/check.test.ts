/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */

import test from 'ava'
import { Contract } from 'ethers'
import sinon from 'sinon'
import { isUpdateCap } from './check'
import * as checkDetailsModules from './check-details'
import { BaseProvider } from '@ethersproject/providers'

let isLongTimeSinceLastUpdate: sinon.SinonStub<
	[provider: BaseProvider, lockup: Contract],
	Promise<boolean>
>

let isLatestLockedupEvent: sinon.SinonStub<
	[provider: BaseProvider, lockup: Contract, transactionHash: string],
	Promise<boolean>
>

test.before(() => {
	isLatestLockedupEvent = sinon.stub(
		checkDetailsModules,
		'isLatestLockedupEvent'
	)
	isLongTimeSinceLastUpdate = sinon.stub(
		checkDetailsModules,
		'isLongTimeSinceLastUpdate'
	)
})

test('If it is the last event and the current value is the same.', async (t) => {
	isLongTimeSinceLastUpdate
		.withArgs({ meinnet: 'net1' } as any, { lockup: 'lockup1' } as any)
		.resolves(true)
	isLatestLockedupEvent
		.withArgs(
			{ meinnet: 'net1' } as any,
			{ lockup: 'lockup1' } as any,
			'dummy-hash1'
		)
		.resolves(true)
	const res = await isUpdateCap(
		{ meinnet: 'net1' } as any,
		{ lockup: 'lockup1' } as any,
		'dummy-hash1'
	)
	t.true(res)
})

test('If it is not the last event and the current value is the same.', async (t) => {
	isLongTimeSinceLastUpdate
		.withArgs({ meinnet: 'net2' } as any, { lockup: 'lockup2' } as any)
		.resolves(false)
	const res = await isUpdateCap(
		{ meinnet: 'net2' } as any,
		{ lockup: 'lockup2' } as any,
		'dummy-hash2'
	)
	t.false(res)
})

test('If it is the last event and the current value is different', async (t) => {
	isLongTimeSinceLastUpdate
		.withArgs({ meinnet: 'net3' } as any, { lockup: 'lockup3' } as any)
		.resolves(true)
	isLatestLockedupEvent
		.withArgs(
			{ meinnet: 'net3' } as any,
			{ lockup: 'lockup3' } as any,
			'dummy-hash3'
		)
		.resolves(false)
	const res = await isUpdateCap(
		{ meinnet: 'net3' } as any,
		{ lockup: 'lockup3' } as any,
		'dummy-hash3'
	)
	t.false(res)
})

test.after(() => {
	isLatestLockedupEvent.restore()
	isLongTimeSinceLastUpdate.restore()
})
