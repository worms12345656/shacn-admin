import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import Rating from './rating'
import { convertLabelCategory } from '@/lib/convert/label'

type Props = {
  categoryIndex: number
  categoryName: string
  questionList: {
    index: number
    questionId: string
    questionName: string
    hint: string
  }[]
}

export default function Category({ categoryName, questionList }: Props) {
  const { register } = useFormContext()
  return (
    <>
      <div className='rounded-md border'>
        <Accordion type='single' collapsible className='p-4'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>
              {convertLabelCategory(categoryName)}
            </AccordionTrigger>
            <AccordionContent>
              {questionList.map((question) => (
                <Card
                  key={`question_${question.index}`}
                  className='mb-4 last-of-type:mb-0'
                >
                  <CardHeader>
                    <CardTitle>{question.questionName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type='single' collapsible>
                      <AccordionItem value='item-1'>
                        <AccordionTrigger>Hint: </AccordionTrigger>
                        <AccordionContent>
                          <p
                            key={`hint_${question.questionId}_${question.index}`}
                            className='whitespace-pre-line'
                          >
                            {question.hint}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                  <CardFooter>
                    <div className='mb-2 flex w-full items-center justify-between'>
                      <Input
                        type='hidden'
                        className=''
                        placeholder='Summary'
                        {...register(
                          `questionList.${question.index}.questionId`
                        )}
                        value={question.questionId}
                      ></Input>
                      <Input
                        className='w-2/3'
                        placeholder='Summary'
                        {...register(`questionList.${question.index}.summary`)}
                      ></Input>
                      <div>
                        <Rating
                          name={`questionList.${question.index}.rating`}
                        />
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}
