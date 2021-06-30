/* eslint-disable @typescript-eslint/no-unused-vars */
import test from 'ava'
import { isSameVal, isLatestLockedupEvent } from './check-details'
import { bignumber, BigNumber } from 'mathjs'

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
