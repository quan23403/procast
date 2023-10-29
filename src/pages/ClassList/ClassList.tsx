import './ClassList.css';
import { useState } from 'react';
import Dropdown from './Dropdown';
import { color } from 'framer-motion';

export default function ClassList() {
    const nameLabelSeacrch = ["Ngày khai giảng","Giáo Viên","- Ca học -","- Trạng thái lớp học -","Cơ sở"];
    const options = ["Ngày khai giảng", "Ngày kết thúc", "Ngày tạo"];
    const options1=["Dương Văn Tuyền", "Bùi Xuân Huấn", "Nguyễn Cow Thank", "Ngô Bá Khá"];
    const options2=["09:00-11:00","13:45-15:45","14:00-16:30","15:00-17:00","15:45-17:45","16:00-18:00","18:00-20:00","18:30-20:30","19:00-21:00","20:15-22:15"];
    const options3=["Canceled when waiting","Waiting","Closed","On-going","Canceled when ongoing"];
    const options4=["P409 H6 Star-Lake", "Linh Đàm", "OceanPark"]
    const [selected, setSelected] = useState(nameLabelSeacrch[0]);
    const [selected1, setSelected1] = useState(nameLabelSeacrch[1]);
    const [selected2, setSelected2] = useState(nameLabelSeacrch[2]);
    const [selected3, setSelected3] = useState(nameLabelSeacrch[3]);
    const [selected4, setSelected4] = useState(nameLabelSeacrch[4]);

    return (
        <div>
            <div className="main-content">
                <div className="page-control">
                    <div className="pull-left title">
                        Lớp học
                    </div>
                    <div className="title pull-right">
                        <button className="yellow-btn">Thêm mới</button>
                        <button className="purple-btn">Xuất Excel</button>
                    </div>
                </div>
                <div className='page-search'>
                    <div className='container-search-element'>
                        <input type='text' placeholder='Từ khóa' className='search-element'></input>
                    </div>
                    <div className='container-search-element'>
                        <label>Từ Ngày</label>
                        <input type='date' className='search-element'></input>
                    </div>
                    <div className='container-search-element'>
                        <label>Đến ngày</label>
                        <input type='date' className='search-element'></input>
                    </div>
                    <div className='container-search-element'>
                        <Dropdown selected={selected} setSelected={setSelected} options={options} />
                    </div>
                    <div className='container-search-element'>
                        <Dropdown selected={selected1} setSelected={setSelected1} options={options1} />
                    </div>
                    <div className='container-search-element'>
                        <Dropdown selected={selected2} setSelected={setSelected2} options={options2} />
                    </div>
                    <div className='container-search-element'>
                        <Dropdown selected={selected3} setSelected={setSelected3} options={options3} />
                    </div>
                    <div className='container-search-element'>
                        <Dropdown selected={selected4} setSelected={setSelected4} options={options4} />
                    </div>
                </div>
                <div className='page-content'>
                    <div className='table-content'>
                        <table className='table-checkbox'>
                            <thead>
                                <tr>
                                    <th>
                                        <input type='checkbox'></input>
                                    </th>
                                    <th>
                                        #
                                    </th>
                                    <th>Mã lớp </th>
                                    <th>Tên lớp học</th>
                                    <th>Giáo viên</th>
                                    <th>Phòng học</th>
                                    <th>Ngày khai giảng</th>
                                    <th>Ngày kết thúc</th>
                                    <th>Ca dạy</th>
                                    <th>Tình trạng lớp học</th>
                                    <th>Số buổi học</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input type='checkbox'></input></td>
                                    <td>1</td>
                                    <td>HN - PS WAITING ( Lớp Online ) (23/30)</td>
                                    <td>PS-ONLINE</td>
                                    <td>Phòng 102 59VVD	</td>
                                    <td>18/03/2030</td>
                                    <td>20:15 - 22:15</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}