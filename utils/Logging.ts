import { ColorPalette } from "../library/colorPalette";

export class Logging {
    /**
     * Custom CLI logging class. Will be transformed into a logging file class in production
     * @param args data to print to stdout
     * @returns void
     */
    public static info = (args: string, namespace = "INFO") =>
        console.log(
            `[TIME] ${print(
                "green",
                new Date().toLocaleString()
            )} [${namespace}] ${print("green", args)}`
        );
    public static log = (args: string, namespace = "INFO") =>
        console.log(
            `[TIME] ${print(
                "white",
                new Date().toLocaleString()
            )} [${namespace}] ${print("white", args)}`
        );
    public static error = (args: string, namespace = "INFO") =>
        console.log(
            `[TIME] ${print(
                "red",
                new Date().toLocaleString()
            )} [${namespace}] ${print("red", args)}`
        );
    public static warn = (args: string, namespace = "INFO") =>
        console.log(
            `[TIME] ${print(
                "yellow",
                new Date().toLocaleString()
            )} [${namespace}] ${print("yellow", args)}`
        );
}

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
