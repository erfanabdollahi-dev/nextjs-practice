'use client'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import React from 'react'

const AuthButton = () => {
    const successLogin = (credentialResponse: CredentialResponse) => {
        const userInfo = jwtDecode(credentialResponse.credential as string)
        console.log(credentialResponse);
        console.log(userInfo);
    }

    const catchLogin = () => {
        console.log('Login Failed');
    }


    return (

        <GoogleLogin
            onSuccess={successLogin}
            onError={catchLogin}
        />
    )
}

export default AuthButton