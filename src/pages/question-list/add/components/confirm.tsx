import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { UserNav } from '@/components/user-nav'
import { FormProvider, useFormContext } from 'react-hook-form'
import { levels } from '../data/label'
import { useNavigate } from 'react-router-dom'

type Props = {
  onBackButton: () => void
  onCreateButton: () => void
}

export default function ConfirmSection({
  onBackButton,
  onCreateButton,
}: Props) {
  const { register, getValues, setValue } = useFormContext()
  const navigate = useNavigate()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex w-full  flex-row items-center justify-between border-b pb-6'>
          <p className='min-w-[180px]'>Name</p>
          <Input {...register('name')} readOnly></Input>
        </div>
        <div className='flex w-full flex-row justify-between border-b py-6'>
          <p className='min-w-[180px]'>Level</p>
          <Select
            defaultValue={getValues('level')}
            onValueChange={(value) => setValue('level', value)}
          >
            <SelectTrigger className='w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {levels.map((item, index) => (
                <SelectItem value={item.value} key={`level_${index}`}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <div className='flex w-full justify-end gap-4'>
          <Button onClick={onCreateButton}>Create</Button>
          <Button type='button' onClick={onBackButton}>
            Back
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
