import type { CommentDao } from './dao/commentDao'
import type { LikeDao } from './dao/likeDao'
import { InMemoryDataStore } from './memorydb'
import type { PostDao } from './dao/postDao'
import type { userDao } from './dao/userDao'
import { SqliteDataStore } from './sql'

export interface DataStore extends userDao, PostDao, LikeDao, CommentDao {}

export let db: DataStore

export async function initdb() {
  // db = new InMemoryDataStore();
  db = await new SqliteDataStore().openDB()
}
