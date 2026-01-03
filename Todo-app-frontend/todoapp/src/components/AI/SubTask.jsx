import {useState} from 'react'
import "../../SubTasksScreen.css"


export function SubTask(props){
    const { subtask, handleCheckIn, date, today} = props

    const [clickedSubTask, setClickedSubTask] = useState(false)
    const formattedDate = new Date(date['full_date']).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short", year: "numeric" }
                    )

    return(
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "40px"
            }}
        >
            <div 
                className={`
                    sub-task-card ${clickedSubTask ? "expand-card" : "contract-card"}
                `}
                onClick={(e) => {
                    e.preventDefault()
                    setClickedSubTask(!clickedSubTask)
                }}
            >
                <p>{subtask}</p>
            </div>
            {clickedSubTask && <div
                style={{
                    width: "10%",
                    margin: "auto"
                }}
            >
                <button
                    className='check-in-button'
                    onClick={(e) => {
                        if(date.full_date === today ){
                            handleCheckIn(e, date.date)
                            setClickedSubTask(false)
                        }else if(new Date(today) > new Date(date['full_date'])){
                            alert(`You missed the check in for ${formattedDate}`)
                        }else{
                            alert(`You can only check in for today. Kindly click on the blue box to check in for today`)
                        }
                        
                    }}
                >
                    Check in
                </button>
            </div>}
        </div>
    )
}