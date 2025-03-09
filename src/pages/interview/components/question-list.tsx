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
import { UnchosenList } from '@/services/question-list/type'

type Props = {
  onSelectQuestionList: (id: string) => Promise<void>
  unchosenList: UnchosenList
  openDialog: boolean
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

export default function QuestionList({
  onSelectQuestionList,
  unchosenList,
  openDialog,
  setOpenDialog,
}: Props) {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger className='btn-like' onClick={() => setOpenDialog(true)}>
        Question List
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='pb-4'>Question List</DialogTitle>
          <div className='rounded-md border'>
            <Table>
              <TableBody>
                {unchosenList.length ? (
                  unchosenList.map((list) => (
                    <TableRow
                      onClick={async () => await onSelectQuestionList(list.id)}
                      key={list.id}
                    >
                      <TableCell>{list.name}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={unchosenList.length}
                      className='h-24 text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
