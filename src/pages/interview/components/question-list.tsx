import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { questionList } from '../data/question-list'

export default function QuestionList() {
  return (
    <Dialog>
      <DialogTrigger className='btn-like'>Question List</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Question List</DialogTitle>
          <DialogDescription>
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questionList.length ? (
                    questionList.map((question) => (
                      <TableRow key={question.id}>
                        <TableCell>{question.name}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={questionList.length}
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
