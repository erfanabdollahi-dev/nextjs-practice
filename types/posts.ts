export type Comment = {
    id: number
    postId: number
    author: string
    avatar: string
    body: string
    createdAt: string
}

export type Post = {
    id: number
    imageUrl: string
    title: string
    author: string
    avatar: string
    description: string
    tags: string[]
    likes: number
    createdAt: string
}