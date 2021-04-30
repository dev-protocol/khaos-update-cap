import test from 'ava'
import { getLockupValuesMap, getAuthinticatedPropertyList } from './format'

test('get property property', async (t) => {
	const res = await getAuthinticatedPropertyList([
		{
			property: '0xhogehoge'
		},
		{
			property: '0xhugahuga'
		},
		{
			property: '0xabaaba'
		},
	])
	t.is(res.length, 3)
	t.is(res[0], '0xhogehoge')
	t.is(res[1], '0xhugahuga')
	t.is(res[2], '0xabaaba')
})

test('if array count is 0, return 0 array', async (t) => {
	const res = await getAuthinticatedPropertyList([])
	t.is(res.length, 0)
})

test('get property map', async (t) => {
	const res = await getLockupValuesMap([
		{
			property_address: '0xhogehoge',
			sum_values: '100'
		},
		{
			property_address: '0xhugahuga',
			sum_values: '200'
		},
		{
			property_address: '0xabaaba',
			sum_values: '50'
		},
	])
	t.is(res.size, 3)
	t.is(res.get('0xhogehoge'), '100')
	t.is(res.get('0xhugahuga'), '200')
	t.is(res.get('0xabaaba'), '50')
})

test('if array count is 0, return 0 size map', async (t) => {
	const res = await getLockupValuesMap([])
	t.is(res.size, 0)
})
