import test from 'ava'
import { calculateGeometricMean, calculateArithmeticMean } from './calculate'

test('calculate geometric mean', async (t) => {
	const map = new Map<string, string>()
	map.set('0xhogehoge', '10000000000000000000000')
	map.set('0xhugahuga', '20000000000000000000000')
	map.set('0xkayokayo', '30000000000000000000000')
	const readonlyMap: ReadonlyMap<string, string> = map
	const res = calculateGeometricMean(readonlyMap, [
		'0xhogehoge',
		'0xhugahuga',
		'0xkayokayo',
	])
	t.is(
		res.toFixed(),
		'18171205928321396588912.11756327260502428210463141219671481334289'
	)
})

test('calculate geometric mean(If not staked, convert to 1000000000000000000)', async (t) => {
	const map = new Map<string, string>()
	map.set('0xhogehoge', '10000000000000000000000')
	map.set('0xhugahuga', '20000000000000000000000')
	map.set('0xkayokayo', '30000000000000000000000')
	const readonlyMap: ReadonlyMap<string, string> = map
	const res = calculateGeometricMean(readonlyMap, [
		'0xhogehoge',
		'0xhugahuga',
		'0xkayokayo',
		'0xqwerqwer',
		'0xpowefwev',
	])
	t.is(
		res.toFixed(),
		'359443181873802315917.2467881553402793655164293568395597722664181'
	)
})

test('if there is no value, result is 0(calculateGeometricMean)', async (t) => {
	const map = new Map<string, string>()
	const readonlyMap: ReadonlyMap<string, string> = map
	const res = calculateGeometricMean(readonlyMap, [])
	t.is(res.toString(), '0')
})

test('calculate arithmetic mean', async (t) => {
	const map = new Map<string, string>()
	map.set('0xhogehoge', '10000')
	map.set('0xhugahuga', '20000')
	map.set('0xkayokayo', '30000')
	const readonlyMap: ReadonlyMap<string, string> = map
	const res = calculateArithmeticMean(readonlyMap, [
		'0xhogehoge',
		'0xhugahuga',
		'0xkayokayo',
	])
	t.is(res.toString(), '20000')
})

test('calculate arithmetic mean(If not staked, convert to zero)', async (t) => {
	const map = new Map<string, string>()
	map.set('0xhogehoge', '10000')
	map.set('0xhugahuga', '20000')
	map.set('0xkayokayo', '30000')
	const readonlyMap: ReadonlyMap<string, string> = map
	const res = calculateArithmeticMean(readonlyMap, [
		'0xhogehoge',
		'0xhugahuga',
		'0xkayokayo',
		'0xqwerqwer',
		'0xpowefwev',
	])
	t.is(res.toString(), '12000')
})

test('if there is no value, result is 0(calculateArithmeticMean)', async (t) => {
	const map = new Map<string, string>()
	const readonlyMap: ReadonlyMap<string, string> = map
	const res = calculateArithmeticMean(readonlyMap, [])
	t.is(res.toString(), '0')
})
