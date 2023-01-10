/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as assert from "assert/strict";
import { describe, it } from "mocha";

import { User } from "../model/user/User";

describe("Database seeders", function () {
    it("test if manually added admins are successfully created in the db", async function () {
        const user = await User.create({
            email: "admin@test.com",
            password: "123",
            passwordConfirm: "123",
            role: "admin",
        });

        assert.deepEqual(user, "");
    });
});
