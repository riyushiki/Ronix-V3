function assertNumber(number) {
	if (typeof number !== 'number') {
		throw new TypeError('Expected a number');
	}
}

export function numberSortAscending(left, right) {
	assertNumber(left);
	assertNumber(right);

	if (Number.isNaN(left)) {
		return -1;
	}

	if (Number.isNaN(right)) {
		return 1;
	}

	return left - right;
}

export function numberSortDescending(left, right) {
	assertNumber(left);
	assertNumber(right);

	if (Number.isNaN(left)) {
		return 1;
	}

	if (Number.isNaN(right)) {
		return -1;
	}

	return right - left;
}
