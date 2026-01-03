import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export function TaskGroupCards(props){
    const {todos, taskGroup, checkedIn,  NoOfCheckedDays, NoOfDays, setTodos, navigate} =props
        const taskGroupColor = taskGroup === "Personal" ? '138, 43, 226' : taskGroup === "Office" ? '253, 115, 138' : '220, 147, 11'

        const taskGroupImage = taskGroup === "Personal" ? '/user.png' : taskGroup === "Office" ? '/city.png' : '/home.png'

        const taskGroupDescription = taskGroup === "Personal" ? 'image of a user' : taskGroup === "image depicting work" ? 'image of a city' : 'image depicting home'

        const filteredTasks = todos.filter(todo => todo['task_group'] === taskGroup)


        const noOfCheckedDays = NoOfCheckedDays(checkedIn, filteredTasks)
        const noOfDays = NoOfDays(filteredTasks)


        const noOfTasks = filteredTasks.length

        const displayedNoOfTasks = noOfTasks < 1 ?
            'no' : todos.filter(todo => todo['task_group'] === taskGroup).length

        
        
        let rangePercentage = Math.round((noOfCheckedDays / noOfDays) * 100);

        if (rangePercentage > 0){
        rangePercentage 
    }else {
        rangePercentage = 0
    }

        const taskOrTasks = displayedNoOfTasks < 2 ? 'task' : displayedNoOfTasks === 'no'? 'task' : 'tasks'
        

    return(
        <div 
            className="task-group-div"
            onClick={() => {
                setTodos(
                    todos.filter(todo =>
                    todo["task_group"] === taskGroup
                ))
                navigate('/tasks')
            }}
        >
            <div style={{display: "flex", alignItems: "center"}} >
                <div className="img-div" style={{backgroundColor: `rgba(${taskGroupColor}, 0.3)`}}>
                    <img src={taskGroupImage} alt={taskGroupDescription} />
                </div>
                <div>
                    <p style={{
                            margin: "2px",
                            fontSize: "16px"
                        }}>{taskGroup}</p>
                    <p style={{
                            margin: "2px",
                            fontSize: ""
                        }}>{displayedNoOfTasks} {taskOrTasks}</p>
                </div>
            </div>
            <div className="task-group-progress-bar">
                <CircularProgressbar 
                        value={rangePercentage}   
                        text={`${rangePercentage}%`}
                        styles={buildStyles({
                            pathColor: `rgba(${taskGroupColor}, 1)`,
                            textColor: "rgb(97, 97, 102)",
                            trailColor: "#ddd",
                        })}
                    />
            </div>
        </div>
    )
}