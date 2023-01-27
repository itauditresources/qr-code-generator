/*
 * Use a database seeder to first manually add an administrator
 * for every single entity and at a later stage of the application
 * automatically insert the information via a B2B or B2C platform
 * A powershell script which get executed after the sales process
 * might do the job.
 */

import { User } from "../../model/user/User";
import { Logging } from "../../utils/Logging";

export const initializeSeeders = async () => {
    try {
        await User.create({
            email: "admin@test.com",
            password: "123",
            passwordConfirm: "123",
            role: "admin",
        });

        Logging.info("Added administrator", "MONGODB");
    } catch (err) {
        Logging.error(`Failed to add administrator: ${String(err)}`, "MONGODB");
    }
};
