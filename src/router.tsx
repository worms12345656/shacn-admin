import { createBrowserRouter } from 'react-router-dom'
import { HttpResponse } from './lib/api.ts'
import GeneralError from './pages/errors/general.tsx'
import MaintenanceError from './pages/errors/maintenance.tsx'
import NotFoundError from './pages/errors/not-found.tsx'
import UnauthorizedError from './pages/errors/unauthorized.tsx'
import {
  getInterview,
  getQuestionList,
  getQuestionListById,
} from './services/question-list/index.tsx'
import { QuestionList } from './services/question-list/type.tsx'
import { getQuestionById, getQuestions } from './services/question/index.tsx'
import { Question } from './services/question/type.tsx'
import { getResultDetail, getResults } from './services/result/index.tsx'
const router = createBrowserRouter([
  // Landing page - no sidebar
  {
    path: '/',
    lazy: async () => ({
      Component: (await import('./pages/main')).default,
    }),
  },

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

  // App routes with sidebar
  {
    path: '/',
    errorElement: <GeneralError />,
    children: [
      {
        path: 'purpose',
        lazy: async () => ({
          Component: (await import('@/pages/purpose')).default,
        }),
      },
    ],
  },

  // App routes with sidebar
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app-shell')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        path: 'dashboard',
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      {
        path: 'interview',
        lazy: async () => ({
          Component: (await import('./pages/interview')).default,
        }),
        loader: async () => {
          const { data } = await getInterview()
          return data
        },
      },
      {
        path: 'questions',
        lazy: async () => ({
          Component: (await import('@/pages/questions')).default,
        }),
        loader: async () => {
          const { data } = await getQuestions()
          return data
        },
      },
      {
        path: 'questions/:id',
        lazy: async () => ({
          Component: (await import('@/pages/questions/id')).default,
        }),
        loader: async ({ params }) => {
          const { data } = await getQuestionById(params.id)
          return data
        },
      },
      {
        path: 'questions/create',
        lazy: async () => ({
          Component: (await import('@/pages/questions/create')).default,
        }),
      },
      {
        path: 'results',
        lazy: async () => ({
          Component: (await import('@/pages/results')).default,
        }),
        loader: async () => {
          const { data } = await getResults()
          return data
        },
      },
      {
        path: 'results/:id',
        lazy: async () => ({
          Component: (await import('@/pages/results/id')).default,
        }),
        loader: async ({ params }) => {
          const { data } = await getResultDetail(params.id)
          return data
        },
      },
      {
        path: 'question-list',
        lazy: async () => ({
          Component: (await import('@/pages/question-list')).default,
        }),
        loader: async () => {
          const { data } = await getQuestionList()
          return data
        },
      },
      {
        path: 'question-list/create',
        lazy: async () => ({
          Component: (await import('@/pages/question-list/create')).default,
        }),
        loader: async () => {
          const { data } = await getQuestions()
          return data
        },
      },
      {
        path: 'question-list/:id',
        lazy: async () => ({
          Component: (await import('@/pages/question-list/id')).default,
        }),
        loader: async ({ params }) => {
          const { data } = await getQuestionListById(params.id)
          return data
        },
      },
      {
        path: 'question-list/:id/edit',
        lazy: async () => ({
          Component: (await import('@/pages/question-list/id/edit')).default,
        }),
        loader: async ({ params }) => {
          const { data } = await getQuestionListById(params.id)
          const { data: questionsData } = await getQuestions()

          const questionListData = data as HttpResponse<QuestionList>
          const questions = questionsData as HttpResponse<Question[]>

          return {
            data: {
              questionListData: questionListData.data,
              questions: questions.data,
            },
            status: 200,
          }
        },
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
  { path: '/401', Component: UnauthorizedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
