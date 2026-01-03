import { createContext, useState } from "react";
import api from "../api/axios";

export const AppContext = createContext();
export function AppContextProvider({children}){

    const now = new Date()
    const today = now.toISOString().split("T")[0];
    
    const [editingTodo, setEditingTodo] = useState('');

    const [todos, setTodos] = useState(()=> {
        const saved = localStorage.getItem('todos')
        return saved ? JSON.parse(saved) : []
    })

    const [searchValue, setSearchValue, ] = useState('')    
    const [clickedTab, setClickedTab] = useState('All') 
    const [activeCheckInId, setActiveCheckInId] = useState(null)

    const [aiAssistClicked, setAiAssistClicked] = useState(false)

    const [updateDate, setUpdateDate] = useState(null)

    function calculatePercentage(todo) {
        const todoCheckIns = checkedIn.filter(item => item.todo === todo.id).length;
        const totalDates = todo['start_date'] && todo['end_date'] ? getDateRange(todo['start_date'], todo['end_date']).length : 0;
        return totalDates > 0 ? Math.round((todoCheckIns / totalDates) * 100) : 0;
    }

    async function AddTask(input, ai){
        const {selectedTaskGroup, projectName, startDate, endDate, intensity, status, project_id} = input
        let entryDateAndTime ;     
        
        if(today === startDate){
        entryDateAndTime = now.toLocaleTimeString()
        }else{
        entryDateAndTime = now.toLocaleString()
        }

        const updatedTodo = {
        'task_group': selectedTaskGroup,
        'project_name': projectName,
        'start_date': startDate,
        'end_date': endDate,
        'intensity': intensity,
        'status': status,
        'entryDateAndTime': entryDateAndTime
        }

        const newTodo = {
        'task_group': selectedTaskGroup,
        'project_name': projectName,
        'start_date': startDate,
        'end_date': endDate,
        'intensity': intensity,
        'status': status,
        'entry_date_time': entryDateAndTime,
        'ai_use': ai,
        'project_id': project_id
        }
        try {
            if (editingTodo) {
                const res = await api.patch(
                    `todos/${editingTodo.id}/`,
                    updatedTodo);
                setTodos(prev => prev.map(todo => todo.id === editingTodo.id ? { ...todo, ...res.data } : todo));
            } else {
                const res = await api.post(
                    'todos/',
                    newTodo);
                setTodos(prev => [...prev, res.data]);
            }
            setEditingTodo(null);
        } catch (err) {
            console.error(err);
            alert('Error saving todo. Please try again.');
        }  
    }

    function deleteTask(task){
        api.delete(`todos/${task.id}/`)
        .then(res => {
            setTodos((prev)=>
            prev.filter((todo) => todo['id'] !== task.id)
        )})
        .catch(err => console.log( err))
        api.delete(`checkIns/deleteTodo/${task.id}/`)
        .then(res => {
            setCheckedIn((prev)=>
            prev.filter((checkIn) => checkIn.todo !== task.id)
        )})
        .catch(err => console.log( err))
    
        if(!task.ai_use) return
        api.delete(`chatMessage/deleteTodo/${task.project_id}/`)
        .catch(err => console.log( err))
    }

    function getDateRange(start, end) {
        const dates = [];
        const start_date = new Date(start);
        const end_date = new Date(end);
        
    
        let current = new Date(start_date) ;
    
        while (current <= end_date) {
            dates.push({
                'full_date' : new Date(current).toISOString().split("T")[0],
                'date' : new Date(current).getDate(),
            }); 
            current.setDate(current.getDate() + 1);
        }
    
        return dates;
    }

    const [checkedIn, setCheckedIn] = useState([])


    function NoOfCheckedDays(checkedIn, todos) {
        if (!checkedIn || !todos || todos.length === 0) return 0;

        return todos.reduce((total, todo) => {
        const count = checkedIn.filter(ci => ci.todo === todo.id).length;
        return total + count;
        }, 0);
    }


    function NoOfDays(todos) {
        if (!todos || todos.length === 0) return 0;

        return todos.reduce((total, todo) => {
        if (!todo.start_date || !todo.end_date) return total;

        const start = new Date(todo.start_date);
        const end = new Date(todo.end_date);
        const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1; // inclusive of start & end
        return total + diffDays;
        }, 0);
    }
    return(
        <AppContext.Provider 
            value={{
                todos, 
                setTodos, 
                searchValue, 
                setSearchValue, 
                clickedTab, 
                setClickedTab, 
                activeCheckInId, 
                setActiveCheckInId, 
                editingTodo, 
                setEditingTodo, 
                AddTask, 
                today, 
                deleteTask,
                checkedIn, 
                setCheckedIn, 
                NoOfCheckedDays, 
                NoOfDays, 
                getDateRange,
                aiAssistClicked, 
                setAiAssistClicked,
                calculatePercentage,
                updateDate, 
                setUpdateDate,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}