import React from 'react'
import BlogDashboard from '../../components/dashboard-components/blog-dashboard'
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'

const page = () => {
  
  return (
    <div>
      <BlogDashboard/>
    </div>
  )
}

export default page