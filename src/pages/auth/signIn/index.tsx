import { Button, TextField } from '@mui/material'
import { FormEvent, memo } from 'react'
import { useChange } from '../../../hooks/useChange'
import { ErrorType, User } from '../../../types'
import { useRegisterMutation } from '../../../redux/api/user.api'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const initialState: User = {
  name: "",
  email: "",
  password: ""
}


const SignIn = () => {
  const { formData, setFormData, handleChange } = useChange<User>(initialState)
  const [registerUser, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const { id } = await registerUser(formData).unwrap()

      if (id) {
        navigate("/signUp")
      }
    } catch (error) {
      const err = error as ErrorType
      if(err.status === 409){
        toast.error(err.data.message)
      }
    }
    setFormData(initialState)
  }
  
  return (
    <div className='w-[400px] h-[400px] max-[430px]:w-full'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' action="">
        <TextField onChange={handleChange} value={formData.name} name='name' label="Name" />
        <TextField onChange={handleChange} value={formData.email} name='email' label="Email" />
        <TextField onChange={handleChange} value={formData.password} name='password' label="Password" />
        <Button type='submit' loading={isLoading} variant='contained' color='primary' size='large'>Sign In</Button>
        <span>Do you have an account? <Link className='text-[#7985f7]' to='/signUp'>Sign Up</Link></span>
      </form>
    </div>
  )
}

export default memo(SignIn)