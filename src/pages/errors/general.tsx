import {
  ErrorResponse,
  Navigate,
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom'
import { Button } from '@/components/custom/button'
import { cn } from '@/lib/utils'
import NotFoundError from './not-found'
import MaintenanceError from './maintenance'

interface GeneralErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  minimal?: boolean
}

export default function GeneralError({
  className,
  minimal = false,
}: GeneralErrorProps) {
  const navigate = useNavigate()
  const error = useRouteError() as ErrorResponse

  if (error.status === 401) {
    return <Navigate to={'sign-in'} />
  }

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundError />
    }

    if (error.status === 503) {
      return <MaintenanceError />
    }

    if (error.status === 418) {
      return <div>🫖</div>
    }
  }

  return (
    <div className={cn('h-svh w-full', className)}>
      <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
        {!minimal && (
          <h1 className='text-[7rem] font-bold leading-tight'>500</h1>
        )}
        <span className='font-medium'>Oops! Something went wrong {`:')`}</span>
        <p className='text-center text-muted-foreground'>
          We apologize for the inconvenience. <br /> Please try again later.
        </p>
        {!minimal && (
          <div className='mt-6 flex gap-4'>
            <Button variant='outline' onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        )}
      </div>
    </div>
  )
}
