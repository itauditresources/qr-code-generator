/*
 * Use a database seeder to first manually add an administrator
 * for every single entity and at a later stage of the application
 * automatically insert the information via a B2B platform
 */

import { User } from "../../model/user/User";

void (async () => {
    await User.create({
        email: "admin@test.com",
        password: "123",
        passwordConfirm: "123",
        role: "admin",
    });
})();
