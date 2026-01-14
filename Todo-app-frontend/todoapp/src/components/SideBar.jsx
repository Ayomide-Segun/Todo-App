
export function SideBar(props){
    let {closeSidebar, navigate, auth, setAuth} = props
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
                    <button
                        className="sidebar-options md:hidden"
                        onClick={()=>{
                            if(auth === 'Logout'){
                                localStorage.removeItem("token")
                                setAuth("Sign in")
                            }
                            navigate('/login')
                        }}
                    >
                        {auth}
                    </button>
            </div>
        </>
    )
}