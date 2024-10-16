'use client'

import React, { Component } from 'react'
import UserLoginUI from '@/app/boundaries/LoginBoundary'

class LoginPage extends Component {
  render() {
    const userLoginClass = new UserLoginUI()

    return (
      <div className="container mx-auto flex h-screen w-full items-center justify-center">
        {userLoginClass.displayLoginUI()}
      </div>
    )
  }
}

export default LoginPage
