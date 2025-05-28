import { Button, Typography } from '@mui/material'
import { memo } from 'react'
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem("token")
        navigate("/signUp")
    }
    return (
        <div className=' bg-gray-100'>
            <div className='container mx-auto flex items-center justify-between py-5'>
                <Typography variant='h6' className='text-[#1976d2]'>User Managment</Typography>
                <Button variant='contained' onClick={handleLogOut} startIcon={<IoIosLogOut />}>Log out</Button>
            </div>
        </div>
    )
}

export default memo(Navbar)