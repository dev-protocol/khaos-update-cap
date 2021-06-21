import { providers } from 'ethers'
import { NetworkName } from '@devprotocol/khaos-core'
import {
	getDevBalanceOfLiquidityPool,
	getWEthBalanceOfLiquidityPool,
} from './balance'
import { getLockupSumValues, getAuthinticatedProperty } from './graphql'
import { getAuthinticatedPropertyList, getLockupValuesMap } from './format'
import { calculateGeometricMean, calculateArithmeticMean } from './calculate'
import { bignumber, BigNumber } from 'mathjs'

export const getCap = async (
	provider: providers.BaseProvider,
	network: NetworkName
): Promise<BigNumber> => {
	const devBalance = await getDevBalanceOfLiquidityPool(provider, network)
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
	const tmp = bignumber(1).sub(wEthBalance.div(devBalance))
	return devBalance
		.times(tmp)
		.times(12)
		.times(geometricMean)
		.div(arithmeticMean)
}
