import { NetworkName } from '@devprotocol/khaos-core'

export const getDevAddress = (network: NetworkName): string => {
	return network === 'mainnet'
		? '0x5cAf454Ba92e6F2c929DF14667Ee360eD9fD5b26'
		: '0x5312f4968901Ec9d4fc43d2b0e437041614B14A2'
}
