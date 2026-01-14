import { FaCheck } from "react-icons/fa"; // FontAwesome
import api from "../api/axios";

export function Calender(props){
    const {todo, getDateRange, checkedIn, today, setTodos, setCheckedIn} = props
    let num = 0
    

    return (
        <div 
            className={`calender grid-cols-[repeat(auto-fill,minmax(55px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(70px,1fr))] ml-0 md:ml-12 
                ${todo['ai_use'] && 'subtask_calender grid-columns-[repeat(auto-fill, minmax(70px, 1fr))] w-full Md:grid-columns-[repeat(auto-fill, minmax(100px, 1fr))] md:w-full' }`}
        >
            {(todo['start_date'] && todo['end_date'] ?
                getDateRange( todo['start_date'], todo['end_date']) : 
                []).map((date, dateIndex) => {
                    const alreadyCheckedIn = checkedIn.some(item => item.todo === todo['id'] && item.date === date.date)
                    num += 1
                    const formattedDate = new Date(date['full_date']).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short", year: "numeric" }
                    )

                    return (
                        <div 
                            key={dateIndex} 
                            className={`
                                calendar-box text-xs md:text-sm
                                ${date['full_date'] == today && "today-box"} 
                                ${todo['ai_use'] && 'subtask_calender_box text-sm  md:lg' }
                                `}
                            onClick={(e) =>  {todo['ai_use'] && 
                                e.preventDefault()
                                if(new Date(today) > new Date(date['full_date'])){
                                    alert(`You missed the check in for ${formattedDate}. `)
                                }else if(new Date(today) > new Date(date['full_date'])){
                                    alert(`You can only check in for today. Kindly click on the blue box to check in for today`)
                                }
                                if (date['full_date'] === today && !alreadyCheckedIn ){
                                    const checkInDetails = { 
                                        'date': date.date,
                                        'todo': todo['id'] 
                                    }
                                    api.post('checkIns/', checkInDetails)
                                    .then(res => {
                                        const newCheckedIn = [...checkedIn, res.data]; // after POST
                                        setCheckedIn(newCheckedIn);
                                        const dateList = todo['start_date'] && todo['end_date'] ? getDateRange(todo['start_date'], todo['end_date']) : [];
                                        if (newCheckedIn.filter(t => t['todo'] === todo['id']).length === dateList.length) {
                                            api.patch(`todos/${todo['id']}/`, {status: "Completed"})
                                            .then(res => 
                                                setTodos(prevTodos => {
                                                    const updated = prevTodos.map(t =>
                                                    t["id"] === todo["id"] ? { ...t, status: "Completed" } : t
                                                    )
                                                    return updated;
                                                })
                                            ).catch(err => console.log(err))
                                        }
                                    }).catch(err => console.log(err))
                                }
                            }}
                        >
                            <p className="date">{new Date(date.full_date).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short", year: "numeric" }
                    )}</p>
                            {
                                alreadyCheckedIn &&
                                <div className="check">
                                    <FaCheck 
                                        className={` ${todo['ai_use'] ? 
                                        'ai-calender-check absolute left-4': 'calender-check absolute left-6'}`}
                                        size={todo['ai_use'] ? 47 : 29}
                                    />
                                </div>         
                            }
                        </div>
                                            
                    );
                }
            )}
                                    
        </div>
    )
}