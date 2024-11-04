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

export default function Tasks() {
  const { id } = useParams()
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
              <div className='flex w-full flex-row justify-between border-b pb-6'>
                <p>Card Name</p>
                <p>Call Stack in JS</p>
              </div>
              <div className='flex w-full flex-row justify-between border-b py-6'>
                <p>Category</p>
                <p>Front End</p>
              </div>
              <div className='flex w-full flex-row justify-between border-b py-6'>
                <p>Level</p>
                <p>Basic</p>
              </div>
              <div className='flex w-full flex-row justify-between border-b py-6'>
                <p>Hint</p>
                <div>
                  <p>It's a single threaded. Mean it can only do 1 time</p>
                  <p>Code execution is synchronous</p>
                  <p>
                    Function create stack frame that occupies a temporary memory
                  </p>
                  <p>It's work as LIFO - last in first out</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className='flex w-full justify-end gap-4'>
                <Button>Edit</Button>
                <Button>Back</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </Layout.Body>
    </Layout>
  )
}
