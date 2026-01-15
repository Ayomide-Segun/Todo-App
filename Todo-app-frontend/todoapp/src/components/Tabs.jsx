import clsx from 'clsx'
export function Tabs(props){
    const {setClickedTab, clickedTab, todos, openSidebar} = props
    const tabs = ['All', 'Not started', 'In progress', 'Completed', 'Exceeded']
    const noOfCritical = todos.filter((todo) => todo['status'] === 'Exceeded').length
    return(
        <nav>
            {
                tabs.map((tab, tabIndex) => {
                    return <div
                        key={tabIndex}  
                        className={clsx(
                            "tab font-bold p-3 sm:p-5 text-sm sm:text-xl",
                            clickedTab === tab && 'clicked-tab',
                            (noOfCritical > 0 && tab === 'Exceeded') && 'critical',
                            openSidebar && 
                'text-xs px-2  md:px-5 md:text-xl'
                        )}
                        id="tab"
                        onClick={()=> {setClickedTab(tab)
                        }
                        }
                    >{tab}</div>
                })
            }
        </nav>
    )
}