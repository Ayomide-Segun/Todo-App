import { AICard } from "./AICard"
import { UserCard } from "./UserCard"
import { AIInput } from "./AIInput"
import "../../AIAssistant.css"
import { useState, useEffect, useContext } from  "react"
import api from "../../api/axios.js"
import { AppContext } from '../../contexts/AppContext.jsx';
import { InputContext } from '../../contexts/InputContext.jsx';
import { SmallerComponentsContext } from "../../contexts/SmallerComponentsContext.jsx"

export function AIAssistant(props) {
    const {navigate, openSidebar} = props
    const { AddTask, } = useContext(AppContext)

    const {aiProject, noOfDays, todoId, inputDetails, prompt, setPrompt} = useContext(InputContext)

    const {setAddTodoShowing} = useContext(SmallerComponentsContext)
    
    const project_id = todoId

    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false);

    const projectNameStyling = {
        color: "blue",
        fontWeight: "bold"
    }

    const [buttonsDisplay, setButtonsDisplay] = useState(false)

    function handleSubmission(e){
        e.preventDefault()
        setLoading(true)

        const tempId = crypto.randomUUID()
        const userText = value

        // 1️⃣ show user message instantly
        const userEntry = {
            id: tempId,
            user_prompt: userText,
            ai_response: null,
            loading: true,
            project_id
        }

        setPrompt(prev => [...prev, userEntry])
        setValue("")
        
        const isSameProject =
        prompt.length &&
        prompt[prompt.length - 1].project_id === project_id;

        const lastPrompt = prompt[prompt.length - 1]
        
        const newPrompt = {
            "user_prompt":
                !isSameProject ? 
                `The task is ${aiProject}. ${userText}. please generate ${noOfDays} subtasks under this task, covering all intricate aspect. Let all the subtasks be short and straight to the point, squeeze all the details needed into 1 sentence for each task. let your response be in layman's terms.` :
                `Here are the previous subtasks: ${lastPrompt.ai_response}}. ${userText}. Regenerate them with better clarity and structure.Keep the SAME number of subtasks.`,
            project_id,
            'userText': userText
        }
        api.post('aiAssistant/', newPrompt, { timeout: 20000 })
        .then(res => {
            setPrompt(prev =>
                prev.map(p =>
                    p.id === tempId
                    ? {
                        ...p,
                        ai_response: res.data.ai_response,
                        loading: false
                    }
                    : p
                )
            )
        })
        .then(()=> {
            setButtonsDisplay(!buttonsDisplay)
        }    
        )
        .catch(err => {
            console.warn(err)
            setPrompt(prev =>
                prev.map(p =>
                    p.id === tempId
                    ? { ...p, ai_response: "AI took too long 😵‍💫", loading: false }
                    : p
                )
            )
        })
        .finally(()=>  setLoading(false))
    }

    function handleSave(input){
        api.post('savePrompt/', prompt[prompt.length -1])
        .then(() => {
            localStorage.removeItem("prompt")
            AddTask(input, true)
            navigate('/tasks')

        })
        .catch(err => console.log(err.response?.data || err.message))
        .finally(()=> setAddTodoShowing(true))
    }


    function handleDelete(){
        localStorage.removeItem("prompt")
        navigate('/tasks')
    }

    useEffect(()=>{
            localStorage.setItem("prompt", JSON.stringify(prompt))
    },[prompt])

    return(
        <main className={`ai-container ${openSidebar ? 'open-side-bar' : ''}`} >
            <div className="ai-card">
                <p className="prompt">Provide a detailed description of your task (<span style={projectNameStyling}>{aiProject}</span>).</p>
            </div>
            {
                prompt.filter(p => p.project_id === project_id).map((p)=>
                    <div key={p.id || p.interaction_id}>
                        <UserCard text={p.user_prompt}/>
                        <AICard 
                            requestResponsePair ={p}
                        /> 
                    </div>
                    
                )
            }
            {buttonsDisplay && <div className="ai-buttons-div">
                <button 
                    className="ai-save-button"
                    onClick={() => handleSave(inputDetails)}
                >Save</button>
                <button
                    className="ai-delete-button"
                    onClick={() => handleDelete()}
                >Delete</button>
                <button
                    className="ai-edit-button"
                    onClick={() => 
                        setButtonsDisplay(!buttonsDisplay)
                    }
                >Continue Editing</button>
            </div>}
            
            <AIInput
                value={value}
                setValue={setValue}
                handleSubmission={handleSubmission}
                loading={loading}
            />
        </main>
    )
}