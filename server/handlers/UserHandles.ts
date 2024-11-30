import { randomUUID } from "crypto";
import type {
    createUserRequest,
    createUserResponse,
    GetUserRequest,
    GetUserResponse,
} from "../api";
import { db } from "../datastore";
import type { Expresshandler, User } from "../types";

export const GetUserByUserNameHandler: Expresshandler<
    GetUserRequest,
    GetUserResponse
> =  async (req, res) => {
    const username = req.query.username;
    const user = await db.getUserByUsername(username);
    if (user) {
        res.status(200).send({ user });
    } else {
        res.sendStatus(404);
    }
};

export const GetUserByEmailHandler: Expresshandler<
    GetUserRequest,
    GetUserResponse
> = async (req, res, next) => {
    const email = req.query.email as string;
    const user = await db.getUserByEmail(email);
    if (user) {
        res.status(200).send({ user });
    } else {
        res.sendStatus(404);
    }
};

export const createUserHandler: Expresshandler<
    createUserRequest,
    createUserResponse
> = (req, res, next) => {
    if (
        !req.body.lastName || !req.body.firstName || !req.body.email ||
        !req.body.password || !req.body.username
    ) {
        return res.sendStatus(400);
    }

    const newUser: User = {
        id: randomUUID(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
    };

    db.createUser(newUser);
    res.sendStatus(201); // Send a response after creating the user
};
