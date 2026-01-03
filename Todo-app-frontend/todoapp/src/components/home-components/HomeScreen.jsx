import { useState, useEffect, useContext } from 'react';
import { TaskProgressCard } from './TaskProgressCard';
import { TaskGroupCards } from './TaskGroupCards';
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
            className={openSidebar ? 'open-side-bar' : ''}
            onClick={()=> setOpenNotificationPopUp(false)}
        >
            <p 
                className='title'
                style={{
                    marginBottom: "10px"
                }}
            > Hello {username}, welcome back!</p >
            <section className='task-summary'>
                <div>
                    <p className='task-update'>{taskUpdate}</p>
                    <button 
                    
                        className='view-task-button'
                        onClick={()=>{
                            navigate('/tasks')
                        }}
                    >View Task</button>
                </div>
                <div className='general-progress-bar'>
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
                <h2>In Progress</h2>
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
                <h2>Task Group</h2>
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