
'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { IoMdArrowBack } from 'react-icons/io'

type Props = {}

const BackBtn = (props: Props) => {

    const router = useRouter()
    return (
        <div onClick={()=>(router.back())} className="back-btn absolute left-5 top-5 bg-white p-4 rounded-3xl hover:bg-white/90 duration-200 cursor-pointer">
            <IoMdArrowBack size={35} />

        </div>
    )
}

export default BackBtn