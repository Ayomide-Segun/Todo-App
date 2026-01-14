import clsx from 'clsx'
export function Tabs(props){
    const {setClickedTab, clickedTab, todos} = props
    const tabs = ['All', 'Not started', 'In progress', 'Completed', 'Exceeded']
    const noOfCritical = todos.filter((todo) => todo['status'] === 'Exceeded').length
    return(
        <nav>
            {
                tabs.map((tab, tabIndex) => {
                    return <div
                        key={tabIndex}  
                        className={clsx(
                            "tab px-3 sm:p-5 text-sm sm:text-xl",
                            clickedTab === tab && 'clicked-tab',
                            (noOfCritical > 0 && tab === 'Exceeded') && 'critical'
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