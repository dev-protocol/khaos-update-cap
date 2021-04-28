/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
/* eslint-disable functional/no-conditional-statement */
import test from 'ava'
import sinon from 'sinon'
import { providers, BigNumber, Contract } from 'ethers'
import * as contractModules from '../common/contract'
import {
	getWEthBalanceOfLiquidityPool,
	getDevBalanceOfLiquidityPool,
} from './balance'

let getAddressConfigInstance: sinon.SinonStub<
	[provider: providers.BaseProvider],
	Contract
>
let getErc20Instance: sinon.SinonStub<
	[address: string, provider: providers.BaseProvider],
	Contract
>

const tokenFunc = async (): Promise<string> => {
	return 'dummy-dev-token-address'
}

const balanceOfFunc = async (address: string): Promise<BigNumber> => {
	if (address == '0x4168CEF0fCa0774176632d86bA26553E3B9cF59d') {
		return BigNumber.from(100)
	}
	return BigNumber.from(0)
}

test.before(() => {
	getAddressConfigInstance = sinon.stub(
		contractModules,
		'getAddressConfigInstance'
	)
	getAddressConfigInstance
		.withArgs(null as any)
		.returns({ token: tokenFunc } as any)
	getErc20Instance = sinon.stub(contractModules, 'getErc20Instance')
	getErc20Instance
		.withArgs('dummy-dev-token-address', null as any)
		.returns({ balanceOf: balanceOfFunc } as any)
	getErc20Instance
		.withArgs('0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', null as any)
		.returns({ balanceOf: balanceOfFunc } as any)
})

// getDevBalanceOfLiquidityPool
test('get dev balance.', async (t) => {
	const balance = await getDevBalanceOfLiquidityPool(null as any)
	t.true(balance.eq(BigNumber.from(100)))
})

// getWEthBalanceOfLiquidityPool
test('get weth balance.', async (t) => {
	const balance = await getWEthBalanceOfLiquidityPool(null as any)
	t.true(balance.eq(BigNumber.from(100)))
})

test.after(() => {
	getAddressConfigInstance.restore()
	getErc20Instance.restore()
})
