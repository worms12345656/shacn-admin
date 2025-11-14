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
import { categories, levels } from './data/label'
import useQuestionId from './hooks/use-question-list'
import { FormProvider } from 'react-hook-form'
import InformationSection from './components/information'
import { Breadcrumb, BreadcrumbItem } from '@/components/custom/breadcrumb'
import { Slash } from 'lucide-react'
import Stepper from '@/components/custom/stepper'
import QuestionSection from './components/questions'
import { STEP } from './data/constant'

export default function QuestionListEdit() {
  const {
    onSubmit,
    register,
    onBackButton,
    getValues,
    setValue,
    onChangeStep,
    currentStep,
    method,
    steps,
    errors,
    questions,
  } = useQuestionId()
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Questions List
            </h2>
          </div>
        </div>
        <Stepper
          step={currentStep}
          steps={steps}
          onChangeStep={onChangeStep}
        ></Stepper>
        <form
          className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row'
          onSubmit={onSubmit}
        >
          <FormProvider {...method}>
            {currentStep === STEP.Information && (
              <InformationSection
                onBackButton={onBackButton}
                onNextButton={() => onChangeStep(STEP.Questions)}
              ></InformationSection>
            )}
            {currentStep === STEP.Questions && (
              <QuestionSection
                questionsData={questions}
                onBackButton={() => onChangeStep(STEP.Information)}
                onCreateButton={onSubmit}
              ></QuestionSection>
            )}
          </FormProvider>
        </form>
      </Layout.Body>
    </Layout>
  )
}
