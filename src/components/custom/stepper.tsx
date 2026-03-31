import { CheckCircle, Circle } from 'lucide-react'
import { Fragment, ReactNode } from 'react'

type StepperProps = {
  steps: {
    step: string
    children: ReactNode
    completed: boolean
  }[]
  step: string
  onChangeStep: (step: string) => void
}

const Stepper = ({ steps, step, onChangeStep }: StepperProps) => {
  const lastStep = steps.length
  return (
    <div className='mx-auto w-full max-w-md p-4'>
      <div className='flex justify-center'>
        {steps.map((item, index) => (
          <Fragment key={`step_${index}`}>
            <div
              className={`flex flex-col items-center `}
              onClick={() => onChangeStep(item.step)}
            >
              <span
                className={`rounded-sm ${item.step === step && 'bg-gray-200'}`}
              >
                {item.completed ? (
                  <CheckCircle className={`m-2 text-green-500`}></CheckCircle>
                ) : (
                  <Circle className={`m-2 text-red-500`}></Circle>
                )}
              </span>
              {item.children}
            </div>
            <div
              className={`w-[100px] translate-y-[18px] border-t-2 border-black ${index + 1 === lastStep && 'hidden'}`}
            ></div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default Stepper
