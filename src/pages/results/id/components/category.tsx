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
import { useFormContext } from 'react-hook-form'
import Rating from './rating'
import { convertLabelCategory } from '@/lib/convert/label'
import { questionResult } from '@/services/result/type'

type Props = {
  categoryIndex: number
  categoryName: string
  questionList: questionResult[]
}

export default function Category({ categoryName, questionList }: Props) {
  return (
    <>
      <div className='rounded-md border'>
        <Accordion type='single' collapsible className='p-4' data-state='open'>
          <AccordionItem value='item-1'>
            <AccordionTrigger data-state='open'>
              {convertLabelCategory(categoryName)}
            </AccordionTrigger>
            <AccordionContent data-state='open'>
              {questionList.map((question, index) => (
                <Card
                  key={`question_${question.id}`}
                  className='mb-4 last-of-type:mb-0'
                >
                  <CardHeader>
                    <CardTitle>{question.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type='single' collapsible>
                      <AccordionItem value='item-1'>
                        <AccordionTrigger>Hint: </AccordionTrigger>
                        <AccordionContent>
                          <p
                            key={`hint_${question.hint}_${index}`}
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
                      <p>Summary</p>
                      <div>
                        <Rating rating={question.rating} />
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
