import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'

import { Button } from '@/components/custom/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'
import { host } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const navigate = useNavigate()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            navigate(`/questions/${row.getValue('id')}`)
          }}
        >
          Detail
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await fetch(host(`/questions/${row.getValue('id')}/copy`), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
            }).then((res) => {
              if (res.status === 201) {
                navigate('/questions')
                toast({
                  title: '',
                  description: 'Copy succesfully',
                })
              } else {
                toast({
                  title: '',
                  description: "Something's wrong",
                })
              }
            })
          }}
        >
          Make a copy
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await fetch(host(`/questions/${row.getValue('id')}/delete`), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
            }).then((res) => {
              if (res.status === 204) {
                navigate('/questions')
                toast({
                  title: '',
                  description: 'Delete Result Successfully!',
                })
              } else {
                toast({
                  title: '',
                  description: "Something's wrong",
                })
              }
            })
          }}
        >
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
