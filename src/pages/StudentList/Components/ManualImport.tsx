/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from 'antd';
import './ManualImport.css'
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import classDeltailApi from '~/apis/classDetail.api';
import { useState } from 'react';
import { StudentParam } from '~/types/student.type';
import { toast } from 'react-toastify';
interface ManualImportProps {
  closeModal: (value: boolean) => void;
}

const ManualImport: React.FC<ManualImportProps> = ({closeModal }) => {
  const {id: course_id} = useParams()
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState<StudentParam>({
    name: '',
    courseId: 0,
    dob: '',
    email: '',
    phone: ''
  })
  const createNewStudent = useMutation({
    mutationFn: () => classDeltailApi.addNewStudent(formData)
  })
  const onFinish = (values: any) => {
    setFormData({...values, name: values.student_name, courseId: course_id})
    createNewStudent.mutate(undefined, {
      onSuccess: () => {
        toast.success('Thêm học sinh thành công')
        form.resetFields()
        queryClient.invalidateQueries({
          queryKey: ['studentlistData']
        })
        closeModal(false)
      },
      onError: (error) => {
        toast.error(`Thêm học sinh thất bại ${error}`)
      }
    })
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const [form] = Form.useForm()
  type FieldType = {
    student_name?: string;
    dob?: string;
    email?: string;
    phone?: string;
  }
  return (
    <Form className="manual-content" onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}>
      <Form.Item<FieldType>
        label="Họ và tên"
        name="student_name"
        rules={[{ required: true, message: 'Nhập họ và tên học sinh!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Ngày sinh"
        name="dob"
        rules={[{ required: true, message: 'Nhập ngày sinh học sinh!' }]}
      >
        <Input type='date' />
      </Form.Item><Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Nhập email học sinh!' }]}
      >
        <Input type='email' />
      </Form.Item><Form.Item<FieldType>
        label="SĐT"
        name="phone"
        rules={[{ required: true, message: 'Nhập số điện thoại học sinh!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4, span: 16 }} style={{textAlign:'center', padding:'0'}}>
        <Button type="primary" htmlType="submit" style={{ backgroundColor: "#1677ff", margin:'0' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );

}

export default ManualImport;