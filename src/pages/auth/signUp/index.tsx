import { Button, TextField } from '@mui/material'
import { FormEvent, memo } from 'react'
import { useChange } from '../../../hooks/useChange'
import { ErrorType, User } from '../../../types'
import { useLoginMutation } from '../../../redux/api/user.api'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../redux/features/users.slice'
import toast from 'react-hot-toast'

const initialState: User = {
  email: "",
  password: ""
}

const SignUp = () => {
  const { formData, setFormData, handleChange } = useChange<User>(initialState)
  const [loginUser, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const { token } = await loginUser(formData).unwrap()
      if (token) {
        dispatch(setToken(token))
        navigate("/dashboard")
      }
    } catch (error) {
      const err = error as ErrorType;
      if (err.status === 404 || err.status === 400) {
        toast.error(err.data?.message || "User not found!");
      } else {
        toast.error("Something went wrong");
      }
    }
    setFormData(initialState)
  }

  return (
    <div className='w-[400px] h-[400px] max-[430px]:w-full'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' action="">
        <TextField name='email' onChange={handleChange} value={formData.email} label="Email" />
        <TextField name='password' onChange={handleChange} value={formData.password} label="Password" />
        <Button type='submit' loading={isLoading} variant='contained' color='primary' size='large'>Sign Up</Button>
        <span>If you don't have an account: <Link className='text-[#7985f7]' to='/signIn'>Sign In</Link></span>
      </form>
    </div>
  )
}

export default memo(SignUp)