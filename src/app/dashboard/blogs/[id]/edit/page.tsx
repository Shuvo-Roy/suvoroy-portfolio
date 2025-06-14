import EditBlogPage from '@/components/dashboard-components/blog/edit-blog'
import { prisma } from '@/lib/prisma'
import React from 'react'

type EditBlogParams={
  params:Promise<{id:string}>
}

const page : React.FC<EditBlogParams>= async ({params}) => {

  const id = (await params).id;

  const blog = await prisma.blog.findUnique({
    where:{id}
  })

  if(!blog) return <h1> Blog not found for this id</h1>

  return (
    <div>
      <EditBlogPage blog={blog}/>
    </div>
  )
}

export default page