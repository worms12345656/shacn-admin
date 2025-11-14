import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { Label } from '@/components/ui/label'
import { UserNav } from '@/components/user-nav'
import { FormProvider } from 'react-hook-form'
import Category from './components/category'
import Note from './components/note'
import useInterviewForm from './hook/use-interview-form'

export default function ResultId() {
  const { result, categoryList } = useInterviewForm()
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
        <div className='sticky top-0 z-10 mb-4 flex items-center justify-between bg-background pt-4'>
          <p className='w-1/3 text-3xl font-bold'>{result.candidateName}</p>
          <div className='flex items-center gap-2'>
            <Note note={result.note}/>
            <div className='flex flex-row overflow-hidden rounded-md'>
              {result.isPass ? (
                <Label className='h-9 rounded-none bg-green-600 px-4 py-2 text-sm font-medium text-primary-foreground'>
                  Pass
                </Label>
              ) : (
                <Label className='h-9 rounded-none bg-red-600 px-4 py-2 text-sm font-medium text-primary-foreground'>
                  Fail
                </Label>
              )}
            </div>
            <Button>Back</Button>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          {categoryList.map((item, index) => (
            <Category
              categoryName={item.categoryName}
              questionList={item.questionList}
              key={`category_${index}`}
              categoryIndex={index}
            ></Category>
          ))}
        </div>
      </Layout.Body>
    </Layout>
  )
}
