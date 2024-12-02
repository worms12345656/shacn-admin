import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer'

export default function Note() {
  return (
    <Drawer>
      <DrawerTrigger className='btn-like'>Note</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerDescription>
            <p>Good</p>
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
