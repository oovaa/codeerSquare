import { db } from '../datastore'
import type { Expresshandler, Post } from '../types'
import { randomUUID } from 'crypto'
import type { createPostRequest, createPostResponse, ListPostRequest, ListPostResponse } from '../api'

export const listPostsHandler: Expresshandler<ListPostRequest, ListPostResponse> = async (req, res) => {
  res.send({ posts: await db.listPost() })
}

export const createPostHAndler: Expresshandler<createPostRequest, createPostResponse> = async (req, res) => {
  // TODO: validate data
  if (!req.body.title || !req.body.url) {
    return res.sendStatus(400)
  }

  const post: Post = {
    id: randomUUID(),
    postedAt: Date.now(),
    title: req.body.title,
    url: req.body.url,
    userId: res.locals.userId 
  }

  try {
    await db.createPost(post)
    res.sendStatus(201)
  } catch (e) {
    console.error('Error creating post:', e)
    res.sendStatus(400)
  }
}
