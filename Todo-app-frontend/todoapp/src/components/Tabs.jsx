export function Tabs(props){
    const {setClickedTab, clickedTab, todos} = props
    const tabs = ['All', 'Not started', 'In progress', 'Completed', 'Exceeded']
    const noOfCritical = todos.filter((todo) => todo['status'] === 'Exceeded').length
    return(
        <nav>
            {
                tabs.map((tab, tabIndex) => {
                    return <button 
                        key={tabIndex}  
                        className={`
                            tab 
                            ${clickedTab === tab ? 'clicked-tab' : ''}
                            ${noOfCritical > 0 && tab === 'Exceeded' ? 'critical' : ''}
                        `}
                        id="tab"
                        onClick={()=> {setClickedTab(tab)
                        }
                        }
                    >{tab}</button>
                })
            }
        </nav>
    )
}