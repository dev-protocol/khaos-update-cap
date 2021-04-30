import { providers, BigNumber } from 'ethers'
import {
	getDevBalanceOfLiquidityPool,
	getWEthBalanceOfLiquidityPool,
} from './balance'
import { getLockupSumValues, getAuthinticatedProperty } from './graphql'
import { getAuthinticatedPropertyList, getLockupValuesMap } from './format'
import { calculateGeometricMean, calculateArithmeticMean } from './calculate'

export const getCap = async (
	provider: providers.BaseProvider
): Promise<BigNumber> => {
	const devBalance = await getDevBalanceOfLiquidityPool(provider)
	const wEthBalance = await getWEthBalanceOfLiquidityPool(provider)
	const authinticatedPropertoes = await getAuthinticatedProperty('v1')
	const lockupSumValues = await getLockupSumValues('v1')
	const authinticatedPropertyList = getAuthinticatedPropertyList(
		authinticatedPropertoes
	)
	const lockupValuesMap = getLockupValuesMap(lockupSumValues)
	const geometricMean = calculateGeometricMean(
		lockupValuesMap,
		authinticatedPropertyList
	)
	const arithmeticMean = calculateArithmeticMean(
		lockupValuesMap,
		authinticatedPropertyList
	)
	const tmp = BigNumber.from(1).sub(wEthBalance.div(devBalance))
	return devBalance.mul(tmp).mul(12).mul(geometricMean).div(arithmeticMean)
}
