import { useState, useEffect, useContext } from 'react';
import { TaskProgressCard } from './TaskProgressCard.jsx';
import { TaskGroupCards } from './TaskGroupCards.jsx';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AppContext } from '../../contexts/AppContext.jsx';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { SmallerComponentsContext } from '../../contexts/SmallerComponentsContext.jsx';

export function HomeScreen(props) {

    const {navigate, openSidebar} = props;

    const {username} = useContext(AuthContext)

    const {todos, setTodos, NoOfCheckedDays, NoOfDays, checkedIn, setSearchValue, getDateRange, setClickedTab, setActiveCheckInId} = useContext(AppContext);

    const {setAddTodoShowing, setHeaderShowing, setOpenNotificationPopUp} = useContext(SmallerComponentsContext)

    const [taskUpdate, setTaskUpdate] = useState('')

    const noOfCheckedDays = NoOfCheckedDays(checkedIn, todos)
    const noOfDays = NoOfDays(todos)  
    
    let rangePercentage = Math.round((noOfCheckedDays / noOfDays) * 100)
    if (rangePercentage > 0){
        rangePercentage 
    }else {
        rangePercentage = 0
    }

    const taskGroup = ['Office', 'Home', 'Personal']

    // update message whenever progress changes
    useEffect(() => {
        let message =
            rangePercentage === 50
                ? "Halfway there! Don’t lose the vibe 🔥"
                : rangePercentage < 50
                ? "You’ve got this! Keep grinding 💪✨"
                : "You’re so close! Finish strong 💯🚀🙌";

        setTaskUpdate(message);
    }, [rangePercentage]);

    useEffect(()=>{
        setHeaderShowing(true)
        setAddTodoShowing(true)
    }, [])
    
    return(
        <main 
            className={openSidebar && 'open-side-bar  ml-[13%] sm:ml-[15%]'}
            onClick={()=> setOpenNotificationPopUp(false)}
        >
            <h2 
                className='title '
            > Hello {username}, welcome back!</h2 >
            <section 
                className='task-summary p-10 flex-col md:pw-60 md:p-20 sm:flex-row'
            >
                <div className='flex-col md:flex-col'>
                    <p className='task-update text-center md:text-start'>{taskUpdate}</p>
                    <button 
                        className='view-task-button ml-4 mr-4 md:ml-0 md:ml-0'
                        onClick={()=>{
                            navigate('/tasks')
                        }}
                    >View Task</button>
                </div>
                <div 
                className='w-1/2 mt-10 sm:w-24 md:mt-0'>
                    <CircularProgressbar 
                        value={rangePercentage}            
                        text={`${rangePercentage}%`}
                        styles={buildStyles({
                            pathColor: "#fdfdfdff",
                            textColor: "rgb(97, 97, 102)",
                            trailColor: "#ddd",
                        })}
                    /> 
                </div>
            </section>
            <section className='in-progress'>
                <h2
                    style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                        marginBottom: "10px"
                    }}
                >In Progress</h2
                >
                {
                    todos.some(todo => todo.status === 'In progress') ? 
                    <div className='scrollable-div' >
                    {todos.filter(todo => todo.status === 'In progress').map((todo, todoIndex) => 
                        <TaskProgressCard 
                            key={todoIndex} 
                            todo={todo}
                            checkedIn={checkedIn}
                            getDateRange={getDateRange}
                            setClickedTab={setClickedTab}
                            setActiveCheckInId={setActiveCheckInId}
                            navigate={navigate}
                        />
                    )}
                </div> :
                <p
                    style={{ textAlign: "center", marginTop: "40px", color: "#777" }}
                >
                    No task in progress 😭...
                </p>
                }
                
            </section>
            <section>
                <h2
                    style={{
                        fontWeight: "bold",
                        fontSize: "24px",
                        marginBottom: "10px"
                    }}
                >Task Group</h2>
                    {taskGroup.map((group, groupIndex) => {
                        return <TaskGroupCards 
                            key={groupIndex} 
                            taskGroup={group}
                            todos={todos}
                            setTodos={setTodos}
                            checkedIn={checkedIn}
                            NoOfCheckedDays={NoOfCheckedDays}
                            NoOfDays={NoOfDays}
                            setSearchValue={setSearchValue}
                            navigate={navigate}
                        />
                    }
                    )}
            </section>
        </main>
    )
}