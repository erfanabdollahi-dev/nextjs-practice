import React, { useRef } from 'react'



const AddPostInput = ({ label, placeholder,name, imagePreview }: { label: string, placeholder: string,name:string, imagePreview: string | null }) => {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <div onClick={()=>inputRef?.current?.focus()} className={`input-con  flex flex-col w-full font-semibold p-4 gap-2 bg-stone-200 rounded-2xl   focus-within:border-blue-600 ${imagePreview ? "border-stone-400 bg-white " : "border-stone-200 "} border-2 focus-within:border-2   `}>
            <label htmlFor={name} className='text-sm '>{label}</label>
            <input ref={inputRef} disabled={imagePreview ? false : true} placeholder={placeholder} type="text" name={name} className='outline-none  text-black border-0' />
        </div>
    )
}

export default AddPostInput