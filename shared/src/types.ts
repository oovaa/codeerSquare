import type { RequestHandler } from 'express'

export interface User {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
}
export interface Post {
  id: string
  title: string
  url: string
  userId: string
  postedAt: number
}
export interface Like {
  userId: string
  postId: string
}

export interface Comment {
  id: string
  userId: string
  postId: string
  comment: string
  postedAt: number
}
export type Expresshandler<req, res> = RequestHandler<string, Partial<withError<res>>, Partial<req>, any>

export interface Jwtobject {
  userId: string
}

type withError<T> = T & { error: string }
