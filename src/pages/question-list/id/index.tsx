import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { UserNav } from '@/components/user-nav'
import { Link, useParams } from 'react-router-dom'
import Category from './components/category'
import useQuestionId from './hooks/use-question-id'
import { groupQuestionList } from '@/lib/convert/groupQuestionList'
import { levels } from '../data/data'

export default function QuestionId() {
  const { id } = useParams()
  const { questionListInfo, onBackButton } = useQuestionId()
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
          <Card className='p-4'>
            <CardHeader>
              <CardTitle>{id}</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex w-full  flex-row items-center justify-between border-b pb-6'>
                <p className='min-w-[180px]'>Name</p>
                <p>{questionListInfo.name}</p>
              </div>
              <div className='flex w-full flex-row justify-between border-b py-6'>
                <p className='min-w-[180px]'>Level</p>
                <p>
                  {
                    levels.find((item) => item.value === questionListInfo.level)
                      ?.label
                  }
                </p>
              </div>
              <div className='flex flex-col gap-6 border-b py-6'>
                <p>List</p>
                {groupQuestionList(questionListInfo.questionList).map(
                  (item, index) => (
                    <Category
                      categoryIndex={index}
                      categoryName={item.categoryName}
                      questionList={item.questionList}
                    ></Category>
                  )
                )}
              </div>
            </CardContent>
            <CardFooter>
              <div className='flex w-full justify-end gap-4'>
                <Button>
                  <Link to={`/question-list/${id}/edit`}>Edit</Link>
                </Button>
                <Button>Delete</Button>
                <Button onClick={onBackButton}>Back</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  )
}
