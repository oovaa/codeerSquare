import type { User } from "../types";

export interface userDao {
    createUser(user: User): void;
    getUserbyEmail(email: string): User | undefined
    getUserbyusername(username: string): User | undefined
}