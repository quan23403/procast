import { useQuery } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'

import { Fragment, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import salaryApi from '~/apis/salary.api'
import CrudModal from '~/components/CrudModal'
import path from '~/constants/path'
import useQueryParams from '~/hooks/useQueryParams'
import { PersonSalary, salaryListConfig } from '~/types/salary.type'
import { formatCurrency } from '~/utils/utils'

export default function SalaryList() {
  const initialPersonalSalary: PersonSalary | null = null

  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const [selectedRowData, setSelectedRowData] = useState<PersonSalary | null>(initialPersonalSalary)

  const openModal = (rowData: PersonSalary) => {
    setSelectedRowData(rowData)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedRowData(null)
  }

  const queryParams: salaryListConfig = useQueryParams()
  const queryConfig: salaryListConfig = omitBy(
    {
      user: queryParams.user,
      name: queryParams.name,
      date: queryParams.date
    },
    isUndefined
  )
  const { handleSubmit, control, reset } = useForm()
  const navigate = useNavigate()
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.salary,
      search: createSearchParams({
        ...queryConfig,
        name: data.text,
        date: data.month
      }).toString()
    })
  })
  const handleClear = () => {
    reset({
      text: '',
      month: ''
    }) // This will reset the form's input fields.
    navigate({
      pathname: path.salary
    })
  }

  const { data } = useQuery({
    queryKey: ['salary', queryConfig],
    queryFn: () => {
      console.log(queryConfig)
      return salaryApi.getSalary(queryConfig)
    }
  })

  return (
    <div>
      <form className='max-w-screen-xl flex justify-start py-3 px-3 ' onSubmit={onSubmit}>
        <Controller
          name='text'
          control={control}
          render={({ field }) => (
            <input
              type='text'
              placeholder='Từ khóa'
              className='mr-4 w-400 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...field}
            />
          )}
        />
        <Controller
          name='month'
          control={control}
          render={({ field }) => (
            <input
              type='month'
              placeholder='Tháng/Năm'
              className='mr-4 w-200 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              {...field}
            />
          )}
        />
        {/* <button className=' border-solid	bg-yellow-300 w-12 mr-4 rounded-lg'>Tìm</button> */}
        <button
          type='submit'
          className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-1 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-1 dark:focus:ring-yellow-900'
        >
          Tìm
        </button>

        {/* <button className=' border-solid	bg-red-600 w-12 rounded-lg'>Xóa</button> */}
        <button
          type='button'
          className='focus:outline-none text-white bg-red-600 hover:bg-red-800 focus:ring-1 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
          onClick={handleClear}
        >
          Xóa
        </button>
      </form>

      <div className='  shadow-md sm:rounded-lg overflow-x-auto'>
        <table className=' text-center table-auto w-full border-2  overflow-auto '>
          <thead>
            <tr>
              <th className='px-5  border-slate-300 border-2 ' rowSpan={2}>
                #
              </th>
              <th className='px-5  border-slate-300 border-2 ' rowSpan={2}>
                Công cụ
              </th>
              <th className='px-5 border-slate-300 border-2' rowSpan={2}>
                Họ và tên
              </th>

              <th className='px-5  border-slate-300 border-2' rowSpan={2}>
                Bộ phận
              </th>
              <th className='px-5 border-slate-300 border-2' rowSpan={2}>
                Giới tính
              </th>
              <th className='px-5  border-slate-300 border-2' colSpan={3}>
                TA bổ trợ nhóm Basic
              </th>
              <th className='px-5  border-slate-300 border-2' colSpan={3}>
                TA bổ trợ nhóm Advanced
              </th>
              <th className='px-5 border-slate-300 border-2' colSpan={3}>
                TA bổ trợ nhóm BTCS
              </th>
              <th className='px-5 border-slate-300 border-2' colSpan={3}>
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
            {data &&
              data.data.data?.salaryList.map((salaryList) => (
                <tr key={salaryList.userId} className='m-0'>
                  <td className=' border-slate-300 border-2 '>{salaryList.userId}</td>
                  <td className=' border-slate-300 border-2'>
                    <button onClick={() => openModal(salaryList)}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={24}
                        height={24}
                        viewBox='0 0 24 24'
                        style={{ fill: 'rgba(0, 0, 0, 1)', transform: '' }}
                      >
                        <path d='M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z' />
                        <path d='m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z' />
                      </svg>
                    </button>
                  </td>
                  <td className=' border-slate-300 border-2 '>{salaryList.fullName}</td>
                  <td className=' border-slate-300 border-2'>{salaryList.jobPosition}</td>
                  <td className=' border-slate-300 border-2'>{salaryList.gender}</td>
                  {salaryList.salary.map((salary, index) => (
                    <Fragment key={index}>
                      <td className=' border-slate-300 border-2'>{salary.work_dates}</td>
                      <td className=' border-slate-300 border-2'>{formatCurrency(salary.price_each)} </td>
                      <td className=' border-slate-300 border-2'>{formatCurrency(salary.amount)}</td>
                    </Fragment>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <CrudModal isOpen={isModalOpen} onClose={closeModal} item={selectedRowData}></CrudModal>
    </div>
  )
}
