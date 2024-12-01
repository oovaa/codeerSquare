import { randomUUID } from "crypto";
import type {
    SiginupResponse,
    SigninRequest,
    SigninResponse,
    SignupRequest,
} from "../api";
import { db } from "../datastore";
import type { Expresshandler, User } from "../types";

export const SignInUserHandler: Expresshandler<
    SigninRequest,
    SigninResponse
> = async (req, res, next) => {
    console.log("into SignInUserHandler");

    const { login, password } = req.body;

    if (!login || !password) {
        return res.sendStatus(400); // Bad Request
    }

    try {
        const existing = await db.getUserByEmail(login) ||
            await db.getUserByUsername(login);
        console.log("Existing user found:", existing);

        if (!existing || existing.password !== password) {
            console.log("Invalid credentials");
            return res.sendStatus(403); // Forbidden
        }

        // If the user exists and the password matches, proceed with the response
        res.status(200).send({
            email: existing.email,
            username: existing.username,
            id: existing.id,
            firstName: existing.firstName,
            lastName: existing.lastName,
        });
    } catch (error) {
        console.error("Error during sign-in:", error);
        next(error);
    }
};

export const SignUpUserHandler: Expresshandler<
    SignupRequest,
    SiginupResponse
> = async (req, res, next) => {
    if (
        !req.body.lastName || !req.body.firstName || !req.body.email ||
        !req.body.password || !req.body.username
    ) {
        return res.status(400).send("all feilds are required");
    }

    const existing = await db.getUserByEmail(req.body.email) ||
        await db.getUserByUsername(req.body.username);

    if (existing) {
        return res.status(403).send("user already exists");
    }

    const newUser: User = {
        id: randomUUID(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    };

    await db.createUser(newUser);
    res.sendStatus(201); // Send a response after creating the user
};
