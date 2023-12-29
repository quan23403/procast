import { useState } from 'react'
import { ProfileOutlined, SafetyOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import path from '~/constants/path'
export default function UserSideNav() {
  const items: MenuProps['items'] = [
    {
      label: <Link to={path.profile}>Profile</Link>,
      key: 'profile',
      icon: <ProfileOutlined />
    },
    {
      label: <Link to={path.changePassword}>Thay đổi mật khẩu</Link>,
      key: 'changePassword',
      icon: <SafetyOutlined />
    }
  ]
  const [current, setCurrent] = useState('profile')

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
  }
  return <Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' items={items} rootClassName='mx-auto' />
}
