import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { otherQuestionList } from '../data/question-list'

type Props = {
  onSelectQuestionList: (id: string) => void
}

export default function QuestionList({ onSelectQuestionList }: Props) {
  return (
    <Dialog>
      <DialogTrigger className='btn-like'>Question List</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='pb-4'>Question List</DialogTitle>
          <DialogDescription>
            <div className='rounded-md border'>
              <Table>
                <TableBody>
                  {otherQuestionList.length ? (
                    otherQuestionList.map((list) => (
                      <TableRow
                        onClick={() => onSelectQuestionList(list.id)}
                        key={list.id}
                      >
                        <TableCell>{list.name}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={otherQuestionList.length}
                        className='h-24 text-center'
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            {/* <DataTablePagination table={table} /> */}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
