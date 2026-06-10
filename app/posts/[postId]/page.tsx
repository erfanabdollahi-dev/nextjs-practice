import PostImage from '@/componets/ui/postdetail/PostImage'
import { Post } from '@/types'
import React from 'react'
import { IoArrowRedoOutline, IoChatbubbleOutline, IoHeartOutline, IoHeartSharp } from 'react-icons/io5'
import { LuMessageCircle } from 'react-icons/lu'
import { PiShareFatBold } from 'react-icons/pi'

export const generateStaticParams = async()=>{
  const posts = await fetch('http://localhost:4000/posts').then(res=> res.json())

  return posts.map((post : Post)=>(
    {
      postId : post.id
    }
  ))
}

const getPost = async (postId: string): Promise<Post> => {

  const res = await fetch(`http://localhost:4000/posts/${postId}`)
  const post = await res.json()
  console.log(post);

  return post

}

const PostDetail = async ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = await params
  const post = await getPost(postId)
  return (
    <div className="h-full w-full  rounded-2xl border  border-neutral-300 flex overflow-hidden">
      <div className="image-con max-w-1/2 w-1/2 h-full hover:bg-gray-100 duration-200 rounded-none  flex items-center justify-center">
       <PostImage src={post.imageUrl} alt={post.title} />
      </div>
      <div className="info flex flex-col w-1/2 px-5  ">
        <div className="actions flex items-center py-5 gap-5">
          <div className="like flex gap-2 items-center"> <IoHeartOutline className='mt-1' size={30} /> <p className='font-bold text-lg'>234</p> </div>
          {/* <IoHeartSharp color='red' size={40} /> */}
          <IoChatbubbleOutline size={29} />

          <IoArrowRedoOutline size={30} />



        </div>
        <div className="user flex items-center gap-2">
          <div className="profile aspect-square w-8 text-lg rounded-full bg-rose-100 text-rose-600 items-center justify-center flex font-bold "> {post.avatar} </div>
          <p className='text-md font-semibold'>{post.author}</p>
        </div>
        <div className="title-desc flex flex-col gap-3 py-4  border-b w-full">
          <h1 className="text-3xl font-bold  ">{post.title}</h1>
          <p className='text-wrap'>{post.description}</p>
        </div>
      </div>

    </div>
  )
}

export default PostDetail