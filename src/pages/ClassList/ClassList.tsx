import './ClassList.css';
export default function ClassList() {
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
                    <input type='text' placeholder='Từ khóa' className='search-element'></input>
                    <div>
                        <label>Từ Ngày</label>
                        <input type='date' className='search-element'></input>
                    </div>
                    <div>
                        <label>Đến ngày</label>
                        <input type='date' className='search-element'></input>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}