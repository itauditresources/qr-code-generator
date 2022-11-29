import assert from "assert/strict";
import { describe, it } from "mocha";

import { ColorPalette } from "../src/server/utils/Logging";

describe("Logging module", function () {
    it("print function should return the right color from the palette", function () {
        const print = (color: string) => {
            const colorKeys = Object.keys(ColorPalette);
            const colorValues = Object.values(ColorPalette);

            let res = "";

            colorKeys.forEach((value, index) => {
                if (
                    color === value.toLowerCase().slice(2) &&
                    value.toLowerCase().slice(0, 2) === "fg"
                ) {
                    res = colorValues[index];
                }
            });

            return res;
        };

        assert.deepEqual(print("red"), "\x1b[31m");
    });

    it("print function returns data with color code and break code", function () {
        const print = (color: string, data: string) => {
            const colorKeys = Object.keys(ColorPalette);
            const colorValues = Object.values(ColorPalette);

            let res = "";

            colorKeys.forEach((value, index) => {
                if (
                    color === value.toLowerCase().slice(2) &&
                    value.toLowerCase().slice(0, 2) === "fg"
                ) {
                    res = colorValues[index];
                }
            });

            return `${res}${data}${ColorPalette.Reset}`;
        };

        assert.deepEqual(print("red", "123"), "\x1b[31m123\x1b[0m");
    });
});
