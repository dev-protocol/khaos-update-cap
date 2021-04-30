import { BigNumber } from 'ethers'
import { pow, bignumber, divide } from 'mathjs'

export const calculateGeometricMean = (
	valueMap: ReadonlyMap<string, string>,
	authinticatedProperties: readonly string[]
): BigNumber => {
	const values = authinticatedProperties.map((property) => {
		const value = valueMap.get(property)
		const tmp = typeof value === 'undefined' ? '1000000000000000000' : value
		return BigNumber.from(tmp)
	})
	return values.length === 0 ? BigNumber.from(0) : innerCalculateGeometricMean(values)
}

const innerCalculateGeometricMean = (values: readonly BigNumber[]): BigNumber => {
	const result = values.reduce((data1, data2) => {
		return data1.mul(data2)
	})
	const tmp = divide(1, values.length)
	const calculationResults = pow(
		bignumber(result.toString()),
		bignumber(tmp.toString())
	)
	return BigNumber.from(bignumber(calculationResults.toString()).toFixed(0))
}

export const calculateArithmeticMean = (
	valueMap: ReadonlyMap<string, string>,
	authinticatedProperties: readonly string[]
): BigNumber => {
	const values = authinticatedProperties.map((property) => {
		const value = valueMap.get(property)
		const tmp = typeof value === 'undefined' ? '0' : value
		return BigNumber.from(tmp)
	})

	const result = values.length === 0 ? BigNumber.from(0) : innerCalculateArithmeticMean(values)
	return result
}

const innerCalculateArithmeticMean = (values: readonly BigNumber[]): BigNumber => {
	const result = values.reduce((data1, data2) => {
		return data1.add(data2)
	})
	return result.div(values.length)
}
