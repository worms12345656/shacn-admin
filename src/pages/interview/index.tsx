import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { Input } from '@/components/ui/input'
import { UserNav } from '@/components/user-nav'
import { FormProvider } from 'react-hook-form'
import Category from './components/category'
import Note from './components/note'
import QuestionList from './components/question-list'
import { data } from './data/data'
import useInterviewForm from './hooks/use-interview-form'

export default function Interview() {
  const { control, method, register, setValue, onSubmit } = useInterviewForm()
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <FormProvider {...method}>
          <form onSubmit={onSubmit}>
            <div className='sticky mb-4 flex items-center justify-between'>
              <Input
                className='w-1/3'
                placeholder='Candidate name'
                {...register('candidateName')}
              ></Input>
              <div className='flex items-center gap-2'>
                <QuestionList />
                <Note />
                <div className='flex flex-row overflow-hidden rounded-md'>
                  <Button
                    type='button'
                    className='rounded-none bg-red-600'
                    onClick={() => setValue('isPass', false)}
                  >
                    Fail
                  </Button>
                  <Button
                    type='button'
                    className='rounded-none bg-green-600'
                    onClick={() => setValue('isPass', true)}
                  >
                    Success
                  </Button>
                </div>
                <Button className='bg-blue-600'>Save</Button>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              {data.map((item, index) => (
                <Category
                  {...item}
                  key={`category_${index}`}
                  categoryIndex={index}
                ></Category>
              ))}
            </div>
          </form>
        </FormProvider>
      </Layout.Body>
    </Layout>
  )
}
