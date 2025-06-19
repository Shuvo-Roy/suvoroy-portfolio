'use client'
import { fadeInUp, scaleIn } from '@/utils/animation'
import { motion} from 'framer-motion'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <section className='py-28 container max-w-7xl mx-auto px-4'>
        <div className='max-w-3xl mx-auto text-center'>
            <motion.div {...scaleIn} transition={{delay:0.2}} initial='hidden' className='flex flex-col items-center mb-4'>
                <Image src='/myimage.jpg' alt='profile image' height={100} width={100} className='rounded-full mb-4 w-32 h-32 object-cover ring-2 ring-primary'/>
            </motion.div>
            <motion.h1
            {...fadeInUp}
            transition={{delay:0.3}}
             className='text-4xl md:text-6xl font-bold mb-6'>Hi, I'm <span className='text-green-600'>Suvo Roy</span></motion.h1>
            <motion.p {...fadeInUp}
            transition={{delay:0.5}} className='text-xl md:text-2xl text-gray-600 dark:text-gray-100'>Full Stack Developer | Software Developer | Web Designer</motion.p>
        </div>
    </section>
  )
}

export default Hero