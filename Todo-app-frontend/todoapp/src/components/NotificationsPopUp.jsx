import { useState, useEffect } from "react"

export function NotificationsPopUp(props){
    const { notification, setNotification, navigate, exceededTasks, setJustStartedClicked,         setEndingTodayClicked, setOpenNotificationPopUp, setClickedTab, setExceededTasksClicked} = props
    return(
        <div
            className="notification-container"
        >
            <p
                style={{
                    color: "rgb(97, 97, 102)",
                    fontWeight: "bold",
                    fontSize: "24px",
                    textAlign: "center"
                }}
            >
                Notifications
            </p>
            {
                notification?.map((n, key) => 
                    <div
                        key={key}
                        className="notification-message"
                        onClick={(e)=>{
                            e.preventDefault()
                            if(n.id === 1){
                                navigate('/tasks')
                                setClickedTab('Exceeded')
                                setExceededTasksClicked(true)
                                setOpenNotificationPopUp(false)
                                setNotification(prev=>
                                    prev.filter((p)=> p.id !==  3)
                                )
                            }else if(n.id === 2){
                                setJustStartedClicked(true)
                                navigate('/tasks')
                                setClickedTab('In progress')
                                setNotification(prev=>
                                    prev.filter((p)=> p.id !==  2)
                                )
                            }else{
                                setEndingTodayClicked(true)
                                navigate('/tasks')
                                setClickedTab('In progress')
                                setNotification(prev=>
                                    prev.filter((p)=> p.id !==  3)
                                )
                            }
                        }}
                        >
                            {n.message}
                        </div>
                )
                
            }
        </div>
    )
}