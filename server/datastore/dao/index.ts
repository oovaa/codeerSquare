import type { CommentDao } from "./commentDao";
import type { LikeDao } from "./likeDao";
import { InMemoryDataStore } from "../memorydb";
import type { PostDao } from "./postDao";
import type { userDao } from "./userDao";

export interface DataStore extends userDao, PostDao, LikeDao, CommentDao {
}

export const db = new InMemoryDataStore();
