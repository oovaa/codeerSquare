export interface User {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string

}
export interface Post {
    id: string,
    title: string,
    url: string,
    userID: string,
    postedAt: number
}
export interface Like {
    userId: string,
    postId: string,
}

export interface Comment {
    id: string
    userId: string,
    postId: string,
    comment: string,
    postedAt: number,
}