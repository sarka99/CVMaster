import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    <div className='flex justify-center my-10 items-center my-40'>
      <SignIn></SignIn>
    </div>
  )
}

export default SignInPage
