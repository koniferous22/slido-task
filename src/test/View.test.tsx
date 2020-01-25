import 'react'
import 'react-test-renderer'

function add(x: number,y: number): number {
	return x + y;
}

test('demo test', () => {
	const result: number = add(1,2);
	expect(result).toEqual(3);
})