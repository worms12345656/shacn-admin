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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { UserNav } from '@/components/user-nav'
import { categories, levels } from './data/label'
import useQuestionId from './hooks/use-question-id'

export default function QuestionAdd() {
  const { onSubmit, register, onBackButton, getValues, setValue } =
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
        <form
          className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'
          onSubmit={onSubmit}
        >
          <Card>
            <CardHeader>
              <CardTitle>Add</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex w-full  flex-row items-center justify-between border-b pb-6'>
                <p className='min-w-[180px]'>Name</p>
                <Input {...register('name')}></Input>
              </div>
              <div className='flex w-full flex-row justify-between border-b py-6'>
                <p className='min-w-[180px]'>Category</p>
                <Select
                  defaultValue={getValues('category')}
                  onValueChange={(value) => setValue('category', value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex w-full flex-row justify-between border-b py-6'>
                <p className='min-w-[180px]'>Level</p>
                <Select
                  defaultValue={getValues('level')}
                  onValueChange={(value) => setValue('level', value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((item) => (
                      <SelectItem value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex w-full flex-row justify-between border-b py-6'>
                <p className='min-w-[180px]'>Hint</p>
                <Textarea
                  className='h-[200px]'
                  {...register('hint')}
                ></Textarea>
              </div>
            </CardContent>
            <CardFooter>
              <div className='flex w-full justify-end gap-4'>
                <Button>Save</Button>
                <Button type='button' onClick={onBackButton}>
                  Back
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </Layout.Body>
    </Layout>
  )
}
