import type { Post, User } from './types'

// post api
export type createPostRequest = Pick<Post, 'title' | 'url' | 'userId'>

export interface createPostResponse {}

export interface ListPostRequest {}
export interface ListPostResponse {
  posts: Post[]
}

export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post
}

// user apis
export type SignupRequest = Pick<User, 'firstName' | 'lastName' | 'email' | 'username' | 'password'>
export interface SiginupResponse {
  jwt: string
}

export interface SigninRequest {
  login: string // uname, email,
  password: string
}
export type SigninResponse = {
  user: Pick<User, 'firstName' | 'lastName' | 'email' | 'username' | 'id'>
  jwt: string
}

export type GetUserRequest = Pick<User, 'email' | 'username'>
export interface GetUserResponse {
  user: User
}

// comment apis

// like apis
