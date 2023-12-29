import { Button, DatePicker, Form, Input, Modal, Select, Space, Table } from 'antd'
import type { InputRef } from 'antd'
import employeeApi, { employeeConfig } from '~/apis/employee.api'
import useQueryParams from '~/hooks/useQueryParams'
import { isUndefined, omitBy } from 'lodash'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createSearchParams, useNavigate } from 'react-router-dom'
import path from '~/constants/path'
import { useLayoutEffect, useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import { FilterConfirmProps } from 'antd/es/table/interface'
import type { ColumnType, ColumnsType } from 'antd/es/table'

import { toast } from 'react-toastify'
import dayjs from 'dayjs'

export interface employeeType {
  user_id: string
  user_name: string
  dob: string
  email: string
  job_position: string
  role: string
  start_date: string
  password: string
  full_name: string
  gender: string
}
export interface addEmployeeType {
  email: string
  user_name: string
  dob: string
  gender: string
  fullName: string
  job_position: string
}
interface DataType {
  key: string
  user_name: string
  dob: string
  gender: string
  email: string
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}

const { Option } = Select
type DataIndex = keyof DataType
// eslint-disable-next-line react-refresh/only-export-components
export default function () {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [jobPosition, setJobPosition] = useState<string>('')
  const [form] = Form.useForm()
  const tableData: DataType[] = []
  const searchInput = useRef<InputRef>(null)
  const queryParams: employeeConfig = useQueryParams()
  const queryClient = useQueryClient()
  const [active, setActive] = useState<boolean>(true)
  useLayoutEffect(() => {
    if (queryParams.job_position !== 'Teacher') {
      setActive(false)
      setJobPosition('TA')
    } else {
      setActive(true)
      setJobPosition('Teacher')
    }
  }, [queryParams])
  const handleConfirmCancel = () => {
    setOpenModal(false)
  }
  const navigate = useNavigate()
  const queryConfig: employeeConfig = omitBy(
    {
      job_position: queryParams.job_position
    },
    isUndefined
  )
  const { data } = useQuery({
    queryKey: ['employee', queryConfig],
    queryFn: () => {
      return employeeApi.getEmployees(queryConfig)
    }
  })

  data?.data.data.map((employee: employeeType, index: number) =>
    tableData.push({
      key: (index + 1).toString(),
      user_name: employee.full_name,
      dob: employee.dob,
      gender: employee.gender,
      email: employee.email
    })
  )
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size='small' style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })

  const columns: ColumnsType<DataType> = [
    {
      title: 'Họ và tên',
      dataIndex: 'user_name',
      key: 'user_name',
      width: '20%',
      ...getColumnSearchProps('user_name')
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
      width: '20%'
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      ...getColumnSearchProps('gender')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email')
    }
  ]
  const addEmployeeMutation = useMutation({
    mutationFn: (body: addEmployeeType) => employeeApi.addEmployee(body)
  })
  const handleOk = () => {
    const formValues = form.getFieldsValue()
    form.resetFields()
    addEmployeeMutation.mutate(formValues, {
      onSuccess: (data) => {
        toast.success('Thêm thành công!')
        queryClient.invalidateQueries({ queryKey: ['employee'] })
        navigate({ pathname: path.classList })
        form.resetFields()
        setOpenModal(false)
        console.log(data)
      },
      onError: (error) => {
        toast.error('error')
        console.log(error)
      }
    })
    setOpenModal(false)
  }

  return (
    <div className='container-employee-list font-style: normal not-italic subpixel-antialiased'>
      <div className='title-list' style={{ padding: '20px', backgroundColor: 'white', fontSize: '20px' }}>
        <h1>Danh sách nhân viên</h1>
      </div>
      <div className='container-main-content' style={{ backgroundColor: '#E3E3E3', padding: '20px' }}>
        <div className='maint-content' style={{ backgroundColor: 'white', padding: '10px' }}>
          <div className='option-employee-list' style={{ marginBottom: '10px' }}>
            <Button
              className={`bg-gray-200 ${active ? 'text-blue-500 border-blue-500' : ''} border-2`}
              style={{ backgroundColor: '#E4E4E4', marginRight: '15px' }}
              onClick={() => {
                navigate({
                  pathname: path.employeeList,
                  search: createSearchParams({
                    job_position: 'Teacher'
                  }).toString()
                })
              }}
            >
              Danh sách giáo viên
            </Button>
            <Button
              style={{ backgroundColor: '#E4E4E4' }}
              className={`bg-gray-200 ${!active ? 'text-blue-500 border-blue-500' : ''} border-2`}
              onClick={() => {
                navigate({
                  pathname: path.employeeList,
                  search: createSearchParams({
                    job_position: 'TA'
                  }).toString()
                })
              }}
            >
              Danh sách TA
            </Button>{' '}
            <button
              className='addNewStudent ml-4'
              onClick={() => {
                setOpenModal(true)
                if (queryParams.job_position === 'TA') {
                  setJobPosition('TA')
                } else setJobPosition('Teacher')
              }}
            >
              Thêm {queryParams.job_position}
            </button>
          </div>
          <div className='employee-list'>
            <Table columns={columns} dataSource={tableData} />
            <Modal
              open={openModal}
              title='Form thêm nhân sự'
              onOk={handleOk}
              onCancel={handleConfirmCancel}
              footer={(_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn />
                </>
              )}
            >
              <div className='flex justify-center'>
                <Form
                  form={form}
                  {...formItemLayout}
                  name='addEmployee'
                  style={{ maxWidth: 600 }}
                  scrollToFirstError
                  rootClassName='pt-4 w-3/4'
                >
                  <Form.Item
                    name='email'
                    label='E-mail'
                    rules={[
                      {
                        type: 'email',
                        message: 'E-mail không hợp lệ!'
                      },
                      {
                        required: true,
                        message: 'Vui lòng điền E-mail!'
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name='user_name'
                    label='Username'
                    tooltip='username của bạn là gì?'
                    rules={[{ required: true, message: 'Hãy điền username!', whitespace: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label='Ngày sinh'
                    name='dob'
                    getValueFromEvent={(_, dateString) => dateString}
                    getValueProps={(value) => ({ value: value ? dayjs(value) : undefined })}
                    rules={[{ required: true, message: 'Hãy điền ngày tháng năm sinh của bạn' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    name='gender'
                    label='Giới tính'
                    rules={[{ required: true, message: 'Hãy chọn giới tính!' }]}
                    initialValue={'Male'}
                  >
                    <Select placeholder='Hãy chọn giới tính'>
                      <Option value='male'>Male</Option>
                      <Option value='female'>Female</Option>
                      <Option value='other'>Other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name='fullName'
                    label='Họ và tên:'
                    tooltip='Tên đầy đủ của bạn là gì?'
                    rules={[{ required: true, message: 'Hãy điền họ và tên đầy đủ!', whitespace: true }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name='job_Position'
                    label='Vị trí làm việc:'
                    tooltip='Tên đầy đủ của bạn là gì?'
                    rules={[{ required: true, message: '', whitespace: true }]}
                    className='hidden'
                    initialValue={jobPosition}
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  )
}
