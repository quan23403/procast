import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { getRules } from '~/utils/rules'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useMutation } from '@tanstack/react-query'
import { resgisterAccount } from '~/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntity } from '~/utils/utils'
import { ResponseApi } from '~/types/utils.type'
import { useContext } from 'react'
import { AppConxtext } from '~/contexts/app.context'
import Button from '~/components/Button'
interface FormData {
  email: string
  username: string
  dateOfBirth: string
  password: string
  confirm_password: string
}
export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppConxtext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    getValues,
    control,
    setError,
    formState: { errors }
  } = useForm<FormData>()
  const rules = getRules(getValues)

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => resgisterAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError?.email) {
            setError('email', {
              message: formError.email,
              type: 'server'
            })
          }
        }
      }
    })
  })
  return (
    <div>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-slate-900'>
        <a href='#' className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
          <img className='w-8 h-8 mr-2' src='https://cdn-icons-png.flaticon.com/128/1290/1290874.png' alt='logo' />
          Fake Tiw
        </a>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md  l:p-0 dark:bg-gray-800 dark:border-gray-700 '>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8 space-x-8 flex flex-col'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center'>
              Register
            </h1>
            <form className='space-y-4 md:space-y-6 ' onSubmit={onSubmit} noValidate>
              <div>
                {/* <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Your email & password
                </label> */}
                <input
                  type='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='youremail@gmail.com'
                  {...register('email', rules.email)}
                />
                <div className='mt-0 text-red-600 text-xs p-0'>{errors.email?.message}</div>
              </div>
              <div>
                {/* <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Password
                </label> */}
                <input
                  type='text'
                  id='username'
                  placeholder='username'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  {...register('username', rules.username)}
                  required
                />
                <div className='mt-0 text-red-600 text-xs p-0'>{errors.username?.message}</div>
              </div>

              <Controller
                name='dateOfBirth'
                control={control}
                defaultValue=''
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    selected={value ? new Date(value) : null}
                    onChange={(date: Date | null) => onChange(date?.toISOString().split('T')[0] ?? '')}
                    dateFormat='dd/MM/yyyy'
                    name='datepicker'
                    placeholderText='Date of birth'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg w-80  focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required
                  />
                )}
              />
              <div>
                {/* <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Password
                </label> */}
                <input
                  type='password'
                  id='password'
                  placeholder='Your password'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  autoComplete='on'
                  {...register('password', rules.password)}
                  required
                />
                <div className='mt-0 text-red-600 text-xs p-0'>{errors.password?.message}</div>
              </div>
              <div>
                <input
                  type='password'
                  id='confirm_password'
                  placeholder='Confirm your password'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
                  {...register('confirm_password', { ...rules.confirm_password })}
                  autoComplete='on'
                  required
                />
                <div className='mt-0 text-red-600 text-xs p-0'>{errors.confirm_password?.message}</div>
              </div>
              {/* <div className='flex items-center justify-between'>
                <div className='flex items-start'>
                  <div className='flex items-center h-5'>
                    <input
                      id='remember'
                      aria-describedby='remember'
                      type='checkbox'
                      className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      required
                    />
                  </div>
                  <div className='ml-3 text-sm'>
                    <label htmlFor='remember' className='text-gray-500 dark:text-gray-300'>
                      Remember me
                    </label>
                  </div>
                </div>
                <a href='#' className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>
                  Forgot password?
                </a>
                </div>     */}
              <Button
                type='submit'
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center '
                isLoading={registerAccountMutation.isLoading}
                disabled={registerAccountMutation.isLoading}
              >
                Sign up
              </Button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400 '>
                Already have an account ? {'    '}
                <Link className='font-medium text-primary-600 hover:underline dark:text-primary-500' to='/login'>
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
