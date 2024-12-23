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
import { formatToMillionUSD } from '@/lib/utils'
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
    [chart[10][1], '#8d0073'],
    [chart[20][1], '#ba0046'],
    [chart[30][1], '#d60028'],
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
            <DialogTitle>{row?.getValue('name')}</DialogTitle>
            <DialogDescription>
              <div className='flex flex-row justify-between '>
                <div className=' p-4'>
                  <div>$ Price</div>
                  <div className='bold text-xl'>
                    {formatToMillionUSD(row?.getValue('current_price'))}
                  </div>
                  <div></div>
                </div>
                <div className=' p-4'>
                  <div>$ Price</div>
                  <div className='bold text-xl'>
                    {formatToMillionUSD(row?.getValue('market_cap'))}
                  </div>
                </div>
                <div className=' p-4'>
                  <div>High on 24h</div>
                  <div className='bold text-xl'>
                    {row?.getValue('high_24h')}
                  </div>
                </div>
                <div className=' p-4'>
                  <div>Low on 24h</div>
                  <div className='bold text-xl'>{row?.getValue('low_24h')}</div>
                </div>
              </div>
              <HighchartsReact
                highcharts={Highcharts}
                options={{
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
                      text: 'Number of Internet Users (in millions)',
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
                      data: [],
                      color: {
                        linearGradient: {
                          x1: 0,
                          x2: 0,
                          y1: 1,
                          y2: 0,
                        },
                        stops: [
                          [0, 'black'],
                          [1, 'clack'],
                        ],
                      },
                    },
                  ],
                }}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
