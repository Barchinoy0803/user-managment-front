import { memo } from 'react'
import { useParams } from 'react-router-dom'
import SignIn from './signIn'
import SignUp from './signUp'
import { Typography } from '@mui/material'

const Auth = () => {
    const { authType } = useParams()

    return (
        <div className='flex flex-col w-full items-center justify-center h-screen'>
            <div className='flex w-full'>
                <div className='w-1/2 flex flex-col justify-center max-[430px]:items-stretch p-2.5 items-center max-[860px]:w-full'>
                <div>
                    <div className='gap-4 tetx-left mb-5'>
                        <Typography variant='h5'>{authType === "signIn" ? "Register" : "Login"}</Typography>
                    </div>
                    {
                        authType === 'signIn' ? <SignIn /> : <SignUp />
                    }
                </div>
                </div>
               <div className="w-1/2 h-screen bg-gradient-to-br from-[#7985f7] via-[#576FC7] to-[#9153ED] max-[860px]:hidden"></div>
            </div>
        </div>
    )
}

export default memo(Auth)
