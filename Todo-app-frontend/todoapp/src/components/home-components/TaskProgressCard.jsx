export function TaskProgressCard(props){
    const {todo, checkedIn, getDateRange, setClickedTab, setActiveCheckInId, navigate} = props
    let progressType = todo['task_group'] === "Personal" ? 'personal-task' : todo['task_group'] === "Office" ? 'office-task' : 'home-task'
    const dateList = todo['start_date'] && todo['end_date'] ?
                        getDateRange( todo['start_date'], todo['end_date']) : [];
    const noOfDays = dateList.length
    const noOfCheckIns = checkedIn.filter((input) => input.todo === todo['id']).length
    const progressValue = (noOfCheckIns / noOfDays) * 100
    const displayedProgressValue = progressValue < 0 ? 0 : progressValue

    return( 
        <div 
            className="task-progress-card w-full md:w-1/4"
            onClick={()=>{
                setClickedTab('In progress')
                setActiveCheckInId(todo['id'])
                navigate('/tasks')
            }}
        >
            <p className="task-group-name" >
                {todo['task_group']}
            </p>
            <p className="project-name">
                {todo['project_name']}
            </p>
            <progress className={progressType} value={displayedProgressValue} max="100">
            </progress>
        </div>
    )
}