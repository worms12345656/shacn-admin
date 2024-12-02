type Props = {
  rating: number
}

export default function Rating({ rating }: Props) {
  return (
    <div className='h-9 rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground'>
      {rating}
    </div>
  )
}
