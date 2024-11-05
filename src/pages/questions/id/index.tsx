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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UserNav } from '@/components/user-nav'
import { useParams } from 'react-router-dom'
import useQuestionId from './hooks/use-question-id'

export default function QuestionId() {
  const { id } = useParams()
  const { isEdit, onClickEdit, onClickSave, register, setValue, onBackButton } =
    useQuestionId()
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
            <h2 className='text-2xl font-bold tracking-tight'>Questions</h2>
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
                <p className='w-[180px]'>Name</p>
                {isEdit ? (
                  <Input {...register('name')}></Input>
                ) : (
                  <p>Call Stack in JS</p>
                )}
              </div>
              <div className='flex w-full flex-row justify-between border-b py-6'>
                <p className='w-[180px]'>Category</p>
                {isEdit ? (
                  <Input {...register('category')}></Input>
                ) : (
                  <p>Front End</p>
                )}
              </div>
              <div className='flex w-full flex-row justify-between border-b py-6'>
                <p className='w-[180px]'>Level</p>
                {isEdit ? <Input {...register('level')}></Input> : <p>Basic</p>}
              </div>
              <div className='flex w-full flex-row justify-between border-b py-6'>
                <p className='w-[180px]'>Hint</p>
                {isEdit ? (
                  <Textarea
                    {...register('hint')}
                    // onChange={(e) =>
                    //   setValue('hint', e.target.value.split('\n'))
                    // }
                  ></Textarea>
                ) : (
                  <div>
                    <p>It's a single threaded. Mean it can only do 1 time</p>
                    <p>Code execution is synchronous</p>
                    <p>
                      Function create stack frame that occupies a temporary
                      memory
                    </p>
                    <p>It's work as LIFO - last in first out</p>
                  </div>
                )}
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
