import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { validateEmailCode } from '~/apis/auth.api'
import Button from '~/components/Button'
import path from '~/constants/path'
import { getRules } from '~/utils/rules'
interface FormData {
  email: string
  digitCode: string
}
interface submitDataType {
  email: string
  digitCode: number
}
export default function ValidateCode() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>()
  const rules = getRules(getValues)
  const navigate = useNavigate()
  const validateCodeMutation = useMutation({
    mutationFn: (body: submitDataType) => validateEmailCode(body)
  })
  const onSubmit = handleSubmit((data: FormData) => {
    const submitData = {
      email: data.email,
      digitCode: parseInt(data.digitCode, 10)
    }
    validateCodeMutation.mutate(submitData, {
      onSuccess: (data) => {
        navigate({ pathname: path.setNewPassword })
        console.log(data)
      },
      onError: (error) => {
        toast.error('Mã xác nhận không hợp lệ!')
        console.log(error)
      }
    })
  })
  return (
    <div>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-slate-900 min-h-screen'>
        <a href='#' className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
          <img className='w-8 h-8 mr-2' src='https://cdn-icons-png.flaticon.com/128/1290/1290874.png ' alt='logo' />
          Procast
        </a>
        <input {...register('email', { value: localStorage.getItem('userEmail')?.toString() })} className='hidden' />
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center'>
              Nhập mã
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={onSubmit} noValidate autoComplete='off'>
              <div>
                <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Nhập mã đã gửi tới email của bạn:
                </label>
                <input
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  {...register('digitCode', rules.digitCode)}
                />
                <div className='mt-0 text-red-600 text-xs p-0'>{errors.digitCode?.message}</div>
              </div>
              <div className='flex items-center justify-between'>
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
                    <label htmlFor='remember' className='text-gray-900 dark:text-white'>
                      Xác nhận
                    </label>
                  </div>
                </div>
                <Link
                  to={path.login}
                  className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-gray-900 dark:text-white'
                >
                  Trở về đăng nhập
                </Link>
              </div>
              <Button
                type='submit'
                className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center items-center'
                isLoading={validateCodeMutation.isLoading}
                disabled={validateCodeMutation.isLoading}
              >
                Gửi
              </Button>
              <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                Chưa có tài khoản?{' '}
                <Link className='font-medium text-primary-600 hover:underline dark:text-primary-500' to='/register'>
                  Tạo tài khoản
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
