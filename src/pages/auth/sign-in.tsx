import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn() {
  return (
    <>
      <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8'>
          <div className='mb-4 flex items-center justify-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 256 256'
              className='mr-2 h-8 w-8'
            >
              <rect width='256' height='256' fill='none'></rect>
              <line
                x1='208'
                y1='128'
                x2='128'
                y2='208'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
              ></line>
              <line
                x1='192'
                y1='40'
                x2='40'
                y2='192'
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='16'
              ></line>
            </svg>
            <h1 className='text-lg font-semibold'>Interview</h1>
          </div>
          <Card className='p-8'>
            <div className='mb-2 flex flex-col space-y-2 text-left'>
              <h1 className='text-lg font-semibold tracking-tight'>Login</h1>
            </div>
            <div className='mb-3'>
              <UserAuthForm />
            </div>
            <div className='flex flex-col gap-2 text-center text-sm text-muted-foreground'>
              <div className='relative my-2'>
                <div className='absolute inset-0 flex items-center'>
                  <span className='w-full border-t' />
                </div>
              </div>
              <p>
                Don't have an account?{' '}
                <Link
                  to='/sign-up'
                  className='underline underline-offset-4 hover:text-primary'
                >
                  Sign Up
                </Link>
              </p>
            </div>
            <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
              By clicking login, you agree to our{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </a>
              .
            </p>
          </Card>
        </div>
      </div>
    </>
  )
}
