'use client'

import { EditorActions, EditorNode } from "@/lib/types"
import { Dispatch, createContext, useContext, useReducer } from "react"

export type Editor = {
    elements: EditorNode[],
    edges: {
        id: string,
        source: string,
        target: string
    }[]
    selectedNode: EditorNode
}

export type HistoryState = {
    history: Editor[]
    currentIndex: number
}

export type EditorState = {
    editor: Editor
    history: HistoryState
}

const initialEditorState: Editor = {
        elements: [],
        selectedNode: {
            data: {
                completed: false,
                current: false,
                description: '',
                metadata: {},
                title: '',
                type: 'Trigger'
            },
            id: '',
            position: { x: 0, y: 0},
            type: 'Trigger'
        },
        edges: []
}

const initialHistoryState: HistoryState = {
    history: [initialEditorState],
    currentIndex: 0
}

const initialState: EditorState = {
    editor: initialEditorState,
    history: initialHistoryState
}

const editorReducer = (state: EditorState = initialState, action: EditorActions): EditorState => {
    switch(action.type){
        default: 
        return state;
        case "REDO": 
            if(state.history.currentIndex < state.history.history.length - 1){
                const nextIndex = state.history.currentIndex + 1
                const nextEditorState = {...state.history.history[nextIndex]}
                const redoState = {
                    ...state,
                    editor: nextEditorState,
                    history: {
                        ...state.history,
                        currentIndex: nextIndex
                    }
                    
                }
                return redoState
            }
            return state
        case "UNDO":
            if(state.history.currentIndex > 0){
                const previousIndex = state.history.currentIndex - 1
                const previousEditorState = {...state.history.history[previousIndex]}
                const undoState = {
                    ...state,
                    editor: previousEditorState,
                    history: {
                        ...state.history,
                        currentIndex: previousIndex
                    }
                }
                return undoState
            }
            return state
        case "LOAD_DATA": 
        return {
            ...state,
            editor: {
                ...state.editor,
                elements: action.payload.elements || initialState.editor.elements,
                edges: action.payload.edges || initialState.editor.edges,
            }
        }
        case "SELECTED_ELEMENT":
            return {
                ...state,
                editor: {
                    ...state.editor,
                    selectedNode: action.payload.element
                }
            }
    }
}

export type EditorContextData = {
    previewMode: boolean,
    setPreviewMode: () => {}
}

export const EditorContext = createContext<{state: EditorState,dispatch: Dispatch<EditorActions>}>({
    state: initialState,
    dispatch: () => {}
})

export const { Provider } = EditorContext

export type EditorProps = {children: React.ReactNode}

export const EditorContextProvider = ({children}: EditorProps) => {
    const [state, dispatch] = useReducer(editorReducer, initialState)
    return <Provider value={{state, dispatch}}>
        {children}
    </Provider>
}   

export default EditorContextProvider

export const UseEditor = () => {
    const context = useContext(EditorContext)
    if(!context) throw new Error('No Editor context found')

    return context
}