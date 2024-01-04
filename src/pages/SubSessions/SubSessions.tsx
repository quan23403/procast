/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { subsessionsParam } from '~/types/classLists.type';
import './SubSession.css'
import { Button, Modal, Table, Form, Input, DatePicker, TimePicker, Select } from 'antd';
import EditModal from './EditModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { omitBy, isUndefined } from 'lodash';
import { useParams } from 'react-router-dom';
import classDetailApi, { subsessionsResponse } from '~/apis/classDetail.api';
import dayjs from 'dayjs';
import employeeApi from '~/apis/employee.api';
import { employeeType } from '../EmployeeList/EmployeeList';
import { AlignType } from 'rc-table/lib/interface';
import AssistantCheckin from './AssistantCheckin';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Excel } from 'antd-table-saveas-excel';


// import DetailClassHeader from '~/components/DetailClassHeader';
export default function SubSessions() {
    const { id } = useParams()
    const queryClient = useQueryClient();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newSubForm] = Form.useForm();
    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    }
    const queryConfig = omitBy(
        {
            courseId: id
        },
        isUndefined
    )
    const { data: sessionsData } = useQuery({
        queryKey: ['sessionData', queryConfig],
        queryFn: () => {
            return classDetailApi.getSubsessionList(queryConfig)
        }
    })

    const { data: checkinData } = useQuery({
        queryKey: ["checkinData", queryConfig],
        queryFn: () => {
            return employeeApi.getCheckin(queryConfig);
        },
    });
    const { data: TAdata } = useQuery({
        queryKey: ['employee', 'TA'],
        queryFn: () => {
            return employeeApi.getEmployees({ job_position: 'TA' })
        }
    })
    const newSubsession = useMutation({
        mutationKey: ['newSubsession', id],
        mutationFn: (data: subsessionsParam) => classDetailApi.addNewSubsession(data)
    })

    const handleCreateSubsession = () => {
        const values = newSubForm.getFieldsValue();
        const body = {
            course_id: parseInt(id || '0'),
            date: dayjs(values.date).format('YYYY-MM-DD'),
            start_time: dayjs(values.shift[0]).format('HH:mm'),
            end_time: dayjs(values.shift[1]).format('HH:mm'),
            ta_id: values.ta.toString(),
            room: parseInt(values.room.toString())
        }
        newSubsession.mutate(body, {
            onSuccess: () => {
                queryClient.invalidateQueries(['sessionData', queryConfig]);
                toast.success("Tạo buổi học bổ trợ thành công");
                setIsCreateModalOpen(false);
            },
            onError: (error: any) => {
                toast.error("Tạo buổi học bổ trợ không thành công");
                console.log(error)
            }
        })
    }

    const TAlist = (TAdata?.data?.data || []).map((item: employeeType) => ({ value: item.user_id, label: item.full_name }))


    const sessionsList: subsessionsResponse[] = (sessionsData?.data?.data || []).map((item, index) => {

        const assistant = (TAdata?.data?.data || [])
            .find((ta: employeeType) => (item.ta_id && item.ta_id === ta.user_id.toString()))
        const assistantInfo = [{value: assistant?.user_id || "", label: assistant?.full_name || ""}]
        return {
            ...item,
            date: dayjs(item.date).format('DD/MM/YYYY'),
            start_time: item.start_time.slice(0, 5),
            end_time: item.end_time.slice(0, 5),
            name: `Buổi ${index + 1}`,
            ta: assistantInfo,
            assistance: assistantInfo.map((item) => item.label).join(', ')
        };
    });

    const columns = [
        {
            title: 'Công cụ',
            key: 'action',
            render: (record: subsessionsResponse) => {
                return <EditModal record={record}></EditModal>;
            },
            width: 128
        },
        {
            title: '#',
            dataIndex: 'class_id',
            key: 'id',
            width: 40,
            align: 'center' as AlignType

        },
        {
            title: 'Buổi học',
            dataIndex: 'name',
            key: 'class',
            width: 160,
            // align: 'center' as AlignType

        },
        {
            title: 'Ngày',
            dataIndex: 'date',
            key: 'date',
            width: 160,
            // align: 'center' as AlignType
        },
        {
            title: 'Phòng học',
            dataIndex: 'room',
            key: 'room',
            width: 120
        },
        {
            title: 'Ca học',
            key: 'shift',
            render: (record: subsessionsResponse) => {
                return <span>{`${record.start_time}-${record.end_time}`}</span>;
            },
            width: 120
        },
        {
            title: 'Nội dung',
            key: 'content',
            render: () => {
                return <span>Buổi bổ trợ</span>
            },
            width: 120
        },
        {   
            title: 'TA đã được duyệt',
            dataIndex: 'assistance',
            key: 'assistance',
            render: (_:any, record: subsessionsResponse) => {
                return (
                    <AssistantCheckin record={record} checkin={checkinData?.data.data || []}></AssistantCheckin>
                );
            },
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note'
        }
    ];

    const exportExcel = () => {
        const excel = new Excel();
        const excelColumns = columns
        .filter((column)=>column.dataIndex !== undefined)
        .map(column => ({ ...column, dataIndex: column.dataIndex || '', align: 'left', render: (text: any) => (text || '').toString() }))
        excelColumns.push({
            dataIndex: 'start_time',
            key: 'start_time',
            title: 'Thời gian bắt đầu học',
            width: 120,
            align: 'left',
            render: (text: any) => (text || '').toString(),
        },
        {
            dataIndex: 'end_time',
            key: 'end_time',
            title: 'Thời gian kết thúc học',
            width: 120,
            align: 'left',
            render: (text: any) => (text || '').toString(),
        });
        console.log(excelColumns)
        excel.addSheet("Sheet1")
        .addColumns(excelColumns.map(column => ({ ...column, align: "left" })))
        .addDataSource(sessionsList)
        .saveAs(`Danh sách lớp bổ trợ lớp ${id} .xlsx`)
    }

    return (
        <div className="container-road-map">
            {/* <DetailClassHeader></DetailClassHeader> */}
            <div className="main-content-road-map">
                <div className='title-road-list' style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ paddingLeft: "10px", fontWeight: "bold" }}>Danh sách lớp bổ trợ</h2>
                    <div className="items" style={{ padding: "15px", marginLeft: "auto" }}>
                        <Button
                            className='addButton addNewStudent'
                            style={{
                                backgroundColor: '#f0db2d',
                                fontFamily: 'inherit',
                                fontSize: '100%',
                                fontWeight: 'inherit',
                                border: 'none',
                                borderRadius: '5px',
                            }}
                            onClick={() => openCreateModal()}
                        >Thêm mới</Button>
                        <button onClick={exportExcel} className='exportButton'>Xuất Excel</button>
                    </div>
                </div>

                <Table bordered columns={columns} dataSource={sessionsList}></Table>
                <Modal
                    open={isCreateModalOpen}
                    onCancel={() => setIsCreateModalOpen(false)}
                    okText="Tạo"
                    cancelText="Hủy"
                    width={1000}
                    title="Tạo buổi học bổ trợ"
                    onOk={() => handleCreateSubsession()}
                >
                    <Form
                        form={newSubForm}>
                        <Form.Item label="Ngày" name="date" rules={[{ required: true, message: 'Yêu cầu nhập ngày' }]}>
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item label="Ca học" name="shift" rules={[{required: true, message: 'Yêu cầu nhập ca học'}]}>
                            <TimePicker.RangePicker format={'HH:mm'} />
                        </Form.Item>
                        <Form.Item label="Phòng học" name="room" rules={[{required: true, message: 'Yêu cầu nhập phòng học'}]}>
                            <Input type='number' />
                        </Form.Item>
                        <Form.Item label="TA đứng lớp" name="ta" rules={[{required: true, message: 'Yêu cầu chọn TA'}]}>
                            <Select options={TAlist}></Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    )
}