import { Post } from '@/types'
import Link from 'next/link'
import React from 'react'




const getPosts = async (): Promise<Post[]> => {
    const res = await fetch('http://localhost:4000/posts?_sort=-createdAt', {next : {
        revalidate : 10
    }})
    const posts = await res.json()
    return posts
}

const Posts = async () => {

    const posts = await getPosts()

    return (
        <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3">
            {posts.map((post) => (


                <Link href={`/posts/${post.id}`} key={post.id}>
                    <div
                        key={post.id}
                        className="break-inside-avoid mb-3 rounded-2xl overflow-hidden bg-white
                       cursor-pointer group hover:shadow-lg transition-shadow duration-200"
                    >
                        {/* Image — NO fixed height. Width is 100%, height flows from the image itself */}
                        <div className="overflow-hidden">
                            <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                            // ↑ No h-* class here — this is the key to Pinterest-style variable heights
                            />
                        </div>

                        {/* Caption */}
                        <div className="p-3">
                            <p className="text-sm font-semibold text-gray-900 leading-snug mb-2">
                                {post.title}
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 text-xs
                                font-semibold flex items-center justify-center">
                                    {post.avatar}
                                </div>
                                <span className="text-xs text-gray-500">{post.author}</span>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default Posts