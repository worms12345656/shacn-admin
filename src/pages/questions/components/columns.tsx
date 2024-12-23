import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatToMillionUSD } from '@/lib/utils'
import { Question } from '../data/schema'

export const columns: ColumnDef<Question>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title='Question' />
  //   ),
  //   cell: ({ row }) => (
  //     <div className='w-[80px] truncate'>{row.getValue('id')}</div>
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex space-x-2'>
          <Avatar>
            <AvatarImage src={row.getValue('image')} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='max-w-32 cursor-pointer truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            <p>{row.getValue('name')}</p>
            <p>{(row.getValue('symbol') as string).toUpperCase()}</p>
          </div>
        </div>
      )
    },
  },

  {
    accessorKey: 'current_price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex w-[100px] items-center'>
          <span>{`$${row.getValue('current_price')} `}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'price_change_24h',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price Change In 24h' />
    ),
    cell: ({ row }) => {
      const data = row.getValue('price_change_24h')
      return (
        <div className='flex items-center'>
          <span
            className={`${(data as any) > 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            {row.getValue('price_change_24h')}
          </span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'market_cap',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Market Cap' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex items-center'>{`${formatToMillionUSD(row.getValue('market_cap'))}`}</div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'image',
    header: ({}) => <></>,
    cell: ({}) => {
      return <></>
    },
  },
  {
    accessorKey: 'symbol',
    header: ({}) => <></>,
    cell: ({}) => {
      return <></>
    },
  },
  {
    accessorKey: 'low_24h',
    header: ({}) => <></>,
    cell: ({}) => {
      return <></>
    },
  },
  {
    accessorKey: 'high_24h',
    header: ({}) => <></>,
    cell: ({}) => {
      return <></>
    },
  },
  {
    accessorKey: 'id',
    header: ({}) => <></>,
    cell: ({}) => {
      return <></>
    },
  },
]
