'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface NavLinkProps {
    href: string
    activeIcon: ReactNode
    inactiveIcon: ReactNode
    className?: string
}

const NavLink = ({ href, activeIcon, inactiveIcon, className = '' }: NavLinkProps) => {
    const pathname = usePathname()
    const isActive = pathname === href
    
    return (
        <Link 
            className={`p-3 flex items-center justify-center hover:bg-gray-100 rounded-2xl ${className}`}
            href={href}
        >
            {isActive ? activeIcon : inactiveIcon}
        </Link>
    )
}

export default NavLink