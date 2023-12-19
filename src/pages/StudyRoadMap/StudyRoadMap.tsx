/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from 'react';
// import { useState } from 'react';
import './StudyRoadMap.css'
// import DetailClassHeader from '~/components/DetailClassHeader';
export default function StudyRoadMap() {
    const nameHeaderTable = ["Công cụ", "Buổi học", "Ngày", "Ca học", "Môn học", "Giáo viên", "TA đã được duyệt", "Ghi chú của giáo viên", "Ghi chú của giáo vụ"];
    // const [openModal, setOpenModal] = useState(false)
    return (
        <div className="container-road-map">
            {/* <DetailClassHeader></DetailClassHeader> */}
            <div className="main-content-road-map">
                <div className='title-road-list' style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ paddingLeft: "10px", fontWeight: "bold" }}>Danh sách sinh viên</h2>
                    <div className="items" style={{ padding: "15px", marginLeft: "auto" }}>
                        <button className='addNewStudent' /*onClick={() => { setOpenModal(true); }}*/>Thêm buổi học</button>
                        {/* {openModal && <Modal closeModal={setOpenModal} />} */}
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