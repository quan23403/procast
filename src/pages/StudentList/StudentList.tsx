import { useState } from 'react';
import './StudentList.css'
import Modal from './Components/Modal';
import { DeleteOutlined } from '@ant-design/icons'
import { FormOutlined } from '@ant-design/icons'
import DetailClassHeader from '~/components/DetailClassHeader';
export default function StudentList() {
    const nameHeaderTable = ["#", "Họ và tên", "Ngày sinh", "Giới tính", "Email", "Tình trạng", "Công cụ"];
    const [openModal, setOpenModal] = useState(false)
    return (
        <div className="container-student-list">
            <DetailClassHeader></DetailClassHeader>
            <div className="main-content-student-list">
                <div className='title-student-list' style={{display:"flex", alignItems:"center"}}>
                    <h2 style={{paddingLeft:"10px", fontWeight:"bold"}}>Danh sách sinh viên</h2>
                    <div className="items" style={{ padding: "15px", marginLeft:"auto"}}>
                        <button className='addNewStudent' onClick={() => { setOpenModal(true); }}>Thêm học viên</button>
                        {openModal && <Modal closeModal={setOpenModal} />}
                        <button className='exportButton'>Xuất Excel</button>
                    </div>
                </div>
                <table className="student-table">
                    <thead>
                        <tr>
                            {nameHeaderTable.map((header) => (
                                <th className="header-student-item">
                                    {header}
                                </th>
                            )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                1
                            </td>
                            <td>Hoang Minh Quan</td>
                            <td>23/04/2003</td>
                            <td>Nam</td>
                            <td>2102666@gmail.com</td>
                            <td>Dang theo hoc</td>
                            <td>
                                <div className='change-student-inf-button'>
                                    <FormOutlined style={{ fontSize: '150%' }} />
                                    <DeleteOutlined style={{ fontSize: '150%' }} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}