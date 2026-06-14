'use client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'



const AuthProvider = ({children} : {children : React.ReactNode}) => {
    console.log(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
    
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
        {children}
    </GoogleOAuthProvider>
  )
}

export default AuthProvider