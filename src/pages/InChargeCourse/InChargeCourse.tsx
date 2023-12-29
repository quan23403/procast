import { useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import type { InputRef } from 'antd'
import { Button, Input, Space, Table } from 'antd'
import type { ColumnType, ColumnsType } from 'antd/es/table'
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { getMyCourse } from '~/apis/englishClass.api'
import { useQuery } from '@tanstack/react-query'

interface DataType {
  key: string
  course_id: string
  course_name: string
  room: string
  end_date: string
  location: string
}
interface InChargeCourse {
  course_id: string
  course_name: string
  room: string
  start_date: string
  end_date: string
  study_days: string
  location: string
}
type DataIndex = keyof DataType

export default function InChargeCourse() {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const tableData: DataType[] = []
  const searchInput = useRef<InputRef>(null)
  const { data } = useQuery(['my-course'], () => getMyCourse())
  data?.data.data.map((classes: InChargeCourse, index: number) =>
    tableData.push({
      key: (index + 1).toString(),
      course_id: classes.course_id,
      course_name: classes.course_name,
      room: classes.room,
      end_date: classes.end_date,
      location: classes.location
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
            close
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
      title: 'ID khóa học',
      dataIndex: 'course_id',
      key: 'course_id',
      width: '10%',
      ...getColumnSearchProps('course_id')
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'course_name',
      key: 'course_name',
      width: '20%',
      ...getColumnSearchProps('course_name')
    },
    {
      title: 'Phòng',
      dataIndex: 'room',
      key: 'room',
      ...getColumnSearchProps('room')
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'end_date',
      key: 'end_date',
      ...getColumnSearchProps('end_date')
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location',
      ...getColumnSearchProps('location')
    }
  ]

  return (
    <div className='container-employee-list font-style: normal not-italic subpixel-antialiased'>
      <div className='title-list' style={{ padding: '20px', backgroundColor: 'white', fontSize: '20px' }}>
        <h1>Danh sách khóa học của tôi</h1>
      </div>
      <div className='container-main-content' style={{ backgroundColor: '#E3E3E3', padding: '20px' }}>
        <div className='maint-content' style={{ backgroundColor: 'white', padding: '10px' }}>
          <Table columns={columns} dataSource={tableData} />
        </div>
      </div>
    </div>
  )
}
