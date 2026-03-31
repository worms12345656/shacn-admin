import { Layout } from '@/components/custom/layout'
import Stepper from '@/components/custom/stepper'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { FormProvider } from 'react-hook-form'
import InformationSection from './components/information'
import QuestionSection from './components/questions'
import { STEP } from './data/constant'
import useQuestionId from './hooks/use-question-list'

export default function QuestionListEdit() {
  const {
    onSubmit,
    onBackButton,
    onChangeStep,
    currentStep,
    method,
    steps,
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
