import type { Post } from "./types";

// post api
export type createPostRequest = Pick<Post, 'title' | 'url' | 'userID'>

export interface createPostResponse {

}

export interface ListPostRequest { }
export interface ListPostResponse {
    posts: Post[]
}

export interface GetPostRequest { }
export interface GetPostResponse {
    post: Post;
}


// comment apis

// like apis

// user apis