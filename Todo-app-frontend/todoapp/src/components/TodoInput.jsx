import { useState, useContext, useEffect } from "react"
import { AppContext } from "../contexts/AppContext"
import { InputContext } from "../contexts/InputContext"
import '../InputScreen.css'
import {v4 as uuidv4} from "uuid"

export function TodoInput(props){
    const {AddTask, today, editingTodo} = useContext(AppContext)
    
    const {projectName, setProjectName, startDate, setStartDate, endDate, setEndDate, noOfDays, setAiProject, inputDetails, selectedTaskGroup, setSelectedTaskGroup, intensity, setIntensity, setTodoId} = useContext(InputContext)
    
    const {navigate, openSidebar, token} = props

    const formattedStartDate = new Date(startDate).toLocaleDateString(
        "en-GB",
        { day: "numeric", month: "short", year: "numeric" }
    );

    const formattedEndDate = new Date(endDate).toLocaleDateString(
        "en-GB",
        { day: "numeric", month: "short", year: "numeric" }
    );

    useEffect(() => {
        if (editingTodo) {
            setProjectName(editingTodo.project_name);
            setStartDate(editingTodo.start_date);
            setEndDate(editingTodo.end_date);
            setSelectedTaskGroup(editingTodo.task_group);
            setIntensity(editingTodo.intensity);
        }else {
            setProjectName('');
            setStartDate('');
            setEndDate('');
            setSelectedTaskGroup('');
            setIntensity('');
        }
}, [editingTodo]);


    useEffect(()=>{
        projectName && startDate && endDate && !editingTodo ? setTodoId(uuidv4()) : setTodoId('')
    },[projectName, startDate, endDate])

    return(
        <main className={openSidebar ? 'open-side-bar' : ''}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '0'
            }}>
                <p>Add Tasks</p>
            </div>
            <form method="POST" action="/tasks/">
                <div className="input-field">
                    <label htmlFor="dropdown" className="entry-label">Task Group</label>
                    <select 
                        className="entry-field"
                        name="dropdown" 
                        id="dropdown" 
                        value={selectedTaskGroup}
                        onChange={(event) => {
                        event.preventDefault()
                            setSelectedTaskGroup(event.target.value)
                        }}
                        required
                    >
                        <option value="">--Select an option--</option>
                        <option value="Personal">Personal</option>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                    </select>
                </div>
                <div className="input-field">
                    <label htmlFor="projectName" className="entry-label">Project Name</label>
                    <input 
                        className="entry-field" 
                        type="text" 
                        name="projectName" 
                        id="projectName" 
                        value={projectName}
                        onChange={(event) => {
                        event.preventDefault()
                setProjectName(event.target.value)
                        }}
                        required
                        
                    />   
                </div>
                <div className="input-field">
                    <label htmlFor="startDate" className="entry-label">Start date</label>
                    <input 
                        type="date"     name="startDate"    id="startDate" 
                        className="entry-field"
                        value={startDate}
                        min={today}
                        onChange={(event) => {
                        event.preventDefault()
                    setStartDate(event.target.value)
                        }}
                        disabled={!!editingTodo?.ai_use}
                        required
                    />
                </div>
                <div className="input-field">
                    <label htmlFor="endDate" className="entry-label">End Date</label>
                    <input 
                        type="date" 
                        name="endDate"  
                        id="endDate" 
                        min={today}
                        className="entry-field"
                        value={endDate}
                        onChange={(event) => {
                        event.preventDefault()
                    setEndDate(event.target.value)
                        }}
                        disabled={!!editingTodo}
                        required
                    />
                </div>

                <div className="input-field intensity">
                    <label htmlFor="intensity"
                    >Intensity</label><br/>
                    <div>
                        <input type="button" 
                            value="High" 
                            id="intensity" 
                            name="intensity" 
                            className={`
                                high-button
                                ${intensity === "High" ?
                                "high-clicked-intensity" :
                            ""}`}
                            onClick={() => {
                                setIntensity('High')
                            }}
                            
                        />
                    <input 
                        type="button" 
                        value="Medium" 
                        id="intensity" 
                        name="intensity" 
                        className={`medium-button
                        ${intensity === "Medium" ?
                            "medium-clicked-intensity" :
                            ""}`}
                        onClick={() => {
                            setIntensity('Medium')
                        }}
                    />
                    <input 
                        type="button" 
                        value="Low" 
                        id="intensity" 
                        name="intensity" 
                        className={`low-button
                            ${intensity === "Low" ?
                            "low-clicked-intensity" :
                        ""}`}
                        onClick={() => {
                            setIntensity('Low')
                        }}
                    /> 
                    </div>
                    
                </div>
                {(selectedTaskGroup && intensity && projectName && noOfDays > 1 )&& <article className="ai-assistant-instruction">
                    <p className="proceed-instruction">
                        Click <span className="instruction-span">Add Task</span>  to add it manually, or click <span className="instruction-span">AI Assistant</span>  to auto-split it across {noOfDays} days (from {formattedStartDate} to {formattedEndDate}).
                    </p>
                </article>}
                    
                <div className="add-task-button-div">
                    {(selectedTaskGroup && intensity && projectName && noOfDays > 1 )&&<button 
                        type="button"
                        className="AI-button"
                        onClick={()=>{
                            if(!token){
                                alert('Login to use AI Assistant')
                                return
                            }
                            navigate('/aiAssistant')
                            setAiProject(projectName)
                        }}
                    >
                        AI Assistant
                    </button>}
                    <input 
                    type="submit" 
                    value="Add Task" 
                    className={`
                        add-task-button 
                        ${(selectedTaskGroup && intensity && projectName && noOfDays > 1 ) ? 'ai-included' : ''}
                    `}
                    onClick={(e) => {
                        e.preventDefault()
                        if(!intensity){
                            alert("Kindly click an intensity");
                            return;
                        }
                        
                        if(!token){
                            navigate('/login')
                            return
                        }
                        AddTask(inputDetails, false)
                            
                        navigate('/tasks')
                    }}
                />
                </div>
                
                
            </form>
        </main>
    )
}