export enum ColorPalette {
    // text decorators
    Reset = "\x1b[0m",
    Bright = "\x1b[1m",
    Dim = "\x1b[2m",
    Underscore = "\x1b[4m",
    Blink = "\x1b[5m",
    Reverse = "\x1b[7m",
    Hidden = "\x1b[8m",

    // text colors
    FgBlack = "\x1b[30m",
    FgRed = "\x1b[31m",
    FgGreen = "\x1b[32m",
    FgYellow = "\x1b[33m",
    FgBlue = "\x1b[34m",
    FgMagenta = "\x1b[35m",
    FgCyan = "\x1b[36m",
    FgWhite = "\x1b[37m",

    // background colors
    BgBlack = "\x1b[40m",
    BgRed = "\x1b[41m",
    BgGreen = "\x1b[42m",
    BgYellow = "\x1b[43m",
    BgBlue = "\x1b[44m",
    BgMagenta = "\x1b[45m",
    BgCyan = "\x1b[46m",
    BgWhite = "\x1b[47m",
}

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
