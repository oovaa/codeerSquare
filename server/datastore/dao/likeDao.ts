import type { Like } from '../../../shared'

export interface LikeDao {
  createLike(like: Like): Promise<void>
}
