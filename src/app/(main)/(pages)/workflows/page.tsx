import React from 'react'
import WorkflowButton from './_components/WorkflowButton'
import Workflow from './_components/Workflow'

const Workflows = () => {
  return (
    <div className='flex flex-col gap-4 relative'>
      <div className='text-xl sticky top-0 z-[10] py-4 px-6 bg-background/50 backdrop-blur-lg flex justify-between items-center border-b'>
      <h1>
        Workflows
      </h1>
      <WorkflowButton />
      </div>
      <div className='flex p-2'>
      <Workflow name='Test 1' description='First test description' id='1' publish={false}/>
      </div>
    </div>
  )
}

export default Workflows