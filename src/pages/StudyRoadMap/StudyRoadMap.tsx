/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react';
// import { useState } from 'react';
import { classesList } from '~/types/classLists.type';
import './StudyRoadMap.css'
import { Table } from 'antd';
import EditModal from './EditModal';
import { useQuery } from '@tanstack/react-query';
import { omitBy, isUndefined } from 'lodash';
import { useParams } from 'react-router-dom';
import classDetailApi from '~/apis/classDetail.api';
import dayjs from 'dayjs';

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

    const sessionsList: classesList[] = (sessionsData?.data?.data || []).map((item, index) => ({
        ...item,
        date: dayjs(item.date).format('DD/MM/YYYY'),
        start_time: item.start_time.slice(0, 5),
        end_time: item.end_time.slice(0, 5),
        name: `Buổi ${index + 1}`
    }));
    
    const columns = [
        {
          title: 'Công cụ',
          key: 'action',
          render: (record: classesList) => {
            return <EditModal record={record}></EditModal>;
          },
          width: 120
        },
        {
          title: '#',
          dataIndex: 'class_id',
          key: 'id',
          width: 40,
        },
        {
          title: 'Buổi học',
          dataIndex: 'name',
          key: 'class',
        },
        {
          title: 'Ngày',
          dataIndex: 'date',
          key: 'date',
        },
        {
            title: 'Phòng học',
            dataIndex: 'room',
            key: 'room'
        },
        {
          title: 'Ca học',
          key: 'shift',
          render: (record: classesList) => {
            return <span>{`${record.start_time}-${record.end_time}`}</span>;
          },
        },
        {
          title: 'TA đã được duyệt',
          key: 'assistance',
          render: (record: classesList) => {
            return (
              record.assistant?.map((ta) => (
                <span key={ta}>{ta}<br /></span>
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

                <Table columns={columns} dataSource={sessionsList}></Table>
            </div>
        </div>
    )
}