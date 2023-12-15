/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useMutation } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import salaryApi from '~/apis/salary.api'
import { PersonSalary } from '~/types/salary.type'

interface Props {
  isOpen: boolean
  onClose: () => void
  item: PersonSalary | null
}

export default function CrudModal({ isOpen, onClose, item }: Props) {
  const [formData, setFormData] = useState<PersonSalary | null>(item)
  useEffect(() => {
    setFormData(item)
  }, [item])
  const updatedFormData: Exclude<PersonSalary, undefined> = {
    userId: formData?.userId!,  // Use the non-null assertion operator
    user_name: formData?.user_name || '',  // Provide a default value
    full_name: formData?.full_name || '',  // Provide a default value
    gender: formData?.gender || '',  // Provide a default value
    job_position: formData?.job_position || '',  // Provide a default value
    salary: formData?.salary || [],  // Provide a default value
  }
  const handlePriceChange = (newPrice: number, index: number) => {
    updatedFormData.salary[index].price_each = newPrice
    setFormData(updatedFormData)
  }
  const updateSalaryMutation = useMutation({
    mutationFn: () => salaryApi.updateSalary(formData)
  })
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormData(updatedFormData)
    console.log(formData)
    updateSalaryMutation.mutate(undefined, {
      onSuccess: (data) => {
        console.log(data)
        onClose()
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
                  <div className='sm:col-span-2'>
                    <label htmlFor='name' className='block mb-2 text-sm font-medium  text-black pt-2 pb-1'>
                      Tên học viên
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
                  <div className='w-full'>
                    <label htmlFor='brand' className='block mb-2 text-sm font-medium text-gray-900'>
                      Tên khóa học
                    </label>
                    <h3 id='brand' className='bg-gray-50  text-gray-900 text-sm rounded-lg block w-full p-2'>
                      {item?.salary[0].course_type}
                    </h3>
                  </div>
                  <div className='w-full'>
                    <label htmlFor='price' className='block mb-2 text-sm font-medium text-gray-90'>
                      Giá tiền
                    </label>
                    <input
                      type='number'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                      // defaultValue={item?.salary[0].price_each}
                      placeholder={String(item?.salary[0].price_each)}
                      value={formData?.salary[0].price_each}
                      onChange={(e) => {
                        if (formData !== null) handlePriceChange(Number(e.target.value), 0)
                      }}
                      required
                    />
                  </div>
                  <div className='w-full'>
                    <h3 id='brand' className='  text-gray-900 text-sm rounded-lg block w-full p-2'>
                      {item?.salary[1].course_type}
                    </h3>
                  </div>
                  <div className='w-full'>
                    <input
                      type='number'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                      defaultValue={item?.salary[1].price_each}
                      placeholder={String(item?.salary[1].price_each)}
                      value={formData?.salary[1].price_each}
                      onChange={(e) => {
                        if (formData !== null) handlePriceChange(Number(e.target.value), 1)
                      }}
                      required
                    />
                  </div>
                  <div className='w-full'>
                    <h3 id='brand' className='  text-gray-900 text-sm rounded-lg block w-full p-2'>
                      {item?.salary[2].course_type}
                    </h3>
                  </div>
                  <div className='w-full'>
                    {/* <label htmlFor='price' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                      Price
                    </label> */}
                    <input
                      type='number'
                      className=' border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                      defaultValue={item?.salary[2].price_each}
                      placeholder={String(item?.salary[2].price_each)}
                      value={formData?.salary[2].price_each}
                      onChange={(e) => {
                        if (formData !== null) handlePriceChange(Number(e.target.value), 2)
                      }}
                      required
                    />
                  </div>
                  <div className='w-full'>
                    <h3 id='brand' className=' text-gray-900 text-sm rounded-lg block w-full p-2'>
                      {item?.salary[3].course_type}
                    </h3>
                  </div>
                  <div className='w-full'>
                    <input
                      type='number'
                      className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                      defaultValue={item?.salary[3].price_each}
                      placeholder={String(item?.salary[3].price_each)}
                      value={formData?.salary[3].price_each}
                      onChange={(e) => {
                        if (formData !== null) handlePriceChange(Number(e.target.value), 3)
                      }}
                      required
                    />
                  </div>
                  <div className='flex items-center space-x-4 justify-center w-full col-span-2'>
                    {/* <button
                      type='submit'
                      className='text-black border-black hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                    >
                      Update
                    </button> */}
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
                      Thoát
                    </button>
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
