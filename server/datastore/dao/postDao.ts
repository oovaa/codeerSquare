import type { Post } from "../../types";

export interface PostDao {
    listPost(): Promise<Post[]>;
    createPost(post: Post): Promise<void>;
    getPost(id: string): Promise<Post | undefined>;
    deletePost(id: string): Promise<void>;
}
