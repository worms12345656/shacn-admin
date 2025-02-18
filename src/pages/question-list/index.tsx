import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { questionList } from './data/question'
import { QuestionList } from './data/schema'
import { HTTPResponse } from '@/lib/utils'
import { useLoaderData } from 'react-router-dom'
import { getQuestionList } from '@/services/question-list'

export default function QuestionList() {
  const data = useLoaderData() as HTTPResponse<QuestionList[]>

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Question List</h2>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={data.data} columns={columns} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
