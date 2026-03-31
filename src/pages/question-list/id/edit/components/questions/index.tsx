import { Button } from '@/components/custom/button'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { Question } from './data/schema'

type Props = {
  onBackButton: () => void
  onCreateButton: () => void
  questionsData: Question[]
}

export default function QuestionSection({
  onBackButton,
  onCreateButton,
  questionsData,
}: Props) {
  return (
    <div className=' flex-1 overflow-auto pt-2 lg:flex-row'>
      <DataTable data={questionsData} columns={columns} />
      <div className='flex flex-row-reverse gap-2 p-2'>
        <Button type='button' onClick={onBackButton}>
          Back
        </Button>
        <Button type='button' onClick={onCreateButton}>
          Update
        </Button>
      </div>
    </div>
  )
}
