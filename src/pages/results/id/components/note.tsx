import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer'

type Props = {
  note: string
}

export default function Note({ note }: Props) {
  return (
    <Drawer>
      <DrawerTrigger className='btn-like'>Note</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerDescription>
            <p>{note || 'No Note'}</p>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className='flex w-full flex-row justify-center gap-4'>
            <DrawerClose>Close</DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
