import { memo } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import SignIn from './signIn'
import SignUp from './signUp'

const Auth = () => {
    const { authType } = useParams()

    return (
        <div className='flex flex-col w-full items-center justify-center h-screen'>
            <div className='flex items-center  gap-4 text-center mb-9'>
                <NavLink className=' w-[100px] link' to={'/signIn'}>Sign In</NavLink>
                <NavLink className=' w-[100px] link' to={'/signUp'}>Sign Up</NavLink>
            </div>
            {
                authType === 'signIn' ? <SignIn/> : <SignUp/>
            }
        </div>
    )
}

export default memo(Auth)
