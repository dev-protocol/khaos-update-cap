import { providers } from 'ethers'
import { BigNumber } from 'mathjs'
import { NetworkName } from '@devprotocol/khaos-core'
import { getLockupInstance } from '../../common'
import { isSameVal, isLatestLockedupEvent } from './check-details'

export const isUpdateCap = async (
	provider: providers.BaseProvider,
	network: NetworkName,
	nextCap: BigNumber,
	transactionHash: string
): Promise<boolean> => {
	const lockupContract = await getLockupInstance(provider, network)
	const isSame = await isSameVal(lockupContract, nextCap)
	const isLastEvent = await isLatestLockedupEvent(
		provider,
		lockupContract,
		transactionHash
	)
	return isSame === false && isLastEvent
}
