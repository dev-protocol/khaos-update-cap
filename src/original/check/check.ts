import { ethers, providers } from 'ethers'
import {
	isLongTimeSinceLastUpdate,
	isLatestLockedupEvent,
} from './check-details'

export const isUpdateCap = async (
	provider: providers.BaseProvider,
	lockupContract: ethers.Contract,
	transactionHash: string
): Promise<boolean> => {
	const isLongTimeNotUpdate = await isLongTimeSinceLastUpdate(
		provider,
		lockupContract
	)
	const isLastEvent = isLongTimeNotUpdate
		? await isLatestLockedupEvent(provider, lockupContract, transactionHash)
		: false
	return isLastEvent
}
