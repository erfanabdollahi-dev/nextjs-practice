'use server'

import axios from "axios"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export type SignInRes = {
    "token": string,
    "token_type": string,
    "expires_at": string
}

export const signinAction = async (formData: FormData) => {
    const phone = formData.get('phone') as string
    const password = formData.get('password') as string
    const remember = parseInt(formData.get('remember') as string) || 0
    console.log("signinAction  called")
    console.log("Payload →", { phone, password, remember })

    const res = await axios.post("https://ecomadminapi.azhadev.ir/api/auth/login", { phone, password, remember })
    if(res.status === 200){
        const token = res.data.token
        ;(await cookies()).set("loginToken" , token)

        redirect('/profile')
    }
    else{
        return res.data
    }

}