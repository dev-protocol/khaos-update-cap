/* eslint-disable @typescript-eslint/no-unused-vars */
import test from 'ava'
import equal from 'deep-equal'
import {
	isSameVal,
	isLatestLockedupEvent,
	isLongTimeSinceLastUpdate,
} from './check-details'
import { bignumber } from 'mathjs'

test('If the values are the same, true will be returned.', async (t) => {
	const capFunc = async (): Promise<any> => {
		return bignumber(100) as any
	}
	const res = await isSameVal({ cap: capFunc } as any, bignumber('100'))
	t.true(res)
})

test('If the value is different, false will be returned.', async (t) => {
	const capFunc = async (): Promise<any> => {
		return bignumber(200) as any
	}
	const res = await isSameVal({ cap: capFunc } as any, bignumber(100))
	t.false(res)
})

test('If the retrieved event is 0, true will return.', async (t) => {
	const getTransactionFunc = async (hash: string): Promise<any> => {
		return { blockNumber: 600000 }
	}
	const LockedupFunc = (): any => {
		return {}
	}
	const queryFilterFunc = async (
		arg1: any,
		blockNumber: any,
		flg: string
	): Promise<readonly []> => {
		return []
	}
	const res = await isLatestLockedupEvent(
		{ getTransaction: getTransactionFunc } as any,
		{
			filters: {
				Lockedup: LockedupFunc,
			},
			queryFilter: queryFilterFunc,
		} as any,
		'dummy-hash'
	)
	t.true(res)
})

test('If the retrieved event is not zero, false will return.', async (t) => {
	const getTransactionFunc = async (hash: string): Promise<any> => {
		return { blockNumber: 600000 }
	}
	const LockedupFunc = (): any => {
		return {}
	}
	const queryFilterFunc = async (
		arg1: any,
		blockNumber: any,
		flg: string
	): Promise<readonly [any]> => {
		return ['dummy']
	}
	const res = await isLatestLockedupEvent(
		{ getTransaction: getTransactionFunc } as any,
		{
			filters: {
				Lockedup: LockedupFunc,
			},
			queryFilter: queryFilterFunc,
		} as any,
		'dummy-hash'
	)
	t.false(res)
})

test('If there is an update cap event within the default block number', async (t) => {
	const getBlockNumberFunc = async (): Promise<number> => {
		return 14305760
	}
	const UpdateCapFunc = (): any => {
		return { filter: {} }
	}
	const queryFilterFunc = async (
		arg1: any,
		blockNumber: any,
		flg: string
	): Promise<readonly [any]> => {
		t.true(equal(arg1, { filter: {} }))
		t.is(blockNumber, 14300000)
		t.is(flg, 'latest')
		return ['dummy']
	}
	const res = await isLongTimeSinceLastUpdate(
		{ getBlockNumber: getBlockNumberFunc } as any,
		{
			filters: {
				UpdateCap: UpdateCapFunc,
			},
			queryFilter: queryFilterFunc,
		} as any
	)
	t.false(res)
})

test('If there is no update cap event within the default block number', async (t) => {
	const getBlockNumberFunc = async (): Promise<number> => {
		return 14315760
	}
	const UpdateCapFunc = (): any => {
		return { filter: {} }
	}
	const queryFilterFunc = async (
		arg1: any,
		blockNumber: any,
		flg: string
	): Promise<readonly []> => {
		t.true(equal(arg1, { filter: {} }))
		t.is(blockNumber, 14310000)
		t.is(flg, 'latest')
		return []
	}
	const res = await isLongTimeSinceLastUpdate(
		{ getBlockNumber: getBlockNumberFunc } as any,
		{
			filters: {
				UpdateCap: UpdateCapFunc,
			},
			queryFilter: queryFilterFunc,
		} as any
	)
	t.true(res)
})
