import { Button, Checkbox, DatePicker, Form, Input, Select } from 'antd'
import moment from 'moment'
import { AppConxtext } from '~/contexts/app.context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import userApi from '~/apis/user.api'
import { toast } from 'react-toastify'

const { Option } = Select
export interface updateProfile {
  email: string
  dob: string
  fullName: string
  gender: string
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

export default function Profile() {
  const [form] = Form.useForm()
  const { reset } = useContext(AppConxtext)
  const handleLogout = () => {
    reset()
  }
  const changeProfileMutation = useMutation({
    mutationFn: (body: updateProfile) => userApi.updateProfile(body)
  })
  const { profile } = useContext(AppConxtext)
  const onFinish = (values: updateProfile) => {
    changeProfileMutation.mutate(values, {
      onSuccess: (data) => {
        toast.success('Thay đổi hồ sơ thành công!')
        setTimeout(handleLogout, 2000)
        console.log(data)
      },
      onError: (error) => {
        toast.error('error')
        console.log(error)
      }
    })
  }
  return (
    <div className='flex justify-center  h-screen'>
      <Form
        {...formItemLayout}
        form={form}
        name='register'
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        scrollToFirstError
        rootClassName='pt-4 w-3/4'
      >
        <Form.Item
          name='email'
          label='E-mail'
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
          initialValue={profile?.email}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Ngày sinh'
          name='dob'
          getValueFromEvent={(onChange) => moment(onChange).format('YYYY-MM-DD')}
          getValueProps={(i) => ({ value: i === undefined ? undefined : moment(i) })}
          rules={[{ required: true, message: 'hãy điền ngày tháng năm sinh của bạn' }]}
          initialValue={profile?.dob}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name='fullName'
          label='Họ và tên'
          tooltip='Tên đầy đủ của bạn là gì?'
          rules={[{ required: true, message: 'Hãy điền họ và tên đầy đủ!', whitespace: true }]}
          initialValue={profile?.fullName}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name='gender'
          label='Giới tính'
          rules={[{ required: true, message: 'Hãy chọn giới tính!' }]}
          initialValue={'Male'}
        >
          <Select placeholder='Hãy chọn giới tính'>
            <Option value='male'>Male</Option>
            <Option value='female'>Female</Option>
            <Option value='other'>Other</Option>
          </Select>
        </Form.Item>

        {/* <Form.Item label='Captcha' extra='We must make sure that your are a human.'>
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name='captcha'
                noStyle
                rules={[{ required: true, message: 'Please input the captcha you got!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item> */}

        <Form.Item
          name='agreement'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('Bạn nên đồng ý thay đổi'))
            }
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>Tôi đồng ý thay đổi (Logout sau khi thay đổi)</Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit' rootClassName='bg-cyan-200'>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
