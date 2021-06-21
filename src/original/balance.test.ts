/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-conditional-statement */
import test from 'ava'
import sinon from 'sinon'
import { providers, BigNumber, Contract } from 'ethers'
import * as contractModules from '../common'
import {
	getWEthBalanceOfLiquidityPool,
	getDevBalanceOfLiquidityPool,
} from './balance'

let getErc20Instance: sinon.SinonStub<
	[address: string, provider: providers.BaseProvider],
	Contract
>

const balanceOfFunc = async (address: string): Promise<BigNumber> => {
	if (address == '0x4168CEF0fCa0774176632d86bA26553E3B9cF59d') {
		return BigNumber.from(100)
	}
	return BigNumber.from(0)
}

test.before(() => {
	getErc20Instance = sinon.stub(contractModules, 'getErc20Instance')
	getErc20Instance
		.withArgs('0x5cAf454Ba92e6F2c929DF14667Ee360eD9fD5b26', null as any)
		.returns({ balanceOf: balanceOfFunc } as any)
	getErc20Instance
		.withArgs('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', null as any)
		.returns({ balanceOf: balanceOfFunc } as any)
})

// getDevBalanceOfLiquidityPool
test('get dev balance.', async (t) => {
	const balance = await getDevBalanceOfLiquidityPool(null as any, 'mainnet')
	t.true(balance.eq(100))
})

// getWEthBalanceOfLiquidityPool
test('get weth balance.', async (t) => {
	const balance = await getWEthBalanceOfLiquidityPool(null as any)
	t.true(balance.eq(100))
})

test.after(() => {
	getErc20Instance.restore()
})
