import { ConnectionContextProvider } from '@/providers/connections-provider'
import EditorContextProvider from '@/providers/editor-provider'
import React from 'react'
import EditorCanvas from './_components/EditorCanvas'

type Props = {}

const Editor = (props: Props) => {
  return (
    <div>
      <EditorContextProvider>
        <ConnectionContextProvider>
          <>
           <EditorCanvas />
          </>
        </ConnectionContextProvider>
      </EditorContextProvider>
    </div>
  )
}

export default Editor