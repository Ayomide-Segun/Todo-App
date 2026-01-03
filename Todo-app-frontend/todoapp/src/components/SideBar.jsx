export function SideBar(props){
    let {closeSidebar, navigate} = props
    const sidebarOptions = ['Home', 'About', 'Tasks']

    return(
        <>
            <div className="sidebar">
                {sidebarOptions.map((option, optionIndex) => {
                    return(
                        <button 
                            key={optionIndex}
                            className="sidebar-options"
                            onClick={() => {
                                option === 'Home' ? navigate('/') :
                                navigate(`/${option.toLowerCase()}`)
                                closeSidebar()
                                }}
                        >{option}</button>
                        )
                    })}
            </div>
        </>
    )
}