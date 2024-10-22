import { Button } from '@/components/custom/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Textarea } from '@/components/ui/textarea'
import { useFormContext } from 'react-hook-form'

export default function Note() {
  const { register, resetField } = useFormContext()
  return (
    <Drawer>
      <DrawerTrigger className='inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'>
        Note
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerDescription>
            <Textarea
              {...register('note')}
              className='h-80'
              placeholder='Take your note here...'
            ></Textarea>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className='flex w-full flex-row justify-center gap-4'>
            <Button variant='outline' onClick={() => resetField('note')}>
              Clear
            </Button>
            <DrawerClose>Close</DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
