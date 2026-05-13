import { Button } from '@/components/custom/button'
import { useAuth } from '@/components/session-provider'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { SavePurpose } from '@/services/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type PurposeType = 'interviewer' | 'interviewee'

export default function Purpose() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { auth, setAuth } = useAuth()
  const [selectedPurpose, setSelectedPurpose] = useState<PurposeType | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(false)

  // Redirect to dashboard if purpose is already selected
  useEffect(() => {
    if (!auth.email) {
      navigate('/sign-up', { replace: true })
    }
    if (auth.purpose) {
      navigate('/dashboard', { replace: true })
    }
  }, [auth.purpose, navigate])

  const handlePurposeSelect = async (purpose: PurposeType) => {
    setSelectedPurpose(purpose)
    setIsLoading(true)

    try {
      const response = await SavePurpose({ purpose, email: auth.email || '' })
      const { err, status } = response

      if (status === 400 || err) {
        toast({
          title: 'Error',
          description: err?.errMessage || 'Failed to save purpose',
          variant: 'destructive',
        })
        setIsLoading(false)
        setSelectedPurpose(null)
        return
      }

      // Update auth context with purpose
      setAuth({
        ...auth,
        purpose,
      })

      toast({
        title: 'Success',
        description: `You're set as an ${purpose}!`,
      })

      setTimeout(() => {
        navigate('/dashboard')
        setIsLoading(false)
      }, 1000)
    } catch (error: any) {
      const errorMessage =
        error?.errMessage ||
        (error instanceof Error ? error.message : 'An error occurred')
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      console.error('Purpose selection error:', error)
      setIsLoading(false)
      setSelectedPurpose(null)
    }
  }

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

          <Card className='p-6'>
            <div className='mb-6 flex flex-col space-y-2 text-left'>
              <h1 className='text-lg font-semibold tracking-tight'>
                Select Your Role
              </h1>
              <p className='text-sm text-muted-foreground'>
                Choose whether you'll be conducting or participating in
                interviews
              </p>
            </div>

            <div className='grid gap-4'>
              <Button
                variant={
                  selectedPurpose === 'interviewer' ? 'default' : 'outline'
                }
                className='h-auto flex-col items-start gap-2 p-4'
                onClick={() => handlePurposeSelect('interviewer')}
                disabled={isLoading}
              >
                <div className='flex w-full items-center justify-between'>
                  <span className='text-base font-semibold'>Interviewer</span>
                  {isLoading && selectedPurpose === 'interviewer' && (
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground' />
                  )}
                </div>
                <p className='text-left text-xs text-muted-foreground'>
                  I want to conduct and manage interviews
                </p>
              </Button>

              <Button
                variant={
                  selectedPurpose === 'interviewee' ? 'default' : 'outline'
                }
                className='h-auto flex-col items-start gap-2 p-4'
                onClick={() => handlePurposeSelect('interviewee')}
                disabled={isLoading}
              >
                <div className='flex w-full items-center justify-between'>
                  <span className='text-base font-semibold'>Interviewee</span>
                  {isLoading && selectedPurpose === 'interviewee' && (
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground' />
                  )}
                </div>
                <p className='text-left text-xs text-muted-foreground'>
                  I want to participate in interviews
                </p>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
