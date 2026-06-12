import React from 'react'

type Props = {}

const Login = (props: Props) => {
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
                <form className='flex flex-col lg:w-3/6 gap-3'>


                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className='font-semibold'>Phone</label>
                        <input type="text" className='px-2 font-semibold w-full h-10 outline-none bg-gray-200 rounded-md' />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className='font-semibold'>Password</label>
                        <input type="text" className='px-2 font-semibold w-full h-10 outline-none bg-gray-200 rounded-md' />
                    </div>
                    <div className="options flex justify-between items-center w-full">
                        <div className="flex gap-2"> <label htmlFor="remember">Remember Me</label><input id='remember' type="checkbox" /></div>
                        <p>Forgot Password?</p>
                    </div>
                    <div className="buttons mt-5">
                        <button type='submit' className='bg-rose-600 duration-200 hover:bg-rose-700 cursor-pointer text-white w-full rounded-md py-3 font-bold'>Sign In</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login