import { providers, BigNumber } from 'ethers'
import { bignumber, BigNumber as MathBigNumber } from 'mathjs'
import { getErc20Instance, getAddressConfigInstance } from '../common'

const UNISWAP_LP = '0x4168CEF0fCa0774176632d86bA26553E3B9cF59d'
const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'

export const getDevBalanceOfLiquidityPool = async (
	provider: providers.BaseProvider
): Promise<MathBigNumber> => {
	const addressConfigInstance = getAddressConfigInstance(provider)
	const devTokenAddress: string = await addressConfigInstance.token()
	const devInstance = getErc20Instance(devTokenAddress, provider)
	const balance: BigNumber = await devInstance.balanceOf(UNISWAP_LP)
	return bignumber(balance.toString())
}

export const getWEthBalanceOfLiquidityPool = async (
	provider: providers.BaseProvider
): Promise<MathBigNumber> => {
	const wEthInstance = getErc20Instance(WETH, provider)
	const balance: BigNumber = await wEthInstance.balanceOf(UNISWAP_LP)
	return bignumber(balance.toString())
}
