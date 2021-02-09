/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable functional/immutable-data */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable functional/no-let */
/* eslint-disable functional/prefer-readonly-type */
import test from 'ava'
import sinon from 'sinon'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { oraclize } from './oraclize'
import * as contractModules from './contract'
import * as graphqlModules from './graphql'

let getProvider: sinon.SinonStub<
	[network: string],
	ethers.providers.BaseProvider
>
let getTransactionBlockNumber: sinon.SinonStub<
	[provider: ethers.providers.BaseProvider, transactionHash: string],
	Promise<number>
>
let getLockupContract: sinon.SinonStub<
	[provider: ethers.providers.BaseProvider],
	Promise<ethers.Contract>
>
let getLockupSumValues: sinon.SinonStub<
	[network: string],
	Promise<
		readonly {
			readonly property_address: string
			readonly sum_values: string
		}[]
	>
>
let getAuthinticatedProperty: sinon.SinonStub<
	[network: string],
	Promise<readonly { readonly property: string }[]>
>
const mainnetProvider = ethers.getDefaultProvider('homestead')
const ropstenProvider = ethers.getDefaultProvider('ropsten')
test.before(() => {
	getProvider = sinon.stub(contractModules, 'getProvider')
	getProvider.withArgs('mainnet').returns(mainnetProvider)
	getProvider.withArgs('ropsten').returns(ropstenProvider)
	getTransactionBlockNumber = sinon.stub(
		contractModules,
		'getTransactionBlockNumber'
	)
	getTransactionBlockNumber
		.withArgs(mainnetProvider, 'toransaction-hash')
		.resolves(198700)
	getLockupContract = sinon.stub(contractModules, 'getLockupContract')
	getLockupContract.withArgs(mainnetProvider).resolves({
		filters: {
			Lockedup: function () {
				return {} as any
			},
		},
		queryFilter: function (_a: any, _b: any, _c: any) {
			return []
		},
		cap: function () {
			return 1817121
		},
	} as any)
	getLockupContract.withArgs(ropstenProvider).resolves({
		filters: {
			Lockedup: function () {
				return {} as any
			},
		},
		queryFilter: function (_a: any, _b: any, _c: any) {
			return [{}]
		},
		cap: function () {
			return 0
		},
	} as any)
	getLockupSumValues = sinon.stub(graphqlModules, 'getLockupSumValues')
	getLockupSumValues.withArgs('mainnet').resolves([
		{
			property_address: '0xhogehogeaddress1',
			sum_values: '1000000',
		},
		{
			property_address: '0xhogehogeaddress2',
			sum_values: '2000000',
		},
		{
			property_address: '0xhogehogeaddress3',
			sum_values: '3000000',
		},
	])
	getLockupSumValues.withArgs('ropsten').resolves([
		{
			property_address: '0xhogehogeaddress1',
			sum_values: '1000000',
		},
		{
			property_address: '0xhogehogeaddress2',
			sum_values: '2000000',
		},
	])
	getAuthinticatedProperty = sinon.stub(
		graphqlModules,
		'getAuthinticatedProperty'
	)
	getAuthinticatedProperty.withArgs('mainnet').resolves([
		{
			property: '0xhogehogeaddress1',
		},
		{
			property: '0xhogehogeaddress2',
		},
		{
			property: '0xhogehogeaddress3',
		},
	])
	getAuthinticatedProperty.withArgs('ropsten').resolves([
		{
			property: '0xhogehogeaddress1',
		},
		{
			property: '0xhogehogeaddress2',
		},
	])
})

test('oraclize is executed.', async (t) => {
	const res = await oraclize({
		signatureOptions: { address: 'account', id: 'signature', message: 'data' },
		query: {
			allData: '{}',
			publicSignature: 'dummy-public-signature',
			transactionhash: 'toransaction-hash',
		} as any,
		network: 'mainnet',
	})
	const result = new BigNumber(res!.message)
	t.is(result.toFixed(0), result.toString())
	t.is(result.gt('1'), true)
	t.is(res!.status, 0)
	t.is(res!.statusMessage, 'mainnet dummy-public-signature')
})

test('oraclize is not executed.', async (t) => {
	const res = await oraclize({
		signatureOptions: { address: 'account', id: 'signature', message: 'data' },
		query: {
			allData: '{}',
			publicSignature: 'dummy-public-signature',
			transactionhash: 'toransaction-hash',
		} as any,
		network: 'ropsten',
	})
	t.is(typeof res === 'undefined', true)
})

test.after(() => {
	getProvider.restore()
	getTransactionBlockNumber.restore()
	getLockupContract.restore()
	getLockupSumValues.restore()
	getAuthinticatedProperty.restore()
})
