import React from 'react'
import Navbar from '../Layout/Navbar'
import Sidebar from './SideBar'
import KitchenTeamPage from './MainLayout'
import SinglePost from './SinglePostTitle'
import Footer from '../Layout/Fotter'

function SinglePostLayout() {
  return (
    <div className='overflow-hidden'>
       <Navbar />
       <SinglePost />
       <div className='flex'>
        <KitchenTeamPage />


       <Sidebar />
       </div>
       <Footer />
      
    </div>
  )
}

export default SinglePostLayout
