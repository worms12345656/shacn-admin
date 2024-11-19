import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  categoryIndex: number
  categoryName: string
  questionList: {
    questionId: string
    questionName: string
    hint: string
  }[]
}

export default function Category({ categoryName, questionList }: Props) {
  return (
    <>
      <div className='rounded-md border'>
        <Accordion type='single' collapsible className='p-4'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>{categoryName}</AccordionTrigger>
            <AccordionContent>
              {questionList.map((question, index) => (
                <Card
                  key={`question_${question.questionId}`}
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
                            key={`hint_${question.questionId}_${index}`}
                            className='whitespace-pre-line'
                          >
                            {question.hint}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}
