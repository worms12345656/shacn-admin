import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import { useAuth } from '@/components/session-provider'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { SignIn } from '@/services/auth'
import { Auth, authSchema } from '@/services/auth/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { setAuth } = useAuth()
  const { toast } = useToast()

  const form = useForm<Auth>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { handleSubmit, control } = form

  const onSubmit = handleSubmit(async (input: Auth) => {
    setIsLoading(true)
    try {
      const response = await SignIn({
        input,
      })

      const { data, err } = response

      if (err) {
        toast({
          title: 'Error',
          description: err?.errMessage || 'Failed to sign in',
          variant: 'destructive',
        })
        setIsLoading(false)
        return
      }

      const accessToken =
        ((data as Record<string, unknown>)?.accessToken as string) || ''
      setAuth({
        jwt: accessToken,
        name: ((data as Record<string, unknown>)?.username as string) || '',
        email: ((data as Record<string, unknown>)?.email as string) || '',
        purpose: ((data as Record<string, unknown>)?.purpose as string) || '',
      })

      toast({
        title: 'Success',
        description: 'Signed in successfully',
      })

      setTimeout(() => {
        navigate('/dashboard')
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An error occurred while signing in'
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
      console.error('Sign in error:', error)
      setIsLoading(false)
    }
  })

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isLoading}>
              Login
            </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={isLoading}
                leftSection={<IconBrandGithub className='h-4 w-4' />}
              >
                GitHub
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={isLoading}
                leftSection={<IconBrandFacebook className='h-4 w-4' />}
              >
                Facebook
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
