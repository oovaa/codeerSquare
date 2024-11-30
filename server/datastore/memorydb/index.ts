import type { Comment, Like, Post, User } from "../../types";
import type { DataStore } from "../index";

export class InMemoryDataStore implements DataStore {
    private users: User[] = [];
    private posts: Post[] = [];
    private comments: Comment[] = [];
    private likes: Like[] = [];

    createUser(user: User): Promise<void> {
        this.users.push(user);
        return Promise.resolve();
    }
    getUserByEmail(email: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find((u) => u.email == email));
    }
    getUserByUsername(username: string): Promise<User | undefined> {
        return Promise.resolve(this.users.find((u) => u.username == username));
    }
    listPost(): Promise<Post[]> {
        return Promise.resolve(this.posts);
    }
    createPost(post: Post): Promise<void> {
        this.posts.push(post);
        return Promise.resolve();
    }
    getPost(id: string): Promise<Post | undefined> {
        return Promise.resolve(this.posts.find((p) => p.id == id));
    }
    deletePost(id: string): Promise<void> {
        const idx = this.posts.findIndex((p) => p.id == id);
        if (idx == -1) {
            return Promise.resolve();
        }

        this.posts.splice(idx, 1);
        return Promise.resolve();
    }
    createLike(like: Like): Promise<void> {
        this.likes.push(like);
        return Promise.resolve();
    }
    createComment(comment: Comment): Promise<void> {
        this.comments.push(comment);
        return Promise.resolve();
    }
    listComments(postId: string): Promise<Comment[]> {
        return Promise.resolve(
            this.comments.filter((comment) => comment.postId === postId),
        );
    }
    deleteComment(id: string): Promise<void> {
        const idx = this.comments.findIndex((p) => p.id == id);
        if (idx == -1) {
            return Promise.resolve();
        }

        this.comments.splice(idx, 1);
        return Promise.resolve();
    }
}
