import { Button } from '@/components/custom/button'
import ThemeSwitch from '@/components/theme-switch'

export default function Main() {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* ===== Header ===== */}
      <header className='sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4'>
          {/* Logo */}
          <div className='flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 256 256'
              className='h-8 w-8'
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
            <span className='text-lg font-semibold'>Interview</span>
          </div>

          {/* Actions */}
          <div className='flex items-center gap-4'>
            <ThemeSwitch />
            <Button variant='outline' asChild>
              <a href='/sign-in'>Sign In</a>
            </Button>
            <Button asChild>
              <a href='/sign-up'>Sign Up</a>
            </Button>
          </div>
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <main className='flex flex-1 items-center justify-center'>
        <div className='container mx-auto px-4 py-20 text-center'>
          <div className='mx-auto max-w-2xl space-y-6'>
            <h1 className='text-5xl font-bold md:text-6xl'>
              Welcome to Interview
            </h1>
            <p className='text-xl text-muted-foreground md:text-2xl'>
              Prepare for your next interview with our comprehensive platform
            </p>
            <p className='text-lg text-muted-foreground'>
              Access curated questions, track your progress, and master
              interview skills
            </p>
            <div className='flex flex-col justify-center gap-4 pt-8'>
              <div className='flex flex-wrap justify-center gap-4'>
                <Button size='lg' className='px-8' asChild>
                  <a href='/sign-up'>Get Started</a>
                </Button>
                <Button size='lg' variant='outline' className='px-8' asChild>
                  <a href='/sign-in'>Sign In</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ===== Footer ===== */}
      <footer className='border-t border-border/40 bg-background py-6'>
        <div className='container mx-auto px-4 text-center text-sm text-muted-foreground'>
          <p>&copy; 2024 Interview. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
