import { host } from '@/lib/utils'
import { Auth } from './schema'

export const SignIn = async ({ input }: { input: Auth }) => {
  const result = await fetch(host(`/signIn`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(input),
  })
  return await result.json()
}
