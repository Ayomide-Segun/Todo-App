import { FaBars } from "react-icons/fa"
import { FaBell } from "react-icons/fa"
import {SideBar} from './SideBar.jsx'
import { NotificationsPopUp } from "./NotificationsPopUp.jsx"
import { useContext, useState, useEffect } from "react"
import { AppContext } from "../contexts/AppContext.jsx"
import { SmallerComponentsContext } from "../contexts/SmallerComponentsContext.jsx"
import clsx from 'clsx'

export function Header(props){

    const { navigate, token} = props
    console.log(token) 

    const {todos, today, setClickedTab} = useContext(AppContext)

    const {openSidebar, setOpenSidebar, hidden, openNotificationPopUp, setOpenNotificationPopUp, justStarted, setJustStarted, setEndingToday, endingToday,  endingTodayClicked, setEndingTodayClicked, justStartedClicked, exceededTasks, exceededTasksClicked, highIntensity, setHighIntensity, lowIntensity, setLowIntensity} = useContext(SmallerComponentsContext)

    const [notification, setNotification] = useState([])
    const hasNotification = notification.length > 0

    const addNotification = (id, message) => {
        setNotification(prev => {
            if (prev.some(n => n.id === id)) return prev
            return [...prev, { id, message }]
        })
    }
    const [auth, setAuth] = useState('')
    useEffect(()=>{
        if(token){
            setAuth('Logout')
        }else{
            setAuth('Sign in')
        }
    }, [token])

    useEffect(() => {
        if (!todos) return

        const filtered = todos.filter(
            (t) => t.end_date === today
        )
        setEndingToday(filtered)
        const highIntensityTasks = todos.filter(
            (t) => t.intensity === 'High'
        )
        setHighIntensity(highIntensityTasks)
        const lowIntensityTasks = todos.filter(
            (t) => t.intensity === 'Low'
        )
        setLowIntensity(lowIntensityTasks)
        
    }, [todos, today])
    
    useEffect(()=>{
        if (!todos) return
        setNotification([]) // reset first

        if (exceededTasks > 0) {
            if(exceededTasksClicked){
                exceededTasks = ''
            } else{
                addNotification(
                    1,
                    `You have ${exceededTasks} exceeded tasks 😥`
                )
            }
        }

        if (justStarted) {
            if(justStartedClicked){
                setJustStarted('')
            } else{
                addNotification(
                    2,
                    `${justStarted.project_name} is now in progress 💃`
                )
            }
        }

        if (endingToday.length > 0) {
            if(endingTodayClicked){
                setEndingToday('')
            } else{
                addNotification(
                    3,
                    `${endingToday.length} ${endingToday.length > 1 ? 'tasks are' : 'task is'} ending today, check in now!🚨`
                )   
            }
            
        }

        if(highIntensity.length > 0){
            addNotification(
                4,
                `You have ${highIntensity.length} high intensity ${highIntensity.length > 1 ? 'tasks, ' : 'task, '} double your hustle 💪`
                )
        }

        if(lowIntensity.length > 0){
            addNotification(
                4,
                `You have ${lowIntensity.length} low intensity ${lowIntensity.length > 1 ? 'tasks, ' : 'task, '} you've got this👍`
                )
        }

    },[endingToday, justStarted, exceededTasks])

    return(
        <>
            <header
                className={hidden ? 'hide-header' : ''}
            >
                <div className={`header-left`}>
                    <img 
                        className='logo' 
                        src="/logo.png" 
                        alt="Todo app logo"
                        onClick={()=> navigate('/')}
                    />
                    <FaBars
                        className='icon'
                        onClick={() => 
                            setOpenSidebar(!openSidebar)} 
                    />
                </div>
                <div className='header-center'>
                    <p className='open-footer'></p>
                </div>
                <div className='header-right'>            
                    <FaBell 
                        color={notification.length > 0 ? 'red' : ''}
                        className={`notification icon ${hasNotification? 'alert' : ''}`}
                        onClick={() => setOpenNotificationPopUp(!openNotificationPopUp)}
                    />
                    {
                        hasNotification && <button
                            className={`notification-number ${hasNotification ? 'alert' : ''}`}
                            onClick={() => setOpenNotificationPopUp(!openNotificationPopUp)}
                        >
                            {notification.length}
                        </button>
                    }
                    <button 
                        className={clsx(
                            "logout hidden md:block",
                            auth === "Sign in" && "sign-in"
                        )}
                        onClick={()=>{
                            if(auth === 'Logout'){
                                localStorage.removeItem("token")
                                setAuth('Sign in')
                            }
                            navigate('/login')
                        }}
                    >
                        {auth}
                    </button>
                </div>
            </header>
            {
                openSidebar && <SideBar 
                    closeSidebar={() => setOpenSidebar(false)}
                    navigate={navigate}
                    auth={auth}
                    setAuth={setAuth}
                    {...props}
                />
            }
            {
                openNotificationPopUp && <NotificationsPopUp
                    todos={todos}
                    today={today}
                    notification={notification}
                    setNotification={setNotification}
                    navigate={navigate}
                    exceededTasks={exceededTasks}
                    setOpenNotificationPopUp={setOpenNotificationPopUp}
                    setClickedTab={setClickedTab}
                    setEndingTodayClicked={setEndingTodayClicked}
                    {...props}
                />
                
            }

        </>
    )
}