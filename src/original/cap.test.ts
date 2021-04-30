/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import sinon from 'sinon'
import { providers } from 'ethers'
import { bignumber, BigNumber } from 'mathjs'
import { getCap } from './cap'
import * as balanceModules from './balance'
import * as graphqlModules from './graphql'

let getDevBalanceOfLiquidityPool: sinon.SinonStub<
	[provider: providers.BaseProvider],
	Promise<BigNumber>
>
let getWEthBalanceOfLiquidityPool: sinon.SinonStub<
	[provider: providers.BaseProvider],
	Promise<BigNumber>
>
let getAuthinticatedProperty: sinon.SinonStub<
	[version: string],
	Promise<readonly { readonly property: string }[]>
>
let getLockupSumValues: sinon.SinonStub<
	[version: string],
	Promise<
		readonly {
			readonly property_address: string
			readonly sum_values: string
		}[]
	>
>

test.before(() => {
	getDevBalanceOfLiquidityPool = sinon.stub(
		balanceModules,
		'getDevBalanceOfLiquidityPool'
	)
	getDevBalanceOfLiquidityPool
		.withArgs(null as any)
		.resolves(bignumber('20000000000000000000000'))

	getWEthBalanceOfLiquidityPool = sinon.stub(
		balanceModules,
		'getWEthBalanceOfLiquidityPool'
	)
	getWEthBalanceOfLiquidityPool
		.withArgs(null as any)
		.resolves(bignumber('100000000000000000000'))

	getAuthinticatedProperty = sinon.stub(
		graphqlModules,
		'getAuthinticatedProperty'
	)
	getAuthinticatedProperty
		.withArgs('v1')
		.resolves([
			{ property: '0xhogehoge' },
			{ property: '0xhugahuga' },
			{ property: '0xbaubau' },
			{ property: '0xuiruiruir' },
			{ property: '0xoiroiroir' },
		])

	getLockupSumValues = sinon.stub(graphqlModules, 'getLockupSumValues')
	getLockupSumValues.withArgs('v1').resolves([
		{ property_address: '0xhogehoge', sum_values: '10000000000000000000000' },
		{ property_address: '0xhugahuga', sum_values: '20000000000000000000000' },
		{ property_address: '0xbaubau', sum_values: '30000000000000000000000' },
	])
})

test('get withdraw cap', async (t) => {
	const res = await getCap(null as any)
	t.is(
		res.toFixed(),
		'7152919319288666086753.21108429127155937377694420110723946810172'
	)
})

test.after(() => {
	getDevBalanceOfLiquidityPool.restore()
	getWEthBalanceOfLiquidityPool.restore()
	getAuthinticatedProperty.restore()
	getLockupSumValues.restore()
})
