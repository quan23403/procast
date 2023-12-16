// import { useState } from 'react';
import './StudyRoadMap.css'
export default function StudyRoadMap() {
        const nameHeaderTable = ["Công cụ", "Buổi học", "Ngày", "Ca học", "Môn học", "Giáo viên", "TA đã được duyệt","Ghi chú của giáo viên","Ghi chú của giáo vụ"];
        // const [openModal, setOpenModal] = useState(false)
        return (
            <div className="container-road-map">
                <div className="main-content-road-map">
                    <div className="title-road-map">
                        <div className="btn-right">
                            <h1>Danh sách học viên lớp học</h1>
                        </div>
                        <div className="btn-left">
                            <button className='addNewRoadMap' /*onClick={() => { setOpenModal(true);}}*/>Thêm buổi học</button>
                            {/* // {openModal && < closeModal={setOpenModal}/>} */}
                            <button className='exportButton'>Xuất Excel</button>
                        </div>
                    </div>
                    <table className="road-map-table">
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
                    </table>
                </div>
            </div>
        )
}