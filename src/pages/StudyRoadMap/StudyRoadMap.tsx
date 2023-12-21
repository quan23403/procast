/* eslint-disable @typescript-eslint/no-unused-vars */
import { classesList } from '~/types/classLists.type';
import './StudyRoadMap.css'
import { Table } from 'antd';
import EditModal from './EditModal';
import { useQuery } from '@tanstack/react-query';
import { omitBy, isUndefined } from 'lodash';
import { useParams } from 'react-router-dom';
import classDetailApi from '~/apis/classDetail.api';
import dayjs from 'dayjs';
import employeeApi from '~/apis/employee.api';
import { employeeType } from '../EmployeeList/EmployeeList';
import { AlignType} from 'rc-table/lib/interface';


// import DetailClassHeader from '~/components/DetailClassHeader';
export default function StudyRoadMap() {
    const { id } = useParams()
    
    const queryConfig = omitBy(
        {
            courseId: id
        },
        isUndefined
    )
    const { data: sessionsData } = useQuery({
        queryKey: ['checkinData', queryConfig],
        queryFn: () => {
            return classDetailApi.getSessionList(queryConfig)
        }
    })

    const { data: TAdata } = useQuery({
        queryKey: ['employee', 'TA'],
        queryFn: () => {
            return employeeApi.getSalary({ job_position: 'TA' })
        }
    })


    const sessionsList: classesList[] = (sessionsData?.data?.data || []).map((item, index) => {

        const assistants = (TAdata?.data?.data || [])
            .filter((ta: employeeType) => (item.assistant && item.assistant.includes(ta.user_id)))
            .map((ta: employeeType) => ({ value: ta.user_id, label: ta.full_name }));
        return {
            ...item,
            date: dayjs(item.date).format('DD/MM/YYYY'),
            start_time: item.start_time.slice(0, 5),
            end_time: item.end_time.slice(0, 5),
            name: `Buổi ${index + 1}`,
            ta: assistants,
        };
    });

    console.log('1' in [1,2,3])
    const columns = [
        {
            title: 'Công cụ',
            key: 'action',
            render: (record: classesList) => {
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
            render: (record: classesList) => {
                return <span>{`${record.start_time}-${record.end_time}`}</span>;
            },
            width: 120
        },
        {
            title: 'Nội dung',
            key: 'content',
            render: (record: classesList) => {
                    switch(record.type_class) {
                        case "1":
                            return <span>Học chính</span>
                        case "2":
                            return <span>Buổi bổ trợ</span>
                        case "3": 
                            return <span>Kiểm tra</span>
                    }},
            width: 120
        },
        {
            title: 'TA đã được duyệt',
            key: 'assistance',
            render: (record: classesList) => {
                return (
                    record.ta?.map((ta) => (
                        <span key={ta.value}>{ta.label}<br /></span>
                    )) || <span></span>
                );
            },
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note'
        }
    ];


    return (
        <div className="container-road-map">
            {/* <DetailClassHeader></DetailClassHeader> */}
            <div className="main-content-road-map">
                <div className='title-road-list' style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ paddingLeft: "10px", fontWeight: "bold" }}>Lộ trình học</h2>
                    <div className="items" style={{ padding: "15px", marginLeft: "auto" }}>
                        <button className='exportButton'>Xuất Excel</button>
                    </div>
                </div>

                <Table bordered columns={columns} dataSource={sessionsList}></Table>
            </div>
        </div>
    )
}