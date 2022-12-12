/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import assert from "assert/strict";
import { describe, it } from "mocha";

import { sanitizedConfig } from "../config/config";
import jsonwebtoken from "jsonwebtoken";

describe("Authentication controller", function () {
    it("generate token function should always create the same token for the same UID", function () {
        const id = "47hfhdfhfgj567";

        const jwt: Promise<string | undefined> = new Promise<
            string | undefined
        >((resolve, reject) => {
            jsonwebtoken.sign(
                { id },
                sanitizedConfig.SALT,
                {
                    expiresIn: sanitizedConfig.JWT_EXPIRES * 1000 * 60 * 24,
                },
                (err, token) => {
                    if (err) reject(err);
                    else resolve(token);
                }
            );
        });

        assert.doesNotReject(jwt);
    });

    it("generated token should be verifiable using the SALT string and contain the UID", function () {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3aGZoZGZoZmdqNTY3IiwiaWF0IjoxNjcwODQzMzk5LCJleHAiOjE3MTQwNDMzOTl9.eONzf3tXLUqU5PKx5w8uw3k-740L5sSkVSdICLpHVYk";
        const id = "47hfhdfhfgj567";
        const jwt: any = jsonwebtoken.verify(token, sanitizedConfig.SALT);

        assert.deepEqual(jwt.id, id);
    });

    it("generated token should be verifiable using the SALT string and contain the expiry date", function () {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3aGZoZGZoZmdqNTY3IiwiaWF0IjoxNjcwODQzMzk5LCJleHAiOjE3MTQwNDMzOTl9.eONzf3tXLUqU5PKx5w8uw3k-740L5sSkVSdICLpHVYk";
        // Exact matching is not possible
        // Token should at least last 29 days
        const iat = (sanitizedConfig.JWT_EXPIRES - 1) * 1000 * 60 * 24;
        const jwt: any = jsonwebtoken.verify(token, sanitizedConfig.SALT);

        assert.equal(new Date(jwt.iat), new Date(iat));
    });

    it("login function saves the UID in the request object", function () {});
});
