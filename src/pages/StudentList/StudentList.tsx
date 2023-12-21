/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import './StudentList.css'
import Modal from './Components/Modal';
import { DeleteOutlined } from '@ant-design/icons'
import { FormOutlined } from '@ant-design/icons'
import { StudentsInfo } from '~/types/student.type';
import { useQuery } from '@tanstack/react-query';
import { Form, Input, Table } from 'antd';
import { omitBy, isUndefined } from 'lodash';
import { useParams } from 'react-router-dom';
import classDetailApi from '~/apis/classDetail.api';
import dayjs from 'dayjs';
import { Modal as AntdModal } from 'antd';
// import DetailClassHeader from '~/components/DetailClassHeader';
export default function StudentList() {
    const [openModal, setOpenModal] = useState(false)
    const [openEditMap, setOpenEditMap] = useState<Record<number, boolean>>({});

  const openEditModal = (studentId: number) => {
    setOpenEditMap((prev) => ({ ...prev, [studentId]: true }));
  };

  const closeEditModal = (studentId: number) => {
    setOpenEditMap((prev) => ({ ...prev, [studentId]: false }));
  };
  
    const { id } = useParams()
    const queryConfig = omitBy(
        {
            courseId: id
        },
        isUndefined
    )
    const { data: checkinData } = useQuery({
        queryKey: ['checkinData', queryConfig],
        queryFn: () => {
            return classDetailApi.getStudentList(queryConfig)
        }
    })
    const studentList: StudentsInfo[] = [...(checkinData?.data?.data ?? [])].map((item) => ({
        ...item,
        dob: dayjs(item.dob).format('DD/MM/YYYY')
    }));
    const columns = [
        {
            title: '#',
            dataIndex: 'student_id',
            key: 'id',
            width: 40
        },
        {
            title: 'Họ và tên',
            dataIndex: 'student_name',
            key: 'name',
        }, {
            title: 'Ngày sinh',
            dataIndex: 'dob',
            key: 'dob',
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: 'SĐT',
            dataIndex: 'phone_number',
            key: 'phone',
        }, {
            title: 'Tình trạng',
            key: 'status',
            render: (record: StudentsInfo) => {
                return record.status? <span>{record.status}</span> : <span>Đang theo học</span>  
            }
        },
        {
            title: 'Công cụ',
            key: 'action',
            render: (record: StudentsInfo) => {

                return (
                    <div>
                        <a onClick={()=>{openEditModal(record.student_id)}} title='Chi tiết'><FormOutlined style={{fontSize:'24px', marginRight:'20px'}}/>
                        </a>
                        <AntdModal 
                        centered={true}
                        title={`Chỉnh sửa thông tin học sinh ${record.student_id}`}
                        open={openEditMap[record.student_id] || false}
            onCancel={() => closeEditModal(record.student_id)}
            onOk={() => closeEditModal(record.student_id)}>
                            <Form disabled>
                                <Form.Item
                                    label="Họ và tên"
                                    name="name">
                                    <Input defaultValue={record.student_name}></Input>
                                </Form.Item>
                                <Form.Item
                                    label="Ngày sinh"
                                    name="dob">
                                    <Input defaultValue={record.dob}></Input>
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email">
                                    <Input defaultValue={record.email}></Input>
                                </Form.Item>
                                <Form.Item
                                    label="SĐT"
                                    name="phone">
                                    <Input defaultValue={record.phone_number}></Input>
                                </Form.Item>
                            </Form>
                        </AntdModal>
                        <a><DeleteOutlined style={{fontSize:'24px', marginRight:'20px', color:'red'}}/>
                        </a>
                    </div>
                )
            }
        }
    ]
    return (
        <div className="container-student-list">
            {/* <DetailClassHeader></DetailClassHeader> */}
            <div className="main-content-student-list">
                <div className='title-student-list' style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ paddingLeft: "10px", fontWeight: "bold" }}>Danh sách sinh viên</h2>
                    <div className="items" style={{ padding: "15px", marginLeft: "auto" }}>
                        <button className='addNewStudent' onClick={() => { setOpenModal(true); }}>Thêm học viên</button>
                        {openModal && <Modal closeModal={setOpenModal} />}
                        <button className='exportButton'>Xuất Excel</button>
                    </div>
                </div>
                <Table
                    dataSource={studentList}
                    columns={columns}
                    bordered={true}
                ></Table>
            </div>
        </div>
    )
}