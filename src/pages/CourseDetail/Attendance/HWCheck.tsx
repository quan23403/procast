export default function HWCheck(props: any) {
  const headerHWCheck = ["#","Họ Tên", "Ngày sinh"]
  return (
    <>
      <div className='page-content-title'>Điểm danh bài tập</div>
      <div className='page-content-note'>
        <span className='item'>Có làm bài tập: 1</span>
        <span className='item'>Không làm bài tập: 0</span>
        <span className='item'>Không giao bài tập: N</span>
      </div>
      <div className='page-content-wrap' style={{overflowX:"auto"}}>
        <table className='table-attendence' style={{width:"100%"}}>
          <thead>
            <tr>
              {headerHWCheck.map((header) => (
                <th style={{ border: "solid 1px #ddd",fontWeight:"normal"}}>{header}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
    </>
  )
}
