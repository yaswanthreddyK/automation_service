'use client'
import { EditorCanvasCardType, EditorNode } from '@/lib/types'
import { UseEditor } from '@/providers/editor-provider'
import React, { useCallback, useState } from 'react'
import  Reactflow, { addEdge, applyEdgeChanges, applyNodeChanges, Background, BackgroundVariant, Connection, Controls, Edge, EdgeChange, MiniMap, NodeChange, ReactFlowInstance, XYPosition } from 'reactflow'
import 'reactflow/dist/style.css'
import EditorCanvasSingleCard from './EditorCanvasSingleCard'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useToast } from '@/components/ui/use-toast'
import { usePathname } from 'next/navigation'
import { v4 } from 'uuid'
import { EditorCanvasDefaultCardTypes } from '@/lib/constants'

type Props = {}



const nodeTypes = {
  Action: EditorCanvasSingleCard,
  Trigger: EditorCanvasSingleCard,
  Email: EditorCanvasSingleCard,
  Condition: EditorCanvasSingleCard,
  AI: EditorCanvasSingleCard,
  Slack: EditorCanvasSingleCard,
  'Google Drive': EditorCanvasSingleCard,
  Notion: EditorCanvasSingleCard,
  Discord: EditorCanvasSingleCard,
  'Custom Webhook': EditorCanvasSingleCard,
  'Google Calendar': EditorCanvasSingleCard,
  Wait: EditorCanvasSingleCard,
}

const initialNodes: EditorNode[] = []
const initialEdges: { id: string, source: string, target: string}[] = []


const EditorCanvas = (props: Props) => {
  const [nodes, setNodes] = useState()
  const [edges, setEdges] = useState()
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance>()
  const [isWorkflowLoading, setIsWorkflowLoading] = useState(false)
  const {dispatch, state} = UseEditor()
  const pathname = usePathname()
  const {toast} = useToast()

  const onDragOver = useCallback((event: any) => {
    event.preventDefault(),
    event.dataTransfer.dropEffect = 'move'
  },[])

  const onDrop = useCallback((event: any) => {
    event.preventDefault()
    const type: EditorCanvasCardType['type'] = event.dataTransfer.getData('application/reactflow')

    if(typeof type === 'undefined' || !type){
      return
    }

    const triggerAleradyExists = state.editor.elements.find(node => node.type == 'Trigger')

    if(type === 'Trigger' && triggerAleradyExists) {
      toast({description: 'Only one trigger is allowed at the moment'})
      return
    }

    if(!reactFlowInstance) return

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    })

    const newNode: EditorNode = {
      id: v4(),
      position,
      type,
      data: {
        title: type,
        description: EditorCanvasDefaultCardTypes[type].description,
        completed: false,
        current: false,
        metadata: {},
        type: type
      }
    }
    //@ts-ignore
    setNodes((nds) => nds.concat(newNode))
  },[reactFlowInstance, state])

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    //@ts-ignore
    setNodes((nds) => applyNodeChanges(changes, nds))
  },[setNodes])

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    //@ts-ignore
    setEdges((eds) => applyEdgeChanges(changes, eds))
  },[setEdges])

  const onConnect = useCallback(
    (params: Connection) => {
      //@ts-ignore
      setEdges((eds) => addEdge(params, eds))
    }, [setEdges]);

  const onClick =(event: React.MouseEvent) => {
    event.preventDefault()
    dispatch({
      type: 'SELECTED_ELEMENT',
      payload: {
        element: {
          data: {
            completed: false,
            current: false,
            description: '',
            metadata: {},
            title: '',
            type: 'Trigger'
          },
          id: '',
          position: {x: 0, y: 0},
          type: 'Trigger'
        }
      }
    })
  }
  return (
   <ResizablePanelGroup direction='horizontal' className=''>
      <ResizablePanel defaultSize={70}>
        <div className='flex h-full items-center justify-center'>
          <div
          className='relative w-full h-screen pb-[70px]'
          >

{isWorkflowLoading ? (
              <div className="absolute flex h-full w-full items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (<Reactflow
              className='w-[300px] h-full'
               nodes={initialNodes}
               edges={initialEdges}
               nodeTypes={nodeTypes}
               onDrop={onDrop}
               onDragOver={onDragOver}
               onNodesChange={onNodesChange}
               onEdgesChange={onEdgesChange}
               onConnect={onConnect}
               onInit={setReactFlowInstance}
               fitView
               onClick={onClick}
              >
               <Controls position='top-left'/>
               <MiniMap position='bottom-left' className='!bg-background' zoomable pannable/>
               <Background variant={BackgroundVariant.Dots} size={1} gap={20}/>
              </Reactflow>)
}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={40} className='relative sm:block'>
        {
          isWorkflowLoading ? ( <div className="absolute flex h-full w-full items-center justify-center">
            <svg
              aria-hidden="true"
              className="inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>) : (

            null
          )
        }
      </ResizablePanel>
   </ResizablePanelGroup>
  )
}

export default EditorCanvas