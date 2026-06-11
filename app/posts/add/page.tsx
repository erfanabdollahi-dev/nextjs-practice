'use client'
import AddPostInput from '@/componets/ui/post/AddPostInput';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useRef, useState, useTransition } from 'react'
import { createPost } from './actions';
type Props = {}
interface PostForm {
    title: string;
    author: string;
    avatar: string;
    description: string;
    tags: string;
}
const AddPost = (props: Props) => {
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | null>(null)
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {

        const file = fileInputRef.current?.files?.[0]
        if (!file) return;
        setImagePreview(URL.createObjectURL(file))
        console.log(URL.createObjectURL(file));


    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)

        const formData = new FormData(e.currentTarget)

        if (!formData.get('image') || !(formData.get('image') as File).name) {
            setError('please chose an image')
            return;
        }


        startTransition(async () => {
            try {
                await createPost(formData)
                router.push('/')
            }
            catch (err: unknown) {
                setError(err instanceof Error ? err.message : "Something went wrong");

            }
        })

    }



    return (
        <form onSubmit={handleSubmit} className='w-full h-full border border-neutral-400 rounded-2xl flex  '>
            <div className="left w-2/5 p-5 h-full overflow-hidden ">
                <div className="image-input-con w-full h-full ">
                    <div onClick={() => fileInputRef.current?.click()} className="overflow-hidden image flex w-full cursor-pointer h-full justify-center items-center bg-stone-200 rounded-2xl">
                        {imagePreview ? (
                            <div className="flex w-full h-full  flex-col items-center justify-center gap-3 py-14 text-gray-800">
                                <img src={imagePreview} alt='Preview' className='object-center object-cover rounded-2xl ' />
                            </div>
                        ) : (
                            <div className="flex  flex-col items-center gap-3 py-14 text-gray-800">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                                    <circle cx="9" cy="9" r="2" />
                                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                                </svg>
                                <span className="text-sm font-medium">Click to upload an image</span>
                                <span className="text-xs">PNG, JPG, WEBP</span>
                            </div>
                        )}
                        <input type="file" ref={fileInputRef} className='hidden' name="image"
                            accept="image/*" onChange={handleImageChange} />
                    </div>


                </div>

            </div>
            <div className="right w-3/5 p-5  flex h-full justify-between flex-col ">

                <div className="inputs gap-5 flex flex-col">
                    <AddPostInput imagePreview={imagePreview} placeholder='Tell everyone what your Pin is about' label='Title' name="title" />
                    <AddPostInput imagePreview={imagePreview} placeholder='Describe your Pin' label='Description' name="description" />
                    <AddPostInput imagePreview={imagePreview} placeholder='Enter your Tags comma seperate ,' label='Tags' name="tags" />
                    <AddPostInput imagePreview={imagePreview} placeholder='Who is writing this Pin' label='Author' name="author" />
                    {error && (
                        <span className='text-rose-600 text-sm'>{error}</span>
                    )}
                </div>
                <div className="flex gap-3 pt-2 align-bottom">
                    <button type="button" onClick={() => router.back()}
                        className="flex-1 py-5 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                        Cancel
                    </button>
                    <button type="submit" disabled={isPending}
                        className="flex-1 py-5 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed">
                        {isPending ? "Publishing…" : "Publish"}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default AddPost