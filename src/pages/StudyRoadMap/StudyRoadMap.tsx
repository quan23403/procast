/* eslint-disable @typescript-eslint/no-unused-vars */
import { classesList } from '~/types/classLists.type';
import './StudyRoadMap.css'
import { Checkbox, Table } from 'antd';
import EditModal from './EditModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { omitBy, isUndefined } from 'lodash';
import { useParams } from 'react-router-dom';
import classDetailApi from '~/apis/classDetail.api';
import dayjs from 'dayjs';
import employeeApi from '~/apis/employee.api';
import { employeeType } from '../EmployeeList/EmployeeList';
import { AlignType} from 'rc-table/lib/interface';
import AssistantCheckin from './AssistantCheckin';
import { useState } from 'react';


// import DetailClassHeader from '~/components/DetailClassHeader';
export default function StudyRoadMap() {
    const { id } = useParams()
    const queryClient = useQueryClient();
    const [isTeacherCheckin, setIsTeacherCheckin] = useState<boolean>(false)
    const [classToCheckin, setClassToCheckin] = useState<number>(0)
    const queryConfig = omitBy(
        {
            courseId: id
        },
        isUndefined
    )
    const { data: sessionsData } = useQuery({
        queryKey: ['sessionData', queryConfig],
        queryFn: () => {
            return classDetailApi.getSessionList(queryConfig)
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
    const { data: teacherdata } = useQuery({
        queryKey: ['employee', 'Teacher'],
        queryFn: () => {
            return employeeApi.getEmployees({ job_position: 'Teacher' })
        }
    })
    const {data: courseData} = useQuery({
        queryKey: ['courseData', queryConfig],
        queryFn: () => {
            const NewqueryConfig = omitBy(
                {
                    classId: id
                },
                isUndefined
            )
            return classDetailApi.getClassDetail(NewqueryConfig)
        }
    })
    const teacherInfo = (teacherdata?.data?.data || []).find((item: employeeType) => (item.user_name === courseData?.data.data.main_teacher));

    const checkinTeacher = useMutation({
        mutationKey: ['updateCheckin'], // Specify the mutation key here
        mutationFn: () => {
            return employeeApi.updateCheckin({
                course_id: id || "",
                class_id: classToCheckin,
                course_type_id: sessionsData?.data?.data?.find((item: classesList) => (item.class_id === classToCheckin))?.type_class||"1",
                user_id: teacherInfo?.user_id,
            });
        },
    });
    const updateCheckin = (class_id: number) => {
        setClassToCheckin(class_id)
        checkinTeacher.mutate(undefined, {
            onSuccess: () => {
                queryClient.invalidateQueries(['checkinData', { courseId: id }]);
                setIsTeacherCheckin(true)
            },
            onError: () => {
                setIsTeacherCheckin(false)
            }
        });
    }


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

    console.log(sessionsList.find((item)=> item.date === dayjs().format('DD/MM/YYYY')))
    
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
            title: "Giảng viên",
            key: "teacher",
            render: (record: classesList) => {
                const checkin = (checkinData?.data.data || []).find((item) => item.userId === teacherInfo?.user_id && dayjs(item.checkInTime).add(7, 'hour').format('DD/MM/YYYY') === record.date);
                const date = dayjs(`${record.date} ${record.start_time}`, 'DD/MM/YYYY HH:mm')
                const checkinTime = dayjs(checkin?.checkInTime).add(7, 'hour').format('DD/MM/YYYY HH:mm:ss')
                return <span><span style={{marginRight: "8px"}}>{teacherInfo?.full_name}</span>
                {checkin ? 
                <small><br/>Đã checkin tại {checkinTime}</small>
            : (dayjs(date).diff(dayjs(), 'minute') >= -30 
            && dayjs(date).diff(dayjs(), 'minute') <= 30
            &&(<Checkbox
            disabled={isTeacherCheckin}
            onChange={() => updateCheckin(record.class_id)}
            > Check-in</Checkbox>))}
                </span>;
                                  
            }
        },
        {
            title: 'TA đã được duyệt',
            key: 'assistance',
            render: (record: classesList) => {
                return (
                    <AssistantCheckin record={ record} checkin= {checkinData?.data.data||[]}></AssistantCheckin>
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