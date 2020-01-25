// Insert-sort like function, obviously used stack overflow https://stackoverflow.com/questions/1344500/
// binary search for the index, where new case/event should be inserted
export function sortedArrayItemInsertionIndex<T>(array: Array<T>, value: T, lessThanBy: (x: T,y: T) => boolean ): number {
	let lowIndex = 0, highIndex = array.length;

	while (lowIndex < highIndex) {
		const middleIndex = (lowIndex + highIndex) >>> 1;
		const lessThanResult = lessThanBy(array[middleIndex], value);
		if (lessThanResult === true) {
			lowIndex = middleIndex + 1;
		} else {
			highIndex = middleIndex;
		}
	}
	return lowIndex;
}

