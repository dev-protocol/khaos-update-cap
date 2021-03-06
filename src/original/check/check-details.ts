import { ethers, providers } from 'ethers'
import { bignumber, BigNumber } from 'mathjs'

export const isSameVal = async (
	lockup: ethers.Contract,
	nextCap: BigNumber
): Promise<boolean> => {
	const cap = await lockup.cap()
	return bignumber(cap.toString()).eq(nextCap)
}

export const isLatestLockedupEvent = async (
	provider: providers.BaseProvider,
	lockup: ethers.Contract,
	transactionHash: string
): Promise<boolean> => {
	const blockNumber = await getTransactionBlockNumber(provider, transactionHash)
	const lockedup = lockup.filters.Lockedup()
	const events = await lockup.queryFilter(lockedup, blockNumber + 1, 'latest')
	return events.length === 0
}

const getTransactionBlockNumber = async (
	provider: providers.BaseProvider,
	transactionHash: string
): Promise<number> => {
	const transaction = await provider.getTransaction(transactionHash)
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	return transaction.blockNumber!
}

const BLOCK_NUMBER_SPAN = 5760

export const isLongTimeSinceLastUpdate = async (
	provider: providers.BaseProvider,
	lockup: ethers.Contract
): Promise<boolean> => {
	const currentBlockNumber = await provider.getBlockNumber()
	const updateCap = lockup.filters.UpdateCap()
	const events = await lockup.queryFilter(
		updateCap,
		currentBlockNumber - BLOCK_NUMBER_SPAN,
		'latest'
	)
	return events.length === 0
}
