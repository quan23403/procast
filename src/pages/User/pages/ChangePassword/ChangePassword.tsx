import { Button, Form, Input } from 'antd'
export default function ChangePassword() {
  const onFinish = (values: FieldType) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  type FieldType = {
    oldPassword?: string
    newPassword?: string
    confirmPassword?: string
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
        autoComplete='off'
        rootClassName='pt-4 w-3/4'
      >
        <Form.Item<FieldType>
          label='Current Password'
          name='oldPassword'
          rules={[{ required: true, message: 'Please input your current password!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='New Password'
          name='newPassword'
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label='Confirm Password'
          name='confirmPassword'
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password />
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
