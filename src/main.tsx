import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import '@/index.css'
import router from '@/router'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { MiddlewareProvider } from './components/middleware-provider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <MiddlewareProvider>
        <RouterProvider router={router} />
      </MiddlewareProvider>
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
)
