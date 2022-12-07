/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createClient } from "redis";

import { redisConfig } from "../config/config";
import { Logging } from "../utils/Logging";

const redisClient = createClient(redisConfig);

// Immediately invoked function expression (IIFE)
void (async () => {
    await redisClient.connect();
})();

redisClient.on("connect", () => Logging.info("Database connected", "REDIS"));

redisClient.on("error", (err: any) => Logging.error(err, "REDIS"));

export default redisClient;
