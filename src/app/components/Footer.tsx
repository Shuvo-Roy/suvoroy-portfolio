import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className='bg-white dark:bg-dark border-t border-gray-200 dark:border-slate-800'>
        <div className='container max-w-7xl mx-auto px-4 py-8'>
            <div className='flex flex-col md:flex-row justify-between items-center'>
                <div>
                    <Link href="/" className='text-xl font-bold text-primary'>Suvo Roy</Link>
                    <p className='text-sm text-secondary mt-2'>{new Date().getFullYear()}All rights reserved.</p>
                </div>
                <div className='flex space-x-4'>
                    <Link href='/' className='text-2xl text-slate-600 hover:text-primary dark:text-gray-300 transition-duration-300'>
                    <FaGithub/>
                    </Link>
                    <Link href='/' className='text-2xl text-slate-600 hover:text-primary dark:text-gray-300 transition-duration-300'>
                    <FaFacebook/>
                    </Link>
                    <Link href='/' className='text-2xl text-slate-600 hover:text-primary dark:text-gray-300 transition-duration-300'>
                    <FaLinkedin/>
                    </Link>
                </div>
            </div>
        </div>
    </footer>
  )
}
