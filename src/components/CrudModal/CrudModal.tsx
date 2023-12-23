/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { toast } from 'react-toastify'
import salaryApi from '~/apis/salary.api'
import { ModifySalaryConfiguration, PersonSalary } from '~/types/salary.type'

interface Props {
  isOpen: boolean
  onClose: () => void
  item: PersonSalary | null
}

export default function CrudModal({ isOpen, onClose, item }: Props) {
  const [formData, setFormData] = useState<ModifySalaryConfiguration>()
  const queryClient = useQueryClient()
  const tempData: Exclude<ModifySalaryConfiguration, undefined> = {
    user_id: item?.user_id!, // Use the non-null assertion operator
    salary: item?.salary_config || []
  }
  useEffect(() => {
    const updatedFormData: Exclude<ModifySalaryConfiguration, undefined> = {
      user_id: item?.user_id!, // Use the non-null assertion operator
      salary: item?.salary_config || []
    }
    setFormData(updatedFormData)
  }, [item])
  const handlePriceChange = (newPrice: number, index: number) => {
    tempData!.salary[index].payroll_rate = newPrice
    setFormData(tempData)
  }
  const updateSalaryMutation = useMutation({
    mutationFn: () => salaryApi.updateSalary(formData!)
  })
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    updateSalaryMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log(data)
        toast.success('Cập nhật giá trị lương thành công')
        queryClient.invalidateQueries({ queryKey: ['salary'] })
      },
      onError: (error) => {
        console.log(error)
        onClose()
      }
    })
  }
  const modalRoot = document.getElementById('modal-root') as HTMLElement
  return isOpen
    ? ReactDOM.createPortal(
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h2 className='text-center bg-slate-700 text-white mx-0 rounded-lg py-3'>Cấu hình bảng lương</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <div className='grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5'>
                  <div className='sm:col-span-1'>
                    <label htmlFor='name' className='block mb-2 text-sm font-medium  text-black pt-2 pb-1'>
                      Họ và tên
                    </label>
                    <input
                      type='text'
                      name='name'
                      id='name'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 '
                      defaultValue={item?.full_name}
                      placeholder={item?.full_name}
                      readOnly
                    />
                  </div>
                  <div className='sm:col-span-1'>
                    {formData!.salary.map((salary, index) => (
                      <div key={index} className='col-span-full'>
                        <h3 id='brand' className='bg-gray-50  text-gray-900 text-sm rounded-lg block w-full p-2 '>
                          {salary.course_type}
                        </h3>
                        <input
                          type='number'
                          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 mx-auto'
                          // defaultValue={item?.salary[0].price_each}
                          placeholder={String(salary.payroll_rate)}
                          value={salary.payroll_rate}
                          onChange={(e) => {
                            if (formData !== null) handlePriceChange(Number(e.target.value), index)
                          }}
                          required
                        />
                        <br />
                      </div>
                    ))}
                    <div className='flex items-center space-x-4 justify-center w-full sm:col-span-2'>
                      <button
                        type='submit'
                        className='text-black border border-slate-600 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none inline-flex items-center'
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='w-6 h-6 pr-2'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 12.75l6 6 9-13.5' />
                        </svg>
                        Update
                      </button>

                      <button
                        type='button'
                        className='text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                        onClick={onClose}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='w-6 h-6 pr-2'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                        </svg>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>,
        modalRoot
      )
    : null
}
