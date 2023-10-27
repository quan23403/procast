import MainHeader from '~/components/MainHeader'
import TestHeader from '~/components/TestHeader'

interface Props {
  children?: React.ReactNode
}
export default function MainLayout({ children }: Props) {
  return (
    <div>
      <MainHeader />
      {/* <TestHeader /> */}
      {children}
    </div>
  )
}
