import { FiClock } from "react-icons/fi";
import { FaTrash, FaEdit } from "react-icons/fa";
import api from "../api/axios";

export function TodoCard(props){
    const {todo,  setEditingTodo, setActiveCheckInId,  activeCheckInId, calculatePercentage, setUpdateDate, setOpenDeletePopUp, navigate, setTodos} =props

    const taskGroupColor = todo['task_group'] === "Personal" ? '138, 43, 226' : todo['task_group'] === "Office" ? '253, 115, 138' : '220, 147, 11'

    const statusColor = todo['status'] === "Not started" ? "255, 221, 0" : todo['status'] === "In progress" ? '255, 132, 0' : todo['status'] === "Completed" ? '0, 255, 68' : '255, 0, 0'
    
    let progressType = todo['task_group'] === "Personal" ? 'personal-task' : todo['task_group'] === "Office" ? 'office-task' : 'home-task'

    const percentage = calculatePercentage(todo)

    async function handleCompletion(){
        try{
            const res = await api.patch(`todos/${todo['id']}/`, {status: "Completed"})
            setTodos(prevTodos => {
                const updated = prevTodos.map(t =>
                    t["id"] === todo["id"] ? { ...t, status: "Completed" } : t
                )
                return updated;
            })  
        }catch(err){console.log(err)} 
    }

    return(
        <div 
            className="todo-card"
            
        >
            <div
                onClick={() => {
                        setActiveCheckInId(todo['id'])
                        if(todo['status'] === 'Completed'){
                            setActiveCheckInId(null)
                            alert('This task has been completed')
                            return
                        }
                        if(todo['ai_use'] && todo['status'] !== 'Not started'){
                            navigate('/tasks/subTasks')
                            return
                        }
                        if (activeCheckInId === todo['id']) {
                            // collapse if already open
                            setActiveCheckInId(null);
                            return
                            } 
                        // open the clicked card
                        if(todo['status'] === 'Not started'){
                            alert(`
                                This task will commence on ${
                                    new Date(todo.start_date)
                                    .toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "numeric", 
                                            month: "short", 
                                            year: "numeric" 
                                        }
                                    )
                                }
                            `)
                            return
                            }
                    
                }}
                style={{
                    display: "flex",
                    flexDirection: "column", 
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    height: "100%",
                    width: "80%",
                    paddingRight: "150px",
                }}>
                <p style={{
                        margin: "0",
                        fontSize: "18px"
                    }}
                >{todo['project_name']}</p>
                <p 
                    style={{
                        margin: "0",
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: `rgb(${taskGroupColor}`,
                        
                    }}
                >{todo['task_group']}</p>
                <div className="date-time-div">
                    <FiClock size={16} color="#2b43e2" />
                    <p 
                        className="date-time" style={{
                        margin: "0 10px"
                    }}
                >{todo['entry_date_time']}</p>
                </div>
                <progress className={progressType} value={percentage} max="100"></progress>
            </div>
            <div
                onClick={() => {

                        if (activeCheckInId === todo['id']) {
                        // collapse if already open
                        setActiveCheckInId(null);
                    } else {
                        // open the clicked card
                        setActiveCheckInId(todo['id']);
                    }
                }}
                style={{
                display: "flex",
                flexDirection: "column", 
                justifyContent: "space-between",
                alignItems: "center",
                height: "100%",
                width: "10%",}}
            >
                <div 
                    className="img-div"
                    style={{
                        backgroundColor: `rgba(${taskGroupColor}, 0.3)`,
                        
                    }}>
                    <img src={todo['task_group'] === 'Home' ? '/home.png' : todo['task_group'] === 'Office' ? '/city.png' : '/user.png'} alt={todo['task_group'] === 'Home' ? 'image of home' : todo['task_group'] === 'Office' ? '/city.png' : '/user.png'} /> 
                </div>
                <div 
                    className="status-div"
                    style={{
                        backgroundColor: `rgba(${statusColor}, 0.2)`
                    }}
                >
                    <p 
                    className="status"
                    style={{
                        color: `rgba(${statusColor}, 1)`
                    }}
                >{todo['status']}</p> 
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column", 
                    alignItems: "center",
                    height: "100%",
                    width: "10%"
                }}
            >
                <FaEdit 
                    size={18} 
                    color="#2b43e2" 
                    style={{ cursor: "pointer" }} 
                    onClick={() => {
                        if (todo.status !== 'Completed'){
                            setEditingTodo(todo)
                            navigate('/addTask')
                        }else{
                            alert('This task has already been completed')
                        }
                        
                    }} 
                />
                <FaTrash 
                    size={18} 
                    color="red" 
                    style={{ 
                        cursor: "pointer",
                        marginTop: "30px",
                    }} 
                    onClick={(e) => {
                        e.preventDefault()
                        setOpenDeletePopUp(todo)
                    }}
                />
                {todo['status'] === 'Exceeded' && <div>
                    <p 
                        className="date-extension"
                        onClick={()=>{
                            setUpdateDate(todo['id'])
                        }}
                    >
                        Change end date
                    </p>
                    <p
                        className="task-completed"
                        onClick={() => 
                            handleCompletion()
                        }
                    >
                        Task completed
                    </p>
                </div>}

            </div>

        </div>
    )
}