/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, InputNumber } from 'antd'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import englishClassApi from '~/apis/englishClass.api'

interface Props {
  isOpen: boolean
  onClose: () => void
  course_id: number
  teacher: string
  room: number
}
export type ModifyType = Omit<Props, 'isOpen' | 'onClose'>
export default function ModifyCourse({ isOpen, onClose, course_id, teacher, room }: Props) {
  const queryClient = useQueryClient()
  const modalRoot = document.getElementById('root') as HTMLElement
  const modifyCourseMutation = useMutation({
    mutationFn: (body: ModifyType) => englishClassApi.modifyClass(body)
  })
  function onFinish(values: ModifyType): void {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    modifyCourseMutation.mutate(values, {
      onSuccess: (data) => {
        toast.success('Cập nhật khóa học thành công!')
        queryClient.invalidateQueries({ queryKey: ['course'] })
        console.log(data)
        console.log(values)
      },
      onError: (error) => {
        toast.error('Cập nhật khóa học không thành công ')
        setTimeout(() => onClose(), 1000)
        console.log(error)
        console.log(values)
      }
    })
  }
  function onFinishFailed(errorInfo: any): void {
    console.log(errorInfo)
  }

  return isOpen
    ? ReactDOM.createPortal(
        <div className='modal-overlay'>
          <div className='modal-content w-1/4'>
            <h2 className='text-center bg-slate-700 text-white mx-0 rounded-lg py-3'>Chỉnh sửa khóa học</h2>
            <div className='relative z-0 w-full mb-6 group flex-col justify-center'>
              <Form
                name='basic'
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 15000 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                rootClassName='pt-4 h-full w-full'
              >
                <Form.Item<ModifyType>
                  label='Mã lớp học:'
                  name='course_id'
                  initialValue={course_id}
                  rules={[{ required: true, message: 'Vui lòng điền tên giáo viên!' }]}
                >
                  <Input readOnly />
                </Form.Item>
                <Form.Item<ModifyType>
                  label='Giáo viên:'
                  name='teacher'
                  rules={[{ required: true, message: 'Vui lòng điền tên giáo viên!' }]}
                  initialValue={teacher}
                >
                  <Input />
                </Form.Item>
                <Form.Item<ModifyType>
                  label='Phòng học:'
                  name='room'
                  rules={[{ required: true, message: 'Vui lòng điền phòng học!' }]}
                  initialValue={room}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type='primary' htmlType='submit' rootClassName='bg-cyan-200'>
                    Submit
                  </Button>{' '}
                  <Button type='primary' rootClassName='bg-cyan-200' onClick={() => onClose()} danger>
                    Close
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>,
        modalRoot
      )
    : null
}
