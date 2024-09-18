import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ResumeCardItem({resume}) {
  return (
    <Link to={'/dashboard/resume/' + resume.documentId+'/edit'}>
      <div className='p-14 bg-gradient-to-b from-pink-100 via bg-purple-200 to to-blue-200 
      flex items-center justify-center
      h-[280px] border border-primary rounded-lg
      hover:scale-105 transition-all hover:shadow-md shadow-primary'  
      style={{
        borderColor:resume?.themeColor
      }}
      > 
      

        <Notebook/>
        <div className='flex 
        items-center justify-center h-[180px] '>
                {/* <Notebook/> */}
                <img src="/public/cv.png" width={80} height={80} />
              </div>
      </div>
      
      <h2 className='text-center my-1 hover:scale-105 ' >{resume.title} </h2>
    </Link>
  )
}

export default ResumeCardItem
