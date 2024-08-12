import { EditorCanvasCardType } from '@/lib/types'
import { UseEditor } from '@/providers/editor-provider'
import React, { useMemo, useState } from 'react'
import { Position, useNodeId } from 'reactflow'
import EditorCanvasIconHelper from './EditorCanvasCardIconHelper'
import CustomHandle from './CustomHandle'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'


const EditorCanvasSingleCard = ({data}: {data: EditorCanvasCardType}) => {
    const {dispatch, state} = UseEditor()
    const nodeId = useNodeId()
    const logo = useMemo(()=>{
      return <EditorCanvasIconHelper type={data.type}/>
    },[data])
  return (
   <>
   {data.type !== 'Trigger' && data.type !== 'Google Drive' && (
    <CustomHandle type='target' position={Position.Top} style={{zIndex: 100}}/>
   )}
   <Card
    onClick={(e) => {
      e.stopPropagation()
      const val = state.editor.elements.find(element => element.id === nodeId)
      if(val){
        dispatch({type: 'SELECTED_ELEMENT', payload: { element: val}})
      }
    }}
    className='relative max-w-[400px] dark:border-muted-foreground/70'
   >
    <CardHeader className='flex flex-row items-center gap-4'>
      <div>{logo}</div>
      <CardTitle>{data.title}</CardTitle>
      <CardDescription>
        <p className='text-xs text-muted-foreground/50'>
          <b className='text-muted-foreground/80'>ID: </b>
          {nodeId}
        </p>
        <p>{data.description}</p>
      </CardDescription>
    </CardHeader>
    <Badge variant='secondary' className='absolute right-2 top-2' >
      {data.type}
    </Badge>
   </Card>
   <CustomHandle type='source' position={Position.Bottom} id='a'/>
   </>
  )
}

export default EditorCanvasSingleCard