import type { RequestHandler } from "express"
import { db } from "../datastore"
import type { Post } from "../types"
import { randomUUID } from "crypto"


export type Expresshandler<req, res> = RequestHandler<
    string,
    Partial<res>,
    Partial<req>,
    any
>


export const listPostsHandler: Expresshandler<{}, {}> = (req, res) => {
    res.send({ posts: db.listPost() })
}

type createPostRequest = Pick<Post, 'title' | 'url' | 'userID'>

interface createPostResponse {

}
export const createPostHAndler: Expresshandler<createPostRequest, createPostResponse> = (req, res) => {
    if (!req.body.title || !req.body.userID || !req.body.url)
        return res.sendStatus(400)

    const post: Post = {
        id: randomUUID(),
        postedAt: Date.now(),
        title: req.body.title,
        url: req.body.url,
        userID: req.body.userID
    }

    db.createPost(post)
    res.sendStatus(201)
}