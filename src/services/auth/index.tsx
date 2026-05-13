import { host } from '@/lib/utils'
import { authFetcher } from '..'
import { Auth, SignUpInput } from './schema'
import { AuthResponse } from './type'

export const SignIn = async ({ input }: { input: Auth }) => {
  const result = await authFetcher<AuthResponse>(host(`/signIn`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(input),
  })
  return result
}

export const SignUp = async ({ input }: { input: SignUpInput }) => {
  const result = await authFetcher(host(`/signUp`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(input),
  })
  return result
}

export const SavePurpose = async ({
  purpose,
  email,
}: {
  purpose: 'interviewer' | 'interviewee'
  email: string
}) => {
  const result = await authFetcher(host(`/save-purpose`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ purpose, email }),
  })
  return result
}
