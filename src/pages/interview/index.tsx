import { Layout } from '@/components/custom/layout'
import { Button } from '@/components/custom/button'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Interview() {
    const [candidateName,setCandidateName] = useState("");
    const [isInput,setIsInput] = useState(false);
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header>
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      {/* ===== Main ===== */}
      <Layout.Body>
        <div className='mb-2 flex items-center justify-between'>
          <Input className='' placeholder='Candidate name'></Input>
          <div className='flex items-center'>
            <Button>Note</Button>
            <Button className='bg-red-600'>Fail</Button>
            <Button className='bg-green-600'>Success</Button>
            <Button className='bg-blue-600'>Save</Button>
          </div>
        </div>
        <section className='border border-white rounded-md'>
        <Accordion type="single" collapsible className='p-4'>
            <AccordionItem value="item-1">
                <AccordionTrigger>Front-End</AccordionTrigger>
                <AccordionContent>
                <Card>
  <CardHeader>
    <CardTitle>Question 1: What is javascript</CardTitle>
  </CardHeader>
  <CardContent>
    <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Hint: </AccordionTrigger>
    <AccordionContent>
      <p>is a script or programing language</p>
      <p>implement complex feature on web page</p>
    </AccordionContent>
  </AccordionItem>
</Accordion>

  </CardContent>
  <CardFooter>
  <div className='mb-2 flex items-center justify-between w-full'>
          <Input className='' placeholder='Candidate name'></Input>
          <div className='flex items-center'>
            <Button className='bg-red-600'>X</Button>
            <Button className='bg-yellow-300'>O</Button>
            <Button className='bg-green-600'>V</Button>
          </div>
        </div>
  </CardFooter>
</Card>

                </AccordionContent>
            </AccordionItem>
        </Accordion>
        </section>
      </Layout.Body>
    </Layout>
  )
}


