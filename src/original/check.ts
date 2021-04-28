import { ethers, providers, BigNumber } from 'ethers'
import { getLockupInstance } from '../common/contract'

export const isUpdateCap = async (
	provider: providers.BaseProvider,
	nextCap: BigNumber,
	transactionHash: string
): Promise<boolean> => {
	const lockupContract = await getLockupInstance(provider)
	const isSame = await isSameVal(lockupContract, nextCap)
	const isLastEvent = await isLatestLockedupEvent(
		provider,
		lockupContract,
		transactionHash
	)
	return isSame === false && isLastEvent
}

const isSameVal = async (
	lockup: ethers.Contract,
	nextCap: BigNumber
): Promise<boolean> => {
	const cap = await lockup.cap()
	return BigNumber.from(cap).eq(nextCap)
}

const isLatestLockedupEvent = async (
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
