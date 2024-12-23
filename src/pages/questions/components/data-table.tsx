import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Dialog } from '@radix-ui/react-dialog'
import { useEffect, useRef, useState } from 'react'
import { DataTablePagination } from '../components/data-table-pagination'
import { DataTableToolbar } from '../components/data-table-toolbar'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const ref = useRef<HTMLButtonElement | null>(null)

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const [row, setRow] = useState<Row<TData>>()
  const [chart, setChart] = useState()

  useEffect(() => {
    row &&
      fetch(
        `https://api.coingecko.com/api/v3/coins/${row?.getValue('id')}/market_chart?vs_currency=usd&days=30&interval=daily`,
        {
          method: 'GET',
        }
      )
        .then((res) => res.json())
        .then((item) => setChart(item.prices))
  }, [row?.getValue('id')])
  console.log(chart)

  const Xaxis = chart && [
    new Date(chart[0][0]),
    new Date(chart[1][0]),
    new Date(chart[2][0]),
    new Date(chart[3][0]),
    new Date(chart[4][0]),
    new Date(chart[5][0]),
    new Date(chart[6][0]),
    new Date(chart[7][0]),
    new Date(chart[8][0]),
    new Date(chart[9][0]),
    new Date(chart[10][0]),
    new Date(chart[11][0]),
    new Date(chart[12][0]),
    new Date(chart[13][0]),
    new Date(chart[14][0]),
    new Date(chart[15][0]),
    new Date(chart[16][0]),
    new Date(chart[17][0]),
    new Date(chart[18][0]),
    new Date(chart[19][0]),
    new Date(chart[20][0]),
    new Date(chart[21][0]),
    new Date(chart[22][0]),
    new Date(chart[23][0]),
    new Date(chart[24][0]),
    new Date(chart[25][0]),
    new Date(chart[26][0]),
    new Date(chart[27][0]),
    new Date(chart[28][0]),
    new Date(chart[29][0]),
    new Date(chart[30][0]),
  ]
  const dataChart = chart && [
    [chart[0][1], '#0000ff'],
    [chart[1][1], '#0000ff'],
    [chart[2][1], '#0000ff'],
    [chart[3][1], '#0000ff'],
    [chart[4][1], '#0000ff'],
    [chart[5][1], '#0000ff'],
    [chart[6][1], '#0000ff'],
    [chart[7][1], '#0000ff'],
    [chart[8][1], '#0000ff'],
    [chart[9][1], '#0000ff'],
    [chart[10][1], '#0000ff'],
    [chart[11][1], '#0000ff'],
    [chart[12][1], '#0000ff'],
    [chart[13][1], '#0000ff'],
    [chart[14][1], '#0000ff'],
    [chart[15][1], '#0000ff'],
    [chart[16][1], '#0000ff'],
    [chart[17][1], '#0000ff'],
    [chart[18][1], '#0000ff'],
    [chart[19][1], '#0000ff'],
    [chart[20][1], '#0000ff'],
    [chart[21][1], '#0000ff'],
    [chart[22][1], '#0000ff'],
    [chart[23][1], '#0000ff'],
    [chart[24][1], '#0000ff'],
    [chart[25][1], '#0000ff'],
    [chart[26][1], '#0000ff'],
    [chart[27][1], '#0000ff'],
    [chart[28][1], '#0000ff'],
    [chart[29][1], '#0000ff'],
    [chart[30][1], '#0000ff'],
  ]

  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => {
                    setRow(row)
                    ref.current?.click()
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <Dialog>
        <DialogTrigger ref={ref}></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className='flex flex-row items-center gap-3'>
                {' '}
                <img
                  src={row?.getValue('image')}
                  width={50}
                  height={50}
                  className='rounded-full'
                ></img>
                {row?.getValue('name')}
              </div>
            </DialogTitle>
            <DialogDescription>
              <div className='mt-3'>
                {' '}
                <HighchartsReact
                  highcharts={Highcharts}
                  options={{
                    chart: {
                      type: 'line',
                      backgroundColor: '#000',
                      style: {
                        color: 'white',
                      },
                    },
                    title: {
                      text: 'Price chart',
                    },

                    accessibility: {
                      point: {
                        valueDescriptionFormat: '{separator}{value}$',
                      },
                    },

                    xAxis: {
                      title: {
                        text: 'Year',
                      },
                      categories: [...(Xaxis || [])],
                    },
                    yAxis: {
                      type: 'logarithmic',
                      title: {
                        text: '',
                      },
                    },

                    tooltip: {
                      headerFormat: '<b>Price</b><br />',
                      pointFormat: '{point.y}$',
                    },

                    series: [
                      {
                        name: 'Internet Users',
                        keys: ['y', 'color'],
                        data: dataChart,
                        color: '#fff',
                      },
                    ],
                  }}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
