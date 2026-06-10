import Link from 'next/link'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='h-20 flex px-5 lg:px-40  shadow-lg justify-between items-center '>
        <div className="left text-2xl font-bold ">
            Intrest
        </div>
        <div className="right flex gap-8 font-semibold text-lg">
            <Link href={'/posts'}>POSTS</Link>
            <Link href={'/users'}>USERS</Link>
            <Link href={'/fposts'}>FPOSTS</Link>
            <Link href={'/admin'}>ADMIN</Link>
        </div>
    </div>
  )
}

export default Navbar