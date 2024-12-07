import type { User } from '../../../shared'

export interface userDao {
  createUser(user: User): Promise<void>
  getUserByEmail(email: string): Promise<User | undefined>
  getUserByUsername(username: string): Promise<User | undefined>
  getUserById(id: string): Promise<User | undefined>
  
}
