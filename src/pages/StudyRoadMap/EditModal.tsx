import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, Modal, Select, TimePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { classesList, sessionsUpdate } from "~/types/classLists.type";

export default function EditModal(props: { record: classesList }) {
    const record = {
        ...props.record,
        date: dayjs(props.record.date, 'DD/MM/YYYY'),
        start_time: dayjs(props.record.start_time, 'HH:mm'),
        end_time: dayjs(props.record.end_time, 'HH:mm'),
        shift: [dayjs(props.record.start_time, 'HH:mm'),dayjs(props.record.end_time, 'HH:mm')]
    };
    const [form] = Form.useForm();
    const [openEditMap, setOpenEditMap] = useState(false);

    const openEditModal = () => {
        setOpenEditMap(true);
    };

    const closeEditModal = () => {
        setOpenEditMap(false);
    };

    const handleSubmit = (values: sessionsUpdate) => {
        // Handle the form submission logic here
        console.log("Form values:", values);

        // Close the modal
        closeEditModal();
    };

    return (
        <div>
            <a onClick={() => openEditModal()}>
                <FormOutlined style={{ fontSize: '24px', marginRight: '20px' }} />
            </a>
            <Modal
                open={openEditMap}
                title="Edit Class"
                onCancel={() => closeEditModal()}
                onOk={() => form.submit()}
            >
                <Form form={form} initialValues={record} onFinish={handleSubmit}>
                    <Form.Item label="Buổi học">
                        <span>{record.name}</span>
                    </Form.Item>
                    <Form.Item label="Ngày" name="date">
                        <DatePicker />
                    </Form.Item>
                    <Form.Item label="Ca học" name="shift" >
                        <TimePicker.RangePicker format={'HH:mm'}/>
                    </Form.Item>
                    <Form.Item label="TA được duyệt" name="assistance">
                        <Select mode="multiple"></Select>
                    </Form.Item>
                    <Form.Item label='Ghi chú' name='note'>
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </Modal>
            <a>
                <DeleteOutlined style={{ fontSize: '24px', marginRight: '20px', color: 'red' }} />
            </a>
        </div>
    );
}
