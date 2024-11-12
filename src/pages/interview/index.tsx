import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { Input } from '@/components/ui/input'
import { RadioLabel } from '@/components/ui/radio-group'
import { UserNav } from '@/components/user-nav'
import { Controller, FormProvider } from 'react-hook-form'
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
            <div className='sticky top-0 z-10 mb-4 flex items-center justify-between bg-background pt-4'>
              <Input
                className='w-1/3'
                placeholder='Candidate name'
                {...register('candidateName')}
              ></Input>
              <div className='flex items-center gap-2'>
                <QuestionList />
                <Note />
                <div className='flex flex-row overflow-hidden rounded-md'>
                  <Controller
                    control={control}
                    name='isPass'
                    render={({ field }) => (
                      <>
                        <RadioLabel
                          className='btn-like h-9 rounded-none bg-red-600 peer-checked:bg-red-400'
                          onChange={() => {
                            field.onChange(false)
                          }}
                          checked={!field.value}
                        >
                          Fail
                        </RadioLabel>
                        <RadioLabel
                          className='btn-like h-9 rounded-none bg-green-600 peer-checked:bg-green-400'
                          onChange={() => {
                            field.onChange(true)
                          }}
                          checked={field.value}
                        >
                          Pass
                        </RadioLabel>
                      </>
                    )}
                  ></Controller>
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
