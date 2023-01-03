/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import assert from "assert/strict";
import { describe, it } from "mocha";

import { sanitizedConfig } from "../config/config";
import * as jose from "jose";

let tokenStore: Promise<string>;

describe("Authentication controller", function () {
    it("generate token function should always create the same token for the same UID", function () {
        const id = "47hfhdfhfgj567";

        const generateToken = async (id: string) => {
            const alg = "HS256";
            const secret = new TextEncoder().encode(sanitizedConfig.SALT);

            const token = await new jose.SignJWT({ "urn:example:claim": true })
                .setProtectedHeader({ alg })
                .setIssuer("tlex")
                .setIssuedAt(Date.now())
                .setExpirationTime("2h")
                .setJti(id)
                .sign(secret);

            return token;
        };

        const token = generateToken(id);

        tokenStore = token;

        assert.doesNotReject(token);
    });

    it("generated token should be verifiable using the SALT string and contain the UID", async function () {
        const token = await tokenStore;
        const id = "47hfhdfhfgj567";
        const secret = new TextEncoder().encode(sanitizedConfig.SALT);

        const jwt = await jose.jwtVerify(token, secret);

        assert.deepEqual(jwt.payload.jti, id);
    });

    it("generated token should be verifiable using the SALT string and contain the expiry date", async function () {
        const token = await tokenStore;
        const secret = new TextEncoder().encode(sanitizedConfig.SALT);
        // Exact matching is not possible
        const iat = Date.now() + 1000 * 60 * 60 * 2; // add 2 hours

        const jwt = await jose.jwtVerify(token, secret);

        assert.equal(
            jwt.payload.iat !== undefined ? new Date(jwt.payload.iat) : 0,
            new Date(iat)
        );
    });
});
