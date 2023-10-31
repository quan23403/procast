export default function HWCheck(props) {
    return (
        <>
            <div className="page-content-title">
                Điểm danh bài tập
            </div>
            <div className="page-content-note">
                <span className="item">Có làm bài tập: 1</span>
                <span className="item">Không làm bài tập: 0</span>
                <span className="item">Không giao bài tập: N</span>
            </div>
            <div className="page-content-wrap">
                <table className="table-attendence">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Họ Tên</th>
                            <th>Ngày sinh</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    )
}