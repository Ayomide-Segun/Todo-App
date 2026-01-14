import { createContext, useState, useContext} from "react";
import { AppContext } from "./AppContext";

export const SmallerComponentsContext = createContext();
export function SmallerComponentsContextProvider({children}){

    const {todos} = useContext(AppContext)

    const [openSidebar, setOpenSidebar] = useState(false)
    const [openDeletePopUp, setOpenDeletePopUp] = useState(null)
    const [hidden, setHidden] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0)

    const [headerShowing, setHeaderShowing] = useState(true)
    const [addTodoShowing, setAddTodoShowing] = useState(true)

    let exceededTasksValue = todos.filter((t)=> t.status === 'Exceeded').length
    let exceededTasks = Number(
        JSON.parse(localStorage.getItem("exceeded")) 
    ) || 0
    const [exceededTasksClicked, setExceededTasksClicked] = useState(false)

    const [justStarted, setJustStarted] = useState(() => {
            const saved = localStorage.getItem("justStarted")
            return saved ?
            JSON.parse(saved) :
            ''
        })
    const [justStartedClicked, setJustStartedClicked] = useState(false)

    const [endingToday, setEndingToday] = useState(() => {
            const saved = localStorage.getItem("ending")
            return saved ?
            JSON.parse(saved) :
            ''
        })
    const [endingTodayClicked, setEndingTodayClicked] = useState(false)

    const [highIntensity, setHighIntensity] = useState(() => {
            const saved = localStorage.getItem("highIntensity")
            return saved ?
            JSON.parse(saved) :
            ''
    })

    const [lowIntensity, setLowIntensity] = useState(() => {
            const saved = localStorage.getItem("lowIntensity")
            return saved ?
            JSON.parse(saved) :
            ''
    })

    const [openNotificationPopUp, setOpenNotificationPopUp] = useState(false)

    return(
        <SmallerComponentsContext.Provider
            value={{
                openSidebar,
                setOpenSidebar,
                openDeletePopUp,
                setOpenDeletePopUp,
                hidden, 
                setHidden,
                addTodoShowing,
                setAddTodoShowing,
                headerShowing, 
                setHeaderShowing,
                lastScrollY, 
                setLastScrollY,
                exceededTasksValue,
                exceededTasks,
                exceededTasksClicked, 
                setExceededTasksClicked,
                justStarted,
                setJustStarted,
                justStartedClicked,
                setJustStartedClicked,
                endingToday, 
                setEndingToday,
                endingTodayClicked,
                setEndingTodayClicked,
                highIntensity,
                setHighIntensity,
                lowIntensity,
                setLowIntensity,
                openNotificationPopUp,
                setOpenNotificationPopUp
            }}
        >
            {children}
        </SmallerComponentsContext.Provider>    
    )
}