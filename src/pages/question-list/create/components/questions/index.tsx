import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { HTTPResponse } from '@/lib/utils'
import { useLoaderData } from 'react-router-dom'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { Question } from './data/schema'
import { questions } from './data/question'
import { Button } from '@/components/custom/button'

type Props = {
  onBackButton: () => void
  onCreateButton: () => void
  questionsData: HTTPResponse<Question[]>
}

export default function QuestionSection({
  onBackButton,
  onCreateButton,
  questionsData,
}: Props) {
  return (
    <div className=' flex-1 overflow-auto pt-2 lg:flex-row'>
      <DataTable data={questionsData.data} columns={columns} />
      <div className='flex flex-row-reverse gap-2 p-2'>
        <Button type='button' onClick={onBackButton}>
          Back
        </Button>
        <Button type='button' onClick={onCreateButton}>
          Create
        </Button>
      </div>
    </div>
  )
}
