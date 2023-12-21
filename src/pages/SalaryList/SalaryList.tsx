import { FormOutlined } from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { isUndefined, omitBy } from 'lodash'
import { Fragment, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createSearchParams, useNavigate } from 'react-router-dom'
import salaryApi from '~/apis/salary.api'
import CrudModal from '~/components/CrudModal'
import path from '~/constants/path'
import useCurrentMonthYear from '~/hooks/useCurrentMonthYear'
import useQueryParams from '~/hooks/useQueryParams'
import { PersonSalary, salaryListConfig } from '~/types/salary.type'
import { formatCurrency } from '~/utils/utils'
export default function SalaryList() {
  const initialPersonalSalary: PersonSalary | null = null

  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const [selectedRowData, setSelectedRowData] = useState<PersonSalary | null>(initialPersonalSalary)
  const { currentMonth, currentYear } = useCurrentMonthYear()
  const openModal = (rowData: PersonSalary) => {
    setSelectedRowData(rowData)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedRowData(null)
  }

  const queryParams: salaryListConfig = useQueryParams()
  if (!queryParams.username && !queryParams.month && !queryParams.year) {
    queryParams.username = ''
    queryParams.month = currentMonth.toString()
    queryParams.year = currentYear.toString()
  }
  const queryConfig: salaryListConfig = omitBy(
    {
      username: queryParams.username,
      month: queryParams.month,
      year: queryParams.year
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
        username: data.text || undefined,
        month: data.month,
        year: data.year
      }).toString()
    })
  })

  const handleClear = () => {
    reset({
      text: '',
      month: '',
      year: ''
    }) // This will reset the form's input fields.
    navigate({
      pathname: path.salary,
      search: createSearchParams({
        month: currentMonth,
        year: currentYear
      }).toString()
    })
  }

  const { data } = useQuery({
    queryKey: ['salary', queryConfig],
    queryFn: () => {
      return salaryApi.getSalary(queryConfig)
    }
  })
  console.log(data)
  const courseTypes = Array.from(
    new Set(data?.data.data.flatMap((user) => user.salary_config.map((config) => config.course_type)))
  )
  return (
    <div>
      <form className='max-w-screen-xl flex justify-start py-3 px-3 ' onSubmit={onSubmit} autoComplete='off'>
        <Controller
          name='text'
          control={control}
          render={({ field }) => (
            <input
              type='text'
              placeholder='Từ khóa'
              className='mr-4 w-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
              {...field}
            />
          )}
        />
        <Controller
          name='month'
          control={control}
          render={({ field }) => (
            <input
              type='number'
              placeholder='Tháng'
              className='mr-4 w-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 '
              min={1}
              max={12}
              defaultValue={currentMonth.toString()}
              {...field}
            />
          )}
        />
        <Controller
          name='year'
          control={control}
          render={({ field }) => (
            <input
              type='number'
              placeholder='Năm'
              className='mr-4 w-200 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
              min={1990}
              max={2050}
              defaultValue={currentYear.toString()}
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
              <th className='px-5 border-slate-300 border-2' rowSpan={2}>
                Tổng lương
              </th>
              {courseTypes.map((courseType) => (
                <Fragment key={courseType}>
                  <th className='px-5  border-slate-300 border-2' colSpan={3}>
                    {courseType}
                  </th>
                </Fragment>
              ))}
            </tr>
            <tr>
              {courseTypes.map((courseType) => (
                <Fragment key={courseType}>
                  <th className='px-5  border-slate-300 border-2'>Số giờ dạy</th>
                  <th className='px-5  border-slate-300 border-2'>Giá tiền</th>
                  <th className='px-5  border-slate-300 border-2'>Thành tiền</th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data.data.map((user: PersonSalary, index) => (
                <tr key={index} className='m-0'>
                  <td className=' border-slate-300 border-2 '>{index + 1}</td>
                  <td className=' border-slate-300 border-2'>
                    <button onClick={() => openModal(user)}>
                      <FormOutlined />
                    </button>
                  </td>
                  <td className=' border-slate-300 border-2 '> {user.full_name}</td>
                  <td className=' border-slate-300 border-2'>{user.job_position}</td>
                  <td className=' border-slate-300 border-2'> {user.gender}</td>
                  <td className=' border-slate-300 border-2'>{user.salary.reduce((sum, s) => sum + s.amount, 0)}</td>
                  {courseTypes.map((courseType) => {
                    const userConfig = user.salary_config.find((config) => config.course_type === courseType)
                    const userSalary = user.salary.find((s) => s.payroll_id === userConfig?.payroll_id)
                    const total = userSalary ? userSalary.work_days * userConfig!.payroll_rate : 0

                    return (
                      <Fragment key={courseType}>
                        <td className=' border-slate-300 border-2'>{userSalary ? userSalary.work_days : 'N/A'}</td>
                        <td className=' border-slate-300 border-2'>
                          {userConfig ? formatCurrency(userConfig.payroll_rate) : 'N/A'}
                        </td>
                        <td className=' border-slate-300 border-2'>{userSalary ? formatCurrency(total) : 'N/A'}</td>
                      </Fragment>
                    )
                  })}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <CrudModal isOpen={isModalOpen} onClose={closeModal} item={selectedRowData}></CrudModal>
    </div>
  )
}
