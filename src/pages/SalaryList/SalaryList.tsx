import React from 'react'

export default function SalaryList() {
  return (
  <div>
    <div>
      <h1>Bảng lương TA</h1>
      <div>
        <table className="border-separate">
          <input
            type='text'
            placeholder='Từ Khóa'
            className='mr-4 table-cell w-300 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <input 
            type='month'
            placeholder='Thời gian'
            className='mr-4 table-cell w-150 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <button className='table-cell border-solid	bg-yellow-300 w-12 mr-4 rounded-lg' >Tìm</button>
          <button className='table-cell border-solid	bg-red-600 w-12 rounded-lg'>Xóa</button>
        </table>
      </div>
      <div className='overflow-x-auto'>
        <table className=' text-center table-auto w-full min-w-max' >
          <thead>
            <tr >
    
              <th className='px-5 border border-slate-300 border-2' rowSpan={2}>#</th>
              <th className='px-5 border border-slate-300 border-2' rowSpan={2}>Công cụ</th>
              <th className='px-5 border border-slate-300 border-2' rowSpan={2}>Họ và tên</th>
              
              <th className='px-5 border border-slate-300 border-2' rowSpan={2}>Bộ phận</th>
              <th className='px-5 border border-slate-300 border-2' rowSpan={2}>Giới tính</th>
              <th className='px-5 border border-slate-300 border-2' colSpan={3}>TA bổ trợ nhóm Basic</th>
              <th className='px-5 border border-slate-300 border-2' colSpan={3}>TA bổ trợ nhóm Advanced</th>
              <th className='px-5 border border-slate-300 border-2' colSpan={3}>TA bổ trợ nhóm BTCS</th>
              <th className='px-5 border border-slate-300 border-2' colSpan={3}>TA bổ trợ không có học viên</th>

            </tr>
            <tr>
              <th className='px-5 border border-slate-300 border-2'>Số giờ dạy</th>
              <th className='px-5 border border-slate-300 border-2'>Giá tiền</th>
              <th className='px-5 border border-slate-300 border-2'>Thành tiền</th>
              <th className='px-5 border border-slate-300 border-2'>Số giờ dạy</th>
              <th className='px-5 border border-slate-300 border-2'>Giá tiền</th>
              <th className='px-5 border border-slate-300 border-2'>Thành tiền</th>
              <th className='px-5 border border-slate-300 border-2'>Số giờ dạy</th>
              <th className='px-5 border border-slate-300 border-2'>Giá tiền</th>
              <th className='px-5 border border-slate-300 border-2'>Thành tiền</th>
              <th className='px-5 border border-slate-300 border-2'>Số giờ dạy</th>
              <th className='px-5 border border-slate-300 border-2'>Giá tiền</th>
              <th className='px-5 border border-slate-300 border-2'>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border border-slate-300 border-2'>1</td>
              <td className='border border-slate-300 border-2'>Không biết</td>
              <td className='border border-slate-300 border-2'>
                Tống Đức Minh
              </td>
              <td className='border border-slate-300 border-2'>TA full-time</td>
              <td className='border border-slate-300 border-2'>Nữ</td>
              <td className='border border-slate-300 border-2'>2</td>
              <td className='border border-slate-300 border-2'>1700000</td>
              <td className='border border-slate-300 border-2'>340000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  )
}
