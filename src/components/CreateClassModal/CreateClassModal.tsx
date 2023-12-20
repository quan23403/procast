// import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input } from 'antd'
// import { omit } from 'lodash'
import ReactDOM from 'react-dom'
// import { toast } from 'react-toastify'
// import englishClassApi from '~/apis/englishClass.api'
import { englishClass } from '~/types/englishClass.type'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function CreateClassModal({ isOpen, onClose }: Props) {
  const modalRoot = document.getElementById('root') as HTMLElement

  function onFinish(values: any): void {
    console.log(values)
  }

  function onFinishFailed(errorInfo: any): void {
    console.log(errorInfo)
  }

  return isOpen
    ? ReactDOM.createPortal(
        <div className='modal-overlay'>
          <div className='modal-content w-1/4'>
            <div className='relative z-0 w-full mb-6 group flex-col justify-center'>
              <Form
                name='basic'
                labelCol={{ span: 7 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 15000 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                rootClassName='pt-4 h-full w-full'
              >
                <Form.Item<englishClass>
                  label='Tên khóa học:'
                  name='course_name'
                  rules={[{ required: true, message: 'Vui lòng điền tên khóa học!' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<englishClass>
                  label='Giáo viên:'
                  name='main_teacher'
                  rules={[{ required: true, message: 'Vui lòng điền tên giáo viên!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<englishClass>
                  label='Phòng học:'
                  name='room'
                  rules={[{ required: true, message: 'Vui lòng điền phòng học!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<englishClass>
                  label='Phòng học:'
                  name='room'
                  rules={[{ required: true, message: 'Vui lòng xác minh mật khẩu mới!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<englishClass>
                  label='Phòng học:'
                  name='room'
                  rules={[{ required: true, message: 'Vui lòng xác minh mật khẩu mới!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<englishClass>
                  label='Phòng học:'
                  name='room'
                  rules={[{ required: true, message: 'Vui lòng xác minh mật khẩu mới!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item<englishClass>
                  label='Phòng học:'
                  name='room'
                  rules={[{ required: true, message: 'Vui lòng xác minh mật khẩu mới!' }]}
                >
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type='primary' htmlType='submit' rootClassName='bg-cyan-200'>
                    Submit
                  </Button>{' '}
                  <Button type='primary' rootClassName='bg-cyan-200' onClick={() => onClose()}>
                    Close
                  </Button>
                </Form.Item>
              </Form>
              {/* <button
                type='button'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                onClick={() => onClose()}
              >
                Close
              </button> */}
            </div>
          </div>
        </div>,
        modalRoot
      )
    : null
}
