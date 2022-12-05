/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createClient } from "redis";

import { redisConfig } from "../config/config";
import { Logging } from "../utils/Logging";

export const redisClient = createClient(redisConfig);

redisClient.on("error", (err: any) => Logging.error(err, "REDIS"));

// Immediately invoked function expression (IIFE)
void (async () => {
    await redisClient.connect();
})();
