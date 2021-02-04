import { FunctionPack } from '@devprotocol/khaos-core'

export const pack: FunctionPack = async ({ results }) => {
	return {
		name: 'updateSet',
		args: [results.message],
	}
}
