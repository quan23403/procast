import { useState } from 'react';
import './StudentList.css'
import Modal from './Components/Modal';
export default function StudentList() {
    const nameHeaderTable = ["#", "Họ và tên", "Ngày sinh", "Giới tính", "Email", "Tình trạng", "Công cụ"];
    const [openModal, setOpenModal] = useState(false)
    return (
        <div className="container-student-list">
            <div className="main-content-student-list">
                <div className="title-student-list">
                    <div className="btn-right">
                        <h1>Danh sách học viên lớp học</h1>
                    </div>
                    <div className="btn-left">
                        <button className='addNewStudent' onClick={() => { setOpenModal(true);}}>Thêm học viên</button>
                        {openModal && <Modal closeModal={setOpenModal}/>}
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
                            <td>Chinh sua</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}