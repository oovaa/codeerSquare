import type { Comment } from '../../../shared'

export interface CommentDao {
  createComment(comment: Comment): Promise<void>
  listComments(postId: string): Promise<Comment[]>
  deleteComment(id: string): Promise<void>
}
