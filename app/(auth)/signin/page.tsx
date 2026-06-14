
'use client'
import { signinAction } from '@/actions/auth/authAction'
import AuthButton from '@/componets/AuthButton'
import React, { useState, useTransition } from 'react'
import { CgSpinner } from 'react-icons/cg'


const Login = () => {

    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError(null)
        const formData = new FormData(e.currentTarget)
        console.log(formData, e.currentTarget);

    

        startTransition(async () => {
            try {
                const res = await signinAction(formData)
                if(res.message){
                    setError(res.message)
                }
                else if(res.phone){
                    setError(res.phone[0])
                }
                else if(res.password){
                    setError(res.password[0])
                }

                

            }
            catch (err) {
                setError(err instanceof Error ? err.message : "Something went wrong");
            }
        })

    }

    return (
        <div className='grid grid-cols-[1fr_1fr] grid-rows-1 w-full h-screen'>
            <div className="leftimage-con h-full overflow-hidden items-center flex justify-center p-4 rounded-2xl ">
                <img src="/login.jpg" className='object-contain object-cover object-top h-full rounded-2xl' alt="" />
            </div>
            <div className="right flex flex-col items-center justify-center gap-12">
                <div className="head flex flex-col gap-5  items-center justify-center">
                    <h1 className='font-bold text-5xl  not-rtl:'>Welcome Back</h1>
                    <p className='text-neutral-500 text-lg '>Enter your phone and password to access your account</p>
                </div>
                <form className='flex flex-col lg:w-3/6 gap-3' onSubmit={handleSubmit}>


                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className='font-semibold'>Phone</label>
                        <input type="text" name='phone' className='px-2 font-semibold w-full h-10 outline-none bg-gray-200 rounded-md' />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className='font-semibold'>Password</label>
                        <input type="text" name='password' className='px-2 font-semibold w-full h-10 outline-none bg-gray-200 rounded-md' />
                    </div>
                    <div className="options flex justify-between items-center w-full">
                        <div className="flex gap-2"> <label htmlFor="remember">Remember Me</label><input id='remember' name='remember' value={1} type="checkbox" /></div>
                        <p>Forgot Password?</p>
                    </div>
                    <div className="buttons mt-5 flex flex-col gap-2 justify-center items-center">
                        <button type='submit' disabled={isPending} className='bg-rose-600 duration-200 hover:bg-rose-700 cursor-pointer text-white w-full rounded-md py-3 flex items-center justify-center font-bold h-[48px]'>{isPending ? <CgSpinner className='animate-spin' size={20} /> : "Sign In"}</button>
                        <AuthButton />
                    </div>

                </form>
              <div className="error-con h-4">
                  {error && <p>{error}</p>}
              </div>
            </div>
        </div>
    )
}

export default Login