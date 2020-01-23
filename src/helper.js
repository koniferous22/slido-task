
// Insert-sort like function, obviously used stack overflow https://stackoverflow.com/questions/1344500/
// binary search for the index, where new case/event should be inserted
export function sortedArrayItemInsertionIndex(array, value, lessThanBy) {
    let lowIndex = 0, highIndex = array.length;

    while (lowIndex < highIndex) {
        let middleIndex = (lowIndex + highIndex) >>> 1;
    	let lessThanResult = lessThanBy(array[middleIndex], value);
        if (lessThanResult === true) {
        	lowIndex = middleIndex + 1;
        } else {
        	highIndex = middleIndex;
        }
    }
    return lowIndex;
}

