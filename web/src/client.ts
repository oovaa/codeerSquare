import type { ListPostRequest, ListPostResponse } from "../../shared"

export const HOST  = process.env.NODE_ENV === 'dev'? 'http://localhost:3000' : 'https://codersquare-kqqg.onrender.com'

export const listPosts = async (req: ListPostRequest): Promise<ListPostResponse>  =>{
    const response =await fetch(`${HOST}/api/v1/posts`)
    if (!response.ok) {
        const {error} =await response.json()
        throw error
    }
    return response.json()
}