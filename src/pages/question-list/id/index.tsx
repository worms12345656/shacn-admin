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
import { useParams } from 'react-router-dom'
import Category from './components/category'
import { questionList } from './data/data'
import useQuestionId from './hooks/use-question-id'

export default function QuestionId() {
  const { id } = useParams()
  const { isEdit, onClickEdit, onClickSave, onBackButton } = useQuestionId()
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
                {isEdit ? (
                  // <Input {...register('name')}></Input>
                  <></>
                ) : (
                  <p>Tung</p>
                )}
              </div>
              <div className='flex w-full flex-row justify-between border-b py-6'>
                <p className='min-w-[180px]'>Level</p>
                {isEdit ? (
                  // <Input {...register('level')}></Input>
                  <></>
                ) : (
                  // <p>{getValues('level')}</p>
                  <p>Basic</p>
                )}
              </div>
              <div className='flex flex-col gap-6 border-b py-6'>
                <p>List</p>
                {questionList.list.map((item, index) => (
                  <Category
                    categoryIndex={index}
                    categoryName={item.categoryName}
                    questionList={item.questionList}
                  ></Category>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <div className='flex w-full justify-end gap-4'>
                {isEdit ? (
                  <Button onClick={onClickSave}>Save</Button>
                ) : (
                  <Button onClick={onClickEdit}>Edit</Button>
                )}
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
