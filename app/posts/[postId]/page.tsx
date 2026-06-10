import BackBtn from '@/componets/ui/postdetail/BackBtn'
import PostImage from '@/componets/ui/postdetail/PostImage'
import { Post, Comment } from '@/types'
import React from 'react'
import { IoArrowRedoOutline, IoChatbubbleOutline, IoHeartOutline } from 'react-icons/io5'

export const generateStaticParams = async () => {
  const posts = await fetch('http://localhost:4000/posts').then(res => res.json())
  return posts.map((post: Post) => ({ postId: post.id }))
}

const getPost = async (postId: string): Promise<Post> => {
  const res = await fetch(`http://localhost:4000/posts/${postId}`)
  return res.json()
}

const getPostComments = async (postId: string): Promise<Comment[]> => {
  const res = await fetch(`http://localhost:4000/comments?postId=${postId}`)
  return res.json()
}

const PostDetail = async ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = await params
  const post = await getPost(postId)
  const comments = await getPostComments(postId)

  return (
    <div className="flex lg:flex-row flex-col lg:h-screen w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white relative">
      <BackBtn />

      {/* Left — image */}
      <div className=" lg:flex lg:w-1/2 bg-neutral-100 items-center justify-center overflow-hidden rounded-l-2xl">
        <PostImage src={post.imageUrl} alt={post.title} />
      </div>

      {/* Right — info + comments */}
      <div className="flex flex-col w-full lg:w-1/2 h-full overflow-hidden">

        {/* Action bar */}
        <div className="flex items-center gap-4 px-5 pt-5 pb-3 border-b border-neutral-100">
          <button className="flex items-center gap-1.5 text-neutral-600 hover:text-red-500 transition-colors">
            <IoHeartOutline size={24} />
            <span className="text-sm font-semibold">{post.likes}</span>
          </button>
          <button className="text-neutral-600 hover:text-neutral-900 transition-colors">
            <IoChatbubbleOutline size={23} />
          </button>
          <button className="ml-auto text-neutral-600 hover:text-neutral-900 transition-colors">
            <IoArrowRedoOutline size={23} />
          </button>
        </div>

        {/* Author + title + description — fixed, not scrollable */}
        <div className="px-5 pt-4 pb-4 border-b border-neutral-100 shrink-0">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm shrink-0">
              {post.avatar}
            </div>
            <p className="font-semibold text-sm text-neutral-800">{post.author}</p>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-1">{post.title}</h1>
          <p className="text-sm text-neutral-500 leading-relaxed">{post.description}</p>
        </div>

        {/* Scrollable comments */}
        <div className="lg:flex-1 min-h-20 overflow-y-auto px-5 py-3 space-y-4">
          {comments.map(comment => (
            <div key={comment.id} className="flex gap-2.5">
              <div className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center font-semibold text-xs shrink-0">
                {comment.author?.[0] ?? '?'}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-neutral-700">{comment.author ?? 'User'}</span>
                <p className="text-sm text-neutral-600 leading-snug">{comment.body}</p>
              </div>
            </div>
          ))}
    
        </div>

        {/* Pinned comment input */}
        <div className="px-5 py-3 border-t border-neutral-100 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-neutral-200 shrink-0" />
            <div className="flex-1 flex items-center bg-neutral-100 rounded-full px-4 py-2 gap-2">
              <input
                type="text"
                placeholder="Add a comment…"
                className="flex-1 bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 outline-none"
              />
              <button className="text-xs font-semibold text-rose-500 hover:text-rose-600 transition-colors shrink-0">
                Post
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PostDetail