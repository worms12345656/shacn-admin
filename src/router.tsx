import { createBrowserRouter } from 'react-router-dom'
import { host } from './lib/utils.ts'
import GeneralError from './pages/errors/general-error'
import MaintenanceError from './pages/errors/maintenance-error'
import NotFoundError from './pages/errors/not-found-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import { getQuestionList } from './services/question-list/index.tsx'

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/sign-in',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: '/sign-in-2',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in-2')).default,
    }),
  },
  {
    path: '/sign-up',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },
  {
    path: '/otp',
    lazy: async () => ({
      Component: (await import('./pages/auth/otp')).default,
    }),
  },

  // Main routes
  {
    path: '/',
    // lazy: async () => {
    //   const AppShell = await import('./components/app-shell')
    //   return { Component: AppShell.default }
    // },
    errorElement: <GeneralError />,
    children: [
      {
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      {
        path: 'interview',
        lazy: async () => ({
          Component: (await import('./pages/interview')).default,
        }),
        loader: async ({}) => {
          const result = await fetch(host('/interview'))
          return result
        },
      },
      {
        index: true,
        lazy: async () => ({
          Component: (await import('@/pages/questions')).default,
        }),
        loader: async ({}) => {
          const result = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ai16z,fartcoin,grass,goatseus-maximus,io-net,act-i-the-ai-prophecy,zerebro,nosana,griffain,tars-protocol,ai-rig-complex,eliza,alchemist-ai,memes-ai,degen-spartan-ai,dasha,dolos-the-bully,kween,orbit-2,fxn,top-hat,shoggoth,agenttank,deep-worm,big-pharmai,bongo-cat,numogram,ava-ai,opus-2,obot,project89,chaos-and-disorder,meow,koala-ai,kitten-haimer,pippin,max-2,aimonica-brands,autonomous-virtual-beings,forest,solaris-ai,synesis-one,moe-4,universal-basic-compute,mizuki,naitzsche,slopfather,the-lokie-cabal,tensor,arok-vc,aiwithdaddyissues,bloomsperg-terminal,omega-2,thales-ai,keke-terminal,horny,quasar-2,ropirito,kolin,kwantxbt,agent-rogue,dither,duck-ai,centience,iq6900,darksun,weird-medieval-memes,yousim,sensus,ocada-ai,singularry,naval-ai,kira-2,kirakuru,brot,effective-accelerationism,cheshire-grin,limbo,size,neroboss,gmika,kira-3,convo,sqrfund,ugly-dog,gemxbt,roastmaster9000,nova-on-mars,sendor,flowerai,dojo-protocol,internosaur,devin,lea-ai,rex-3,aletheia,mona-arcane,apicoin,cyphomancer,lucy-ai&order=market_cap_desc&per_page=250&sparkline=false&locale=en',
            {
              method: 'GET',
            }
          )
          return result
        },
      },
      {
        path: 'questions/:id',
        lazy: async () => ({
          Component: (await import('@/pages/questions/id')).default,
        }),
        loader: async ({ params }) => {
          const data = await fetch(host(`/questions/${params.id}`))
          return data
        },
      },
      {
        path: 'questions/add',
        lazy: async () => ({
          Component: (await import('@/pages/questions/add')).default,
        }),
      },
      {
        path: 'results',
        lazy: async () => ({
          Component: (await import('@/pages/results')).default,
        }),
        loader: async () => {
          const data = await fetch(host(`/results`))
          return data
        },
      },
      {
        path: 'results/:id',
        lazy: async () => ({
          Component: (await import('@/pages/results/id')).default,
        }),
        loader: async ({ params }) => {
          const data = await fetch(host(`/results/${params.id}`))
          return data
        },
      },
      {
        path: 'question-list',
        lazy: async () => ({
          Component: (await import('@/pages/question-list')).default,
        }),
        loader: async () => {
          const data = await getQuestionList()
          return data
        },
      },
      {
        path: 'question-list/:id',
        lazy: async () => ({
          Component: (await import('@/pages/question-list/id')).default,
        }),
      },
      {
        path: 'chats',
        lazy: async () => ({
          Component: (await import('@/pages/chats')).default,
        }),
      },
      {
        path: 'apps',
        lazy: async () => ({
          Component: (await import('@/pages/apps')).default,
        }),
      },
      {
        path: 'users',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: 'analysis',
        lazy: async () => ({
          Component: (await import('@/components/coming-soon')).default,
        }),
      },
      {
        path: 'extra-components',
        lazy: async () => ({
          Component: (await import('@/pages/extra-components')).default,
        }),
      },
      {
        path: 'settings',
        lazy: async () => ({
          Component: (await import('./pages/settings')).default,
        }),
        errorElement: <GeneralError />,
        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (await import('./pages/settings/profile')).default,
            }),
          },
          {
            path: 'account',
            lazy: async () => ({
              Component: (await import('./pages/settings/account')).default,
            }),
          },
          {
            path: 'appearance',
            lazy: async () => ({
              Component: (await import('./pages/settings/appearance')).default,
            }),
          },
          {
            path: 'notifications',
            lazy: async () => ({
              Component: (await import('./pages/settings/notifications'))
                .default,
            }),
          },
          {
            path: 'display',
            lazy: async () => ({
              Component: (await import('./pages/settings/display')).default,
            }),
          },
          {
            path: 'error-example',
            lazy: async () => ({
              Component: (await import('./pages/settings/error-example'))
                .default,
            }),
            errorElement: <GeneralError className='h-[50svh]' minimal />,
          },
        ],
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
