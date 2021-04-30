import { providers, BigNumber } from 'ethers'
import { getLockupInstance } from '../../common'
import { isSameVal, isLatestLockedupEvent } from './check-details'

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
