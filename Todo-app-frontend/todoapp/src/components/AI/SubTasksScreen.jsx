import { Calender } from "../Calender"
import "../../SubTasksScreen.css"
import { SubTask } from "./SubTask"
import { useContext, useEffect, useState, useMemo } from "react"
import { AppContext } from "../../contexts/AppContext"
import { SmallerComponentsContext } from "../../contexts/SmallerComponentsContext"
import { InputContext } from "../../contexts/InputContext"
import api from "../../api/axios"

export function SubTaskScreen(props){
    const {prompt, setPrompt} = useContext(InputContext)

    const {activeCheckInId, checkedIn, getDateRange, today, setTodos, setCheckedIn} = useContext(AppContext)

    const {setOpenNotificationPopUp, openSidebar} = useContext(SmallerComponentsContext)
    

    const [todo, setTodo] = useState(() => {
        try {
            const saved = localStorage.getItem("todo")
            if (!saved || saved === "undefined"){
                return null
            }else{
                setTodo(JSON.parse(saved))
                setTodoLoading(false)
            }
        } catch {
            return null
        }
    })

    const [todoLoading, setTodoLoading] = useState(true)

    const taskGroupColor = todo?.task_group === "Personal" ? '138, 43, 226' : todo?.task_group === "Office" ? '253, 115, 138' : '220, 147, 11'

    const formattedStartDate = new Date(todo?.start_date).toLocaleDateString(
        "en-GB",
        { day: "numeric", month: "short", year: "numeric" }
    );

    const formattedEndDate = new Date(todo?.end_date).toLocaleDateString(
        "en-GB",
        { day: "numeric", month: "short", year: "numeric" }
    );

    const project_id = todo?.project_id

    const aiResponse = prompt?.at(-1)?.ai_response;
    
    const subtasks = useMemo(() => {
    if (!aiResponse) return null;
        return aiResponse
            .split(/\d+\./)
            .map((s) => s.trim())
            .slice(1)
            .filter((s) => s.length > 0)
            .map((s) => s.replace(/^\**/g, ""));
    }, [aiResponse]);

    const dateList = useMemo(
        () => getDateRange(todo?.start_date, todo?.end_date),
        [todo?.start_date, todo?.end_date, getDateRange]
    );

    function handleCheckIn(e, date) {
        e.preventDefault();

        // Build the check-in object
        const checkInDetails = {
            date: date,       // assuming you want to check in for today
            todo: todo.id
        };

        api.post('checkIns/', checkInDetails)
            .then(res => {
                // Update checkedIn state
                const newCheckedIn = [...checkedIn, res.data];
                setCheckedIn(newCheckedIn);

                // Check if all dates are completed
                
                if (newCheckedIn.filter(t => t.todo === todo.id).length === dateList.length) {
                    api.patch(`todos/${todo.id}/`)
                        .then(() => {
                            setTodos(prevTodos => prevTodos.map(t =>
                                t.id === todo.id ? { ...t, status: "Completed" } : t
                            ));
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (!project_id) return

        api.get('savePrompt/', {params: {project_id}})
        .then(res => setPrompt(res.data))
        .catch(err => console.log(err))
    }, [project_id])

    useEffect(() => {
        if (!activeCheckInId) {
            setTodoLoading(false)
            return
        }
        setTodoLoading(true)

        api.get(`todos/${activeCheckInId}/`)
            .then(res => {
                setTodo(res.data)
                localStorage.setItem("todo", JSON.stringify(res.data))
            })
            .finally(() => setTodoLoading(false))
    }, [activeCheckInId]);
console.log(todo)

    return(
        <main 
            className={openSidebar ? 'open-side-bar' : ''}
            onClick={()=> setOpenNotificationPopUp(false)}
        >
            
            {
                !todoLoading && todo ? 
                <>
                    <>
                        <div
                        className="mb-5 md:mb-0"
                        style={{
                            display: "flex"
                        }}
                        >
                            <p className="title text-lg md:text-xl">{todo['project_name']}</p>
                            <p
                                className="text-sm md:text-lg"
                                style={{
                                    color: `rgb(${taskGroupColor})`
                                }}
                            >{todo['task_group']}</p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "18px"
                            }}
                        >
                            <p>{formattedStartDate}</p>
                            <p>{formattedEndDate}</p>
                        </div>
                    </>
                    <Calender
                        todo={todo}
                        checkedIn={checkedIn}
                        today={today}
                        getDateRange={getDateRange}
                        setTodos={setTodos}
                        setCheckedIn={setCheckedIn}
                    />
                    {subtasks ? 
                    <p
                        className="check-in-instruction"
                    >
                        Click on each subtask to check-in
                    </p>:
                    <p>Loading subtasks...</p>
                    }
                    {subtasks && subtasks.map((subtask, index) => {
                        const date = dateList[index]
                        return <SubTask
                        key={index}
                        subtask={subtask}
                        handleCheckIn={handleCheckIn}
                        date={date}
                        today={today}
                    />   
                    }
                        
                    )}
                </>:
                <p>loading task...</p>
            }         
        </main>
    )
}