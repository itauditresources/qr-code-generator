import assert from 'assert/strict';
import { describe, it } from 'mocha';

import { ColorPalette, Logging } from '../utils/Logging';

describe('Logging module', function () {
	it('print function should return the right color from the palette', function () {
		const print = (color: string) => {
			const colorArray: ColorPalette[] = Object.values(ColorPalette);

			colorArray.forEach((value, index) => {
				if (color === value.toLowerCase().slice(2)) {
					return `${colorArray[index]}`;
				}
			});
		};

		assert.deepEqual(print('green'), '\x1b[32m');
	});
});
