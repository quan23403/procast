export default function SalaryList() {
  return (
    <div>
      <div>
        <div className='max-w-screen-xl flex justify-start py-3 px-3 '>
          <input
            type='text'
            placeholder='Từ khóa'
            className='mr-4 w-400 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          <input
            type='month'
            placeholder='Tháng/Năm'
            className='mr-4 w-200 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {/* <button className=' border-solid	bg-yellow-300 w-12 mr-4 rounded-lg'>Tìm</button> */}
          <button
            type='button'
            className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-1 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-1 dark:focus:ring-yellow-900'
          >
            Tìm
          </button>

          {/* <button className=' border-solid	bg-red-600 w-12 rounded-lg'>Xóa</button> */}
          <button
            type='button'
            className='focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
          >
            Xóa
          </button>
        </div>

        <div className='  shadow-md sm:rounded-lg overflow-x-auto'>
          <table className=' text-center table-auto w-full border-2  overflow-auto '>
            <thead>
              <tr>
                <th className='px-5 border border-slate-300 border-2 ' rowSpan={2}>
                  #
                </th>
                <th className='px-5 border border-slate-300 border-2 ' rowSpan={2}>
                  Công cụ
                </th>
                <th className='px-5 border border-slate-300 border-2' rowSpan={2}>
                  Họ và tên
                </th>

                <th className='px-5 border border-slate-300 border-2' rowSpan={2}>
                  Bộ phận
                </th>
                <th className='px-5 border border-slate-300 border-2' rowSpan={2}>
                  Giới tính
                </th>
                <th className='px-5 border border-slate-300 border-2' colSpan={3}>
                  TA bổ trợ nhóm Basic
                </th>
                <th className='px-5 border border-slate-300 border-2' colSpan={3}>
                  TA bổ trợ nhóm Advanced
                </th>
                <th className='px-5 border border-slate-300 border-2' colSpan={3}>
                  TA bổ trợ nhóm BTCS
                </th>
                <th className='px-5 border border-slate-300 border-2' colSpan={3}>
                  TA bổ trợ không có học viên
                </th>
              </tr>
              <tr>
                <th className='px-5  border-slate-300 border-2'>Số giờ dạy</th>
                <th className='px-5  border-slate-300 border-2'>Giá tiền</th>
                <th className='px-5  border-slate-300 border-2'>Thành tiền</th>
                <th className='px-5  border-slate-300 border-2'>Số giờ dạy</th>
                <th className='px-5  border-slate-300 border-2'>Giá tiền</th>
                <th className='px-5  border-slate-300 border-2'>Thành tiền</th>
                <th className='px-5  border-slate-300 border-2'>Số giờ dạy</th>
                <th className='px-5  border-slate-300 border-2'>Giá tiền</th>
                <th className='px-5  border-slate-300 border-2'>Thành tiền</th>
                <th className='px-5  border-slate-300 border-2'>Số giờ dạy</th>
                <th className='px-5  border-slate-300 border-2'>Giá tiền</th>
                <th className='px-5  border-slate-300 border-2'>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className=' border-slate-300 border-2 sticky'>1</td>
                <td className=' border-slate-300 border-2 sticky'>Không biết</td>
                <td className=' border-slate-300 border-2 sticky'>Tống Đức Minh</td>
                <td className=' border-slate-300 border-2'>TA full-time</td>
                <td className=' border-slate-300 border-2'>Nữ</td>
                <td className=' border-slate-300 border-2'>2</td>
                <td className=' border-slate-300 border-2'>1700000 </td>
                <td className=' border-slate-300 border-2'>340000</td>
                <td className=' border-slate-300 border-2'>1</td>
                <td className=' border-slate-300 border-2'>180000</td>
                <td className=' border-slate-300 border-2'>180000</td>
                <td className=' border-slate-300 border-2'>1</td>
                <td className=' border-slate-300 border-2'>240000</td>
                <td className=' border-slate-300 border-2'>240000</td>
                <td className=' border-slate-300 border-2'>1</td>
                <td className=' border-slate-300 border-2'>50000</td>
                <td className=' border-slate-300 border-2'>50000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
