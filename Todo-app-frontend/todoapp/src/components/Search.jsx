import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import api from "../api/axios";

export function Search(props){
    const {todos, searchValue, setSearchValue, setTodos} = useContext(AppContext)

    async function fetchTodos(){
        try{
            const res = await api.get('todos/')
            setTodos(res.data)
        }catch(err){
            console.log(err)
        } 
    }

    const handleChange = (e) => {
        const value =  e.target.value;
        setSearchValue(value);
        console.log(searchValue)

        if(!value){
            fetchTodos()
        }

        // Filter todos by Project name or Task group
        const filteredTasks = todos
            .filter(todo =>
                todo["project_name"].toLowerCase().includes(value.toLowerCase()) ||
                todo["task_group"].toLowerCase().includes(value.toLowerCase())
        )
        .sort((a, b) => {
            const searchLower = value.toLowerCase();

            // Check if Project Name starts with search text
            const aStarts = a["project_name"].toLowerCase().startsWith(searchLower) || 
                            a["task_group"].toLowerCase().startsWith(searchLower);
            const bStarts = b["project_name"].toLowerCase().startsWith(searchLower) || 
                            b["task_group"].toLowerCase().startsWith(searchLower);

            if (aStarts && !bStarts) return 1; // a goes first
            if (!aStarts && bStarts) return -1;  // b goes first
            return 0; // keep relative order for others
        });
            setTodos(filteredTasks)
        
    }

    return(
            <input 
                className="search-bar" 
                type="search" 
                placeholder="Search" 
                value= {searchValue}
                onChange={handleChange}
            />            
    )
}