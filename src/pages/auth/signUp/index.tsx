import { Button, TextField } from '@mui/material'
import { FormEvent, memo } from 'react'
import { useChange } from '../../../hooks/useChange'
import { User } from '../../../types'
import { useLoginMutation } from '../../../redux/api/user.api'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken } from '../../../redux/features/users.slice'

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

    const { data } = await loginUser(formData)
    if (data?.token) {
      dispatch(setToken(data.token))
      navigate("/dashboard")
    }

    setFormData(initialState)
  }

  return (
    <div className='w-[400px] h-[400px]'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' action="">
        <TextField name='email' onChange={handleChange} value={formData.email} label="Email" />
        <TextField name='password' onChange={handleChange} value={formData.password} label="Password" />
        <Button type='submit' disabled={isLoading} variant='contained' color='primary' size='large'>Submit</Button>
      </form>
    </div>
  )
}

export default memo(SignUp)