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
      <DrawerTrigger className='btn-like'>Note</DrawerTrigger>
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
