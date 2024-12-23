import { Layout } from '@/components/custom/layout'
import { useLoaderData } from 'react-router-dom'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'

export default function Questions() {
  const data = useLoaderData() as any

  console.log('data', data)

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky></Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Crypto Currency
            </h2>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={data} columns={columns} />
        </div>
      </Layout.Body>
    </Layout>
  )
}
