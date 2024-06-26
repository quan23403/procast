/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import './StudentList.css'
import Modal from './Components/Modal';
import { DeleteOutlined } from '@ant-design/icons'
import { FormOutlined } from '@ant-design/icons'
import { StudentsInfo } from '~/types/student.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Table } from 'antd';
import { omitBy, isUndefined } from 'lodash';
import { useParams } from 'react-router-dom';
import classDetailApi from '~/apis/classDetail.api';
import dayjs from 'dayjs';
import { Modal as AntdModal } from 'antd';
import { toast } from 'react-toastify';
import { Excel } from "antd-table-saveas-excel";

// import DetailClassHeader from '~/components/DetailClassHeader';
export default function StudentList() {
    const [openModal, setOpenModal] = useState(false)
    const [openEditMap, setOpenEditMap] = useState<Record<number, boolean>>({});
    const [openDeleteMap, setOpenDeleteMap] = useState<Record<number, boolean>>({});
    const queryClient = useQueryClient()
    const [deleteStudentId, setDeleteStudent] = useState<{ student_id: string, course_id: string }>({ student_id: "", course_id: "" })
    const openEditModal = (studentId: number) => {
        setOpenEditMap((prev) => ({ ...prev, [studentId]: true }));
    };
    const openDeleteModal = (studentId: number) => {
        setOpenDeleteMap((prev) => ({ ...prev, [studentId]: true }));
    };
    const closeEditModal = (studentId: number) => {
        setOpenEditMap((prev) => ({ ...prev, [studentId]: false }));
    };
    const closeDeleteModal = (studentId: number) => {
        setOpenDeleteMap((prev) => ({ ...prev, [studentId]: false }));
    }

    const { id } = useParams()
    const queryConfig = omitBy(
        {
            courseId: id
        },
        isUndefined
    )
    const { data: checkinData } = useQuery({
        queryKey: ['studentlistData', queryConfig],
        queryFn: () => {
            return classDetailApi.getStudentList(queryConfig)
        }
    })
    const studentList: StudentsInfo[] = [...(checkinData?.data?.data ?? [])].map((item) => ({
        ...item,
        dob: dayjs(item.dob).format('DD/MM/YYYY')
    }));

    const deleteStudent = useMutation({
        mutationKey: ['deleteStudent'],
        mutationFn: () => {
            return classDetailApi.deleteStudent(deleteStudentId)
        }
    })
    const onDelete = (studentId: string) => {
        setDeleteStudent({ student_id: studentId, course_id: id || ""})

        deleteStudent.mutate(undefined, {
            onSuccess: () => {
                toast.success('Xóa thành công')
                queryClient.invalidateQueries(['studentlistData', queryConfig])
                closeDeleteModal(parseInt(studentId))
            },
            onError: (error) => {
                toast.error(`Không thể xóa: ${error}`)
            }
        })
    }

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
            render: () => {
                return  <span>Đang theo học</span>
            }
        },
        {
            title: 'Công cụ',
            key: 'action',
            render: (record: StudentsInfo) => {

                return (
                    <div>
                        <a onClick={() => { openEditModal(record.student_id) }} title='Chi tiết'><FormOutlined style={{ fontSize: '24px', marginRight: '20px' }} />
                        </a>
                        <AntdModal
                            centered={true}
                            title={`Chi tiết thông tin học sinh ${record.student_id}`}
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
                        <a onClick={() => openDeleteModal(record.student_id)}><DeleteOutlined style={{ fontSize: '24px', marginRight: '20px', color: 'red' }} />
                        </a>
                        <AntdModal open={openDeleteMap[record.student_id] || false}
                            onCancel={() => closeDeleteModal(record.student_id)}
                            onOk={() => onDelete(record.student_id.toString())}
                            okText={'Xóa'}
                            okType='danger'>
                            <p>Bạn có chắc chắn muốn xóa học sinh này không?</p>
                        </AntdModal>
                    </div>
                )
            }
        }
    ]

    const exportExcel = () => {
        console.log("export excel")
        const excel = new Excel();
        excel.addSheet("Sheet1")
            .addColumns(columns.filter(column => column.key !== 'action').map(column => ({ ...column, dataIndex: column.dataIndex || '' })))
            .addDataSource(studentList)
            .setTBodyStyle({fontSize: 11})
            .setTHeadStyle({ fontSize: 11})
            .saveAs(`Danh sách học sinh lớp ${id}.xlsx`);
    }

    return (
        <div className="container-student-list">
            {/* <DetailClassHeader></DetailClassHeader> */}
            <div className="main-content-student-list">
                <div className='title-student-list' style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ paddingLeft: "10px", fontWeight: "bold" }}>Danh sách sinh viên</h2>
                    <div className="items" style={{ padding: "15px", marginLeft: "auto" }}>
                        <button className='addNewStudent' onClick={() => { setOpenModal(true); }}>Thêm học viên</button>
                        {openModal && <Modal closeModal={setOpenModal} />}
                        <button onClick={exportExcel} className='exportButton'>Xuất Excel</button>
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