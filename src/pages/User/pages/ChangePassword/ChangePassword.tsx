/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query'
import { AppConxtext } from '~/contexts/app.context'
import { omit } from 'lodash'
import { toast } from 'react-toastify'
import { changePassword } from '~/apis/auth.api'
import { useContext } from 'react'
import { Button, Form, Input } from 'antd'
interface FieldType {
  old_password: string
  new_password: string
  confirm_password: string
}
export default function ChangePassword() {
  const { reset } = useContext(AppConxtext)
  const handleLogout = () => {
    reset()
  }
  const changePasswordMutation = useMutation({
    mutationFn: (body: Omit<FieldType, 'confirm_password'>) => changePassword(body)
  })

  const onFinish = (values: FieldType) => {
    if (values.new_password !== values.confirm_password) {
      toast.error('Xác minh lại mật khẩu mới')
    } else if (values.old_password === values.new_password) {
      toast.error('Mật khẩu mới phải khác mật khẩu cũ')
    } else {
      const body = omit(values, ['confirm_password'])
      changePasswordMutation.mutate(body, {
        onSuccess: (data) => {
          toast.success('Đổi mật khẩu thành công!')
          setTimeout(handleLogout, 2000)
          console.log(data)
        },
        onError: (error) => {
          toast.error('error')
          console.log(error)
        }
      })
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className='flex justify-center  h-screen'>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        rootClassName='pt-4 w-3/4'
      >
        <Form.Item<FieldType>
          label='Mật khẩu hiện tại'
          name='old_password'
          rules={[{ required: true, message: 'Vui lòng điền mật khẩu hiện tại!' }]}
        >
          <Input.Password autoComplete='on' />
        </Form.Item>

        <Form.Item<FieldType>
          label='Mật khẩu mới'
          name='new_password'
          rules={[{ required: true, message: 'Vui lòng điền mật khẩu mới!' }]}
        >
          <Input.Password autoComplete='on' />
        </Form.Item>
        <Form.Item<FieldType>
          label='Xác minh mật khẩu mới'
          name='confirm_password'
          rules={[{ required: true, message: 'Vui lòng xác minh mật khẩu mới!' }]}
        >
          <Input.Password autoComplete='on' />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit' rootClassName='bg-cyan-200'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
