
import React from 'react'
import Body from './Body/Body'
import SideMenu from './Sidemenu/SideMenu'

const Container = () => {
  return (
    <div className='flex m-auto h-[86vh] items-center justify-center  my-1 rounded-xl overflow-hidden '>
        <SideMenu/>
        <Body/>
    </div>
  )
}

export default Container
