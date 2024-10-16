'use client'

import React, { Component } from 'react'
import UserSignupUI from '@/app/boundaries/SignupBoundary'

class SignUpPage extends Component {
  render() {
    const usersignupclass = new UserSignupUI()

    return (
      <div className="container mx-auto flex h-screen w-full items-center justify-center">
        {usersignupclass.displayCreateUserUI()}
      </div>
    )
  }
}

export default SignUpPage
