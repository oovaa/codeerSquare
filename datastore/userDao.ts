import type { User } from "../types";

export interface userDao {
    createUser(user: User): void;
    getUserByEmail(email: string): User | undefined
    getUserByUsername(username: string): User | undefined
} 