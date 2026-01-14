import { useEffect, useRef, useState } from "react";
import { Tabs } from "./Tabs.jsx";
import {TodoCard} from "./TodoCard.jsx"
import '../TasksScreen.css'
import { Calender } from "./Calender.jsx";
import { Search } from "./Search.jsx";
import api from "../api/axios.js";
import { DeletePopUp } from "./DeletePopUp.jsx";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext.jsx";
import { SmallerComponentsContext } from "../contexts/SmallerComponentsContext.jsx";

export function TasksScreen(props){
    const { today, checkedIn, setCheckedIn, getDateRange, setTodos, clickedTab, setClickedTab, activeCheckInId, setActiveCheckInId, setEditingTodo, searchValue, setSearchValue, calculatePercentage, updateDate, setUpdateDate, deleteTask} = useContext(AppContext)

    const {openDeletePopUp, setOpenDeletePopUp, openSidebar, justStartedClicked, endingTodayClicked, setOpenNotificationPopUp, setAddTodoShowing} = useContext(SmallerComponentsContext)

    const {navigate} = props

    const refs = useRef({})

    const [newDate, setNewDate] = useState('')

    const [highlight, setHighlight] = useState(false)

    const searchDiv = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: "20px",
        height: "45px"
    }   

    function extendTask(todoId, newEndDate) {
        api.patch(`todos/${todoId}/`, {
            start_date: today,
            end_date: newEndDate,
            status: "In progress" 
        })
        .then(() => {
            setTodos(prev =>
            prev.map(t =>
                t.id === todoId
                    ? { 
                        ...t, 
                        start_date: today,
                        end_date: newEndDate,
                        status: "In progress" 
                    }
                    : t
            )
        )
        })
        ;
        setCheckedIn(prev =>
            prev.filter((task) => task.todo !== todoId)
        )
    }

    useEffect(()=>{
        setAddTodoShowing(true)
        setEditingTodo(null)
    }, [])

    useEffect(()=>{
        if(!(justStartedClicked || endingTodayClicked)) return
        setHighlight(true);

        const timeout = setTimeout(() => {
            setHighlight(false);
        }, 2000); // highlight for 2s (adjust as needed)

        return () => clearTimeout(timeout);
    }, [justStartedClicked, endingTodayClicked])

    useEffect(() => {
        todos.forEach(todo => {
            if (todo.start_date === today && todo.status !== "Completed") {
                
                api.patch(`todos/${todo.id}/`, {
                    status: "In progress"
                })
                .then(res => {
                    setTodos(prev => 
                    prev.map(t => 
                        t.id === todo.id
                        ? { ...t, status: "In progress" }
                        : t
                    )
                    );
                    
                })
                .catch(err => console.log(err));
            }
        });
    }, [today]);

    useEffect(() => {
        todos.forEach(todo => {
            if (new Date(today) > new Date(todo["end_date"]) && todo.status !== "Completed") {
            api.patch(`todos/${todo.id}/`, {
                status: "Exceeded"
            })
            .then(res => {
                setTodos(prev => 
                prev.map(t => 
                    new Date(today) > new Date(t["end_date"]) && t.status !== "Completed"
                    ? { ...t, status: "Exceeded" }
                    : t
                )
                );
            })
            .catch(err => console.log(err));
            }
        });
    }, [today]);

    
    useEffect(() => {
        if (activeCheckInId && refs.current[activeCheckInId]) {
            refs.current[activeCheckInId].scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }, [activeCheckInId]);


    return(
        <main 
            className={`
                px-10 md:px-30
                ${openSidebar && 
                'open-side-bar'} 
            `}
            onClick={()=> setOpenNotificationPopUp(false)}
        >
            <div style={searchDiv}>
                <Search
                    todos={todos}
                    setTodos={setTodos}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
            </div>
            
            <Tabs 
                clickedTab={clickedTab}           
                setClickedTab={setClickedTab}
                todos={todos}
                openSidebar={openSidebar}
            />
            <p className="check-in-instruction">
                Click on each task to check-in for today!
            </p>
            <div className="todo-list">
                {
                    todos.length === 0 ? (
                        <p style={{ textAlign: "center", marginTop: "40px", color: "#777" }}>
                        No tasks found 😭
                        </p>
                    ) : 
                    (todos ? todos : []).filter((todo)=>
                        clickedTab === "All" || todo['status'] === clickedTab
                    ).map((todo, todoIndex) => {
                        return (

                            <div 
                                ref={element => refs.current[todo['id']] = element}
                                className={`
                                    ${activeCheckInId === todo['id'] && !todo['ai_use']? "expanded-todo-card w-full md:w-2/5w-full md:w-2/5 flex-col  justify-center  md:flex-row justify-start" : "contracted-todo-card"} 
                                    ${highlight &&(justStartedClicked || endingTodayClicked)   ? 'highlight' : ''}
                                `}
                                key={todo.id}
                            >
                                <TodoCard  
                                    todo={todo}
                                    activeCheckInId={activeCheckInId}
                                    setActiveCheckInId={setActiveCheckInId}
                                    calculatePercentage={calculatePercentage}
                                    checkedIn={checkedIn}
                                    setUpdateDate={setUpdateDate}
                                    setEditingTodo={setEditingTodo}
                                    setOpenDeletePopUp={setOpenDeletePopUp}
                                    setTodos={setTodos}
                                    navigate={navigate}
                                />
                                {openDeletePopUp && <DeletePopUp
                                    deleteTask={deleteTask}
                                    setOpenDeletePopUp={setOpenDeletePopUp}
                                    openDeletePopUp={openDeletePopUp}
                                />}
                                {(activeCheckInId === todo['id'] && !todo['ai_use']) && 
                                <div>
                                    <p className="check-in-instruction specific-instruction text-sm md:text-lg">Click today's date to check in</p>
                                    <Calender
                                    todo={todo}
                                    getDateRange={getDateRange}
                                    checkedIn={checkedIn}
                                    today={today}
                                    setTodos={setTodos}
                                    setCheckedIn={setCheckedIn}
                                />
                                </div>
                                }
                                {
                                    (updateDate === todo['id'] && today > todo['end_date']) && 
                                    <div>
                                        <input
                                            className="text-sm Md:text-lg"
                                            type="date" 
                                            name="update-date"
                                            min={today}
                                            id="update-date"
                                            value={newDate} 
                                            onChange={(e)=>{
                                                const value = e.target.value
                                                setNewDate(value)
                                                extendTask(todo['id'], value)
                                            }}
                                        />
                                    </div>
                                }
                            </div>
                        ) 
                    }).reverse()    
                }
            </div>
            
        </main>
    )
}
