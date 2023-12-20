/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react';
// import { useState } from 'react';
import { classesList } from '~/types/classLists.type';
import './StudyRoadMap.css'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input, Table } from 'antd';
import { useState } from 'react';
import { Form } from 'react-router-dom';
import { Modal as AntdModal } from 'antd';

// import DetailClassHeader from '~/components/DetailClassHeader';
export default function StudyRoadMap() {
    const [openEditMap, setOpenEditMap] = useState<Record<number, boolean>>({});

    const openEditModal = (classId: number) => {
        setOpenEditMap((prev) => ({ ...prev, [classId]: true }));
    };

    const closeEditModal = (classId: number) => {
        setOpenEditMap((prev) => ({ ...prev, [classId]: false }));
    };
    const columns = [
        {
            title: 'Công cụ',
            key: 'action',
            render: (record: classesList) => {

                return (
                    <div>
                        <a onClick={() => { openEditModal(record.class_id) }}><FormOutlined style={{ fontSize: '24px', marginRight: '20px' }} />
                        </a>
                        {/* <AntdModal
                            centered={true}
                            title={`Chỉnh sửa buổi học ${record.class_id}`}
                            open={openEditMap[record.class_id] || false}
                            onCancel={() => closeEditModal(record.class_id)}
                            onOk={() => closeEditModal(record.class_id)}>
                            <Form>
                                <Form.Item
                                    label="Buổi học"
                                    name="name">
                                    <Input defaultValue={record.name}></Input>
                                </Form.Item>
                                <Form.Item
                                    label="Ngày"
                                    name="date">
                                    <Input type='date' defaultValue={record.date as string}></Input>
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email">
                                    <Input defaultValue={record.email}></Input>
                                </Form.Item>
                                <Form.Item
                                    label="SĐT"
                                    name="phone">
                                    <Input defaultValue={record.phone}></Input>
                                </Form.Item>
                            </Form>
                        </AntdModal> */}
                        <a><DeleteOutlined style={{ fontSize: '24px', marginRight: '20px', color: 'red' }} />
                        </a>
                    </div>
                )
            }
        },

        {
            title: '#',
            dataIndex: 'class_id',
            key: 'id',
            width: 40
        },
        {
            title: 'Buổi học',
            dataIndex: 'class',
            key: 'class',
        }, {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
        }, {
            title: 'Ca học',
            key: 'shift',
            render: (record: classesList) => {
                return <span>{`${record.start_time}-${record.end_time}`}</span>
            }
        }, {
            title: 'TA đã được duyệt',
            key: 'assistance',
            render: (record: classesList) => {
                return record.assistant?.map((ta) => {
                    <span key={ta}>{ta}<br /></span>
                })
            }
        },

    ]
    return (
        <div className="container-road-map">
            {/* <DetailClassHeader></DetailClassHeader> */}
            <div className="main-content-road-map">
                <div className='title-road-list' style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ paddingLeft: "10px", fontWeight: "bold" }}>Danh sách sinh viên</h2>
                    <div className="items" style={{ padding: "15px", marginLeft: "auto" }}>
                        <button className='addNewclass' /*onClick={() => { setOpenModal(true); }}*/>Thêm buổi học</button>
                        {/* {openModal && <Modal closeModal={setOpenModal} />} */}
                        <button className='exportButton'>Xuất Excel</button>
                    </div>
                </div>

                <Table columns={columns} ></Table>
            </div>
        </div>
    )
}