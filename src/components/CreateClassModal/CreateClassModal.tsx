/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useMutation } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import { AutoComplete, Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, TimePicker } from 'antd'
import dayjs from 'dayjs'
// import { omit } from 'lodash'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import employeeApi from '~/apis/employee.api'
import englishClassApi from '~/apis/englishClass.api'
import { employeeType } from '~/pages/EmployeeList/EmployeeList'
// import { toast } from 'react-toastify'
// import englishClassApi from '~/apis/englishClass.api'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export interface createClassType {
  class_type: string
  start_time: string  | dayjs.Dayjs
  end_time: string | dayjs.Dayjs
  start_date: string | dayjs.Dayjs
  teacher: string
  room: number
  study_date: string[]
  location: string
}

export default function CreateClassModal({ isOpen, onClose }: Props) {
  const modalRoot = document.getElementById('root') as HTMLElement
  const [form] = Form.useForm<createClassType>();
  const createClassMutation = useMutation({
    mutationFn: (body: createClassType) => englishClassApi.createClass(body)
  })
  const { data: teacherdata } = useQuery({
    queryKey: ['employee', 'Teacher'],
    queryFn: () => {
      return employeeApi.getEmployees({ job_position: 'Teacher' })
    }
  })
  const teacherOptions = (teacherdata?.data?.data || []).map((item: employeeType) => ({
    label: item.full_name,
    value: item.user_name
  }))
  function onFinish(): void {
    const values = form.getFieldsValue();
  const formattedValues = {
    ...values,
    start_time: dayjs(values.start_time).format('HH:mm'),
    end_time: dayjs(values.end_time).format('HH:mm'),
    start_date: dayjs(values.start_date).format('YYYY-MM-DD'),
  };

    createClassMutation.mutate(formattedValues, {
      onSuccess: (data) => {
        toast.success('Tạo khóa thành công!')
        setTimeout(() => onClose(), 1000)
        console.log(data)
        // console.log(values)
      },
      onError: (error) => {
        toast.error('Thêm mới khóa học không thành công ')
        setTimeout(() => onClose(), 1000)
        console.log(error)
        // console.log(values)
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
          <h2 className='text-center bg-slate-700 text-white mx-0 rounded-lg py-3'>Thêm khóa học</h2>
          <div className='relative z-0 w-full mb-6 group flex-col justify-center'>
            <Form
              form={form}
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
              <Form.Item<createClassType>
                label='Tên khóa học:'
                name='class_type'
                rules={[{ required: true, message: 'Vui lòng điền tên khóa học!' }]}
              >
                <AutoComplete
                  options={[
                    { value: 'PS' },
                    { value: 'SR' },
                    { value: 'IT' }
                  ]}
                  onChange={(value) => {
                    if (value) {
                      form.setFieldsValue({ class_type: value })
                    }
                  }}
                  filterOption={(inputValue, option) =>
                    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                  }
                ></AutoComplete>
              </Form.Item>
              <Form.Item<createClassType>
                label='Thời gian bắt đầu:'
                name='start_time'
                rules={[{ required: true, message: 'Vui lòng điền thời gian bắt đầu!' }]}
              >
                <TimePicker format={'HH:mm'} showNow={false} onChange={(time) => {
                  if (time) {
                    form.setFieldsValue({ start_time: time })
                  }
                }} />
              </Form.Item>
              <Form.Item<createClassType>
                label='Thời gian kết thúc:'
                name='end_time'
                rules={[{ required: true, message: 'Vui lòng điền thời gian kết thúc!' }]}
              >
                <TimePicker format={'HH:mm'} showNow={false} onChange={(time) => {
                  if (time) {
                    form.setFieldsValue({ end_time: time })
                  }
                }} />
              </Form.Item>
              <Form.Item<createClassType>
                name='start_date'
                label='Ngày bắt đầu'
                rules={[{ required: true, message: 'Vui lòng điền ngày bắt đầu!' }]}
              >
                <DatePicker
                  placeholder='YYYY-MM_DD'
                  format='YYYY-MM-DD'
                  onChange={(date) => {
                    if (date) {
                      form.setFieldsValue({ start_date: date });
                    }
                  }}
                />
              </Form.Item>

              <Form.Item<createClassType>
                label='Giáo viên:'
                name='teacher'
                rules={[{ required: true, message: 'Vui lòng điền tên giáo viên!' }]}
              >
                <Select
                  placeholder='Chọn giáo viên'
                  options={teacherOptions}
                ></Select>
                {/* <Input placeholder='VD: Hoàng Trọng Tùng' /> */}
              </Form.Item>
              <Form.Item<createClassType>
                label='Phòng:'
                name='room'
                rules={[{ required: true, message: 'Vui lòng điền tên phòng học!' }]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item<createClassType>
                name='study_date'
                label='Ngày học'
                rules={[{ required: true, message: 'Vui lòng chọn ngày học!' }]}
              >
                <Checkbox.Group>
                  <Row>
                    <Col span={8}>
                      <Checkbox value='Monday' style={{ lineHeight: '32px' }}>
                        T2
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value='Tuesday' style={{ lineHeight: '32px' }}>
                        T3
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value='Wednesday' style={{ lineHeight: '32px' }}>
                        T4
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value='Thursday' style={{ lineHeight: '32px' }}>
                        T5
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value='Friday' style={{ lineHeight: '32px' }}>
                        T6
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value='Saturday' style={{ lineHeight: '32px' }}>
                        T7
                      </Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value='Sunday' style={{ lineHeight: '32px' }}>
                        CN
                      </Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item
                label='Địa điểm:'
                name='location'
                rules={[{ required: true, message: 'Vui lòng điền tên địa điểm!' }]}
              >
                <Input placeholder='VD: hqv' />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit' rootClassName='bg-cyan-200'>
                  Submit
                </Button>{' '}
                <Button type='primary' danger onClick={() => onClose()}>
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
