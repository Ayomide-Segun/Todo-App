import { FaPlus } from "react-icons/fa";
import { SmallerComponentsContext } from "../contexts/SmallerComponentsContext";
import { useContext } from "react";

export function AddTodo(props){
    const {onClick, navigate} = props
    const {setAddTodoShowing} = useContext(SmallerComponentsContext)
    return(
        <div 
        className="add-todo w-20 h-20 bottom-14 rounded-full" 
        onClick={() =>{
            onClick
            setAddTodoShowing(false)
            navigate('/addTask')
        }}>
            <FaPlus color="white" 
                style={{
                    margin: "auto",
                    height: "50px",
                    pointerEvents: "none"
                }}
            />
        </div>
    )
}