import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DatePicker, Form, Input, Modal, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import employeeApi from "~/apis/employee.api";
import { classesList, sessionsUpdate } from "~/types/classLists.type";
import { employeeType } from "../EmployeeList/EmployeeList";
import classDeltailApi from "~/apis/classDetail.api";
import { toast } from "react-toastify";

export default function EditModal(props: { record: classesList }) {
    const queryClient = useQueryClient();

    const record = {
        ...props.record,
        date: dayjs(props.record.date, 'DD/MM/YYYY'),
        start_time: dayjs(props.record.start_time, 'HH:mm'),
        end_time: dayjs(props.record.end_time, 'HH:mm'),
        shift: [dayjs(props.record.start_time, 'HH:mm'), dayjs(props.record.end_time, 'HH:mm')]
    };
    const [form] = Form.useForm();
    const [formData, setFormData] = useState<sessionsUpdate>({
        class_id: record.class_id
    })
    const [openEditMap, setOpenEditMap] = useState(false);

  const openEditModal = () => {
    setOpenEditMap(true)
  }

  const closeEditModal = () => {
    setOpenEditMap(false)
  }

  const { data } = useQuery({
    queryKey: ['employee', 'TA'],
    queryFn: () => {
      return employeeApi.getEmployees({ job_position: 'TA' })
    }
  })

    const TAlist: employeeType[] = (data?.data?.data || []).map((item: employeeType) => ({
        label: item.full_name,
        value: item.user_id
    }))
    const updateSession = useMutation({
        mutationFn: () => classDeltailApi.updateSession(formData)
      })
      
    const handleSubmit = (values: { date: string; shift: (string | number | Date | dayjs.Dayjs | null | undefined)[]; room: string; note: string; ta: {value: string, label: string}[] }) => {
        console.log("values",values)
        const edit = form.isFieldsTouched(['date', 'shift', 'ta', 'room']);
        setFormData({
            class_id: record.class_id,
            date: dayjs(values.date).format('YYYY-MM-DD'),
            startTime: dayjs(values.shift[0]).format('HH:mm:ss'),
            endTime: dayjs(values.shift[1]).format('HH:mm:ss'),
            room: parseInt(values.room),
            check: edit,
            note: values.note,
            assistant: values.ta.map((u)=>u.value)
        })
        // Handle the form submission logic here
        console.log("form edit", formData);
        updateSession.mutate(undefined, {
            onSuccess: () => {
                toast.success('Cập nhật thành công');
                queryClient.invalidateQueries(['sessionData']);
              closeEditModal();
            },
            onError: (error) => {
                toast.error('Cập nhật thất bại');
                console.log(error);
            }
          })
        
    };

  return (
    <div>
      <a onClick={() => openEditModal()} title='Tùy chỉnh'>
        <FormOutlined style={{ fontSize: '24px', marginRight: '20px' }} />
      </a>
      <Modal
        open={openEditMap}
        title='Tùy chỉnh lớp học'
        onCancel={() => closeEditModal()}
        onOk={() => form.submit()}
        okText={'Cập nhật'}
        cancelText={'Hủy'}
      >
        <Form form={form} initialValues={record} onFinish={handleSubmit}>
          <Form.Item label='Buổi học'>
            <span>{record.name}</span>
          </Form.Item>
          <Form.Item label='Ngày' name='date'>
            <DatePicker />
          </Form.Item>
          <Form.Item label='Ca học' name='shift'>
            <TimePicker.RangePicker format={'HH:mm'} />
          </Form.Item>
          <Form.Item label='TA được duyệt' name='ta'>
            <Select mode='multiple' options={TAlist} labelInValue={true}></Select>
          </Form.Item>
          <Form.Item label='Phòng học' name='room'>
            <Input type='number' />
          </Form.Item>
          <Form.Item label='Ghi chú' name='note'>
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <a title='Xóa buổi học'>
        <DeleteOutlined style={{ fontSize: '24px', marginRight: '20px', color: 'red' }} />
      </a>
    </div>
  )
}
