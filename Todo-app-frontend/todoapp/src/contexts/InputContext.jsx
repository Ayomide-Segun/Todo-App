import { createContext, useState, useContext } from "react";
import { AppContext } from "./AppContext";

export const InputContext = createContext();
export function InputContextProvider({children}){

    const {today} = useContext(AppContext)

    const [todoId, setTodoId] = useState(() => {
        return localStorage.getItem("editingTodoId")
    })
    const [projectName, setProjectName] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [selectedTaskGroup, setSelectedTaskGroup] = useState('')
    const [intensity, setIntensity] = useState('')
    const project_id =  todoId 
    const status = startDate === today ? 
            'In progress' : 'Not started'

    const [prompt, setPrompt] = useState(() => {
            const saved = localStorage.getItem("prompt")
            return saved ?
            JSON.parse(saved) :
            []
        })
    
    const [aiProject, setAiProject] = useState(() => {
    const saved = localStorage.getItem("aiProject")
        return saved ? JSON.parse(saved) : null
    })

    const noOfDays = (new Date(endDate).getDate() - new Date(startDate).getDate() ) + 1

    const inputDetails = {
        selectedTaskGroup,
        projectName,
        startDate,
        endDate,
        intensity,
        status,
        project_id
    }

    return(
        <InputContext.Provider
            value={{
                todoId,
                setTodoId,
                projectName,
                setProjectName,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                selectedTaskGroup,
                setSelectedTaskGroup,
                intensity,
                setIntensity,
                project_id,
                status,
                prompt,
                setPrompt,
                aiProject,
                setAiProject,
                noOfDays,
                inputDetails
            }}
        >
            {children}
        </InputContext.Provider>    
    )
}