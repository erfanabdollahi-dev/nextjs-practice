import Link from 'next/link'
import React from 'react'
import { CgAddR } from 'react-icons/cg'
import { FaPinterest } from 'react-icons/fa'
import { RiAddBoxFill, RiAddBoxLine } from 'react-icons/ri'
import NavLink from './NavLink'
import { GoHome, GoHomeFill } from 'react-icons/go'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='h-screen w-22  flex flex-col px-5 gap-5  shadow-lg py-5 items-center fixed top-0'>
      <div className="left text-2xl font-bold p-3 hover:bg-gray-100 rounded-2xl ">
        <FaPinterest size={30} color='red' />

      </div>
      <div className="right flex flex-col gap-5 font-semibold text-lg">
        <NavLink
          href="/posts"
          activeIcon={<GoHomeFill size={30} />}
          inactiveIcon={<GoHome size={30} />}
        />
        <NavLink
          href="/posts/add"
          activeIcon={<RiAddBoxFill size={30} />}
          inactiveIcon={<RiAddBoxLine size={30} />}
        />

      </div>
    </div>
  )
}

export default Navbar