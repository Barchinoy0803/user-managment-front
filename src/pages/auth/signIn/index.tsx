import { Button, TextField } from '@mui/material'
import { FormEvent, memo } from 'react'
import { useChange } from '../../../hooks/useChange'
import { User } from '../../../types'
import { useRegisterMutation } from '../../../redux/api/user.api'
import { useNavigate } from 'react-router-dom'

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

    const {data} = await registerUser(formData)

    if(data?.id){
      navigate("/signUp")
    }
    setFormData(initialState)
  }

  return (
    <div className='w-[400px] h-[400px]'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' action="">
        <TextField onChange={handleChange} value={formData.name} name='name' label="Name" />
        <TextField onChange={handleChange} value={formData.email} name='email' label="Email" />
        <TextField onChange={handleChange} value={formData.password} name='password' label="Password" />
        <Button type='submit' disabled={isLoading} variant='contained' color='primary' size='large'>Submit</Button>
      </form>
    </div>
  )
}

export default memo(SignIn)