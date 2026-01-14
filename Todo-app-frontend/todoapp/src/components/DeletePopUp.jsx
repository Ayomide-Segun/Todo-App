export function DeletePopUp(props){
    const {deleteTask, openDeletePopUp, setOpenDeletePopUp} = props
    const deletePopUpStyle = {
        position: "fixed",
        top: "50%",
        backgroundColor: "white",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px"
    }
    console.log(openDeletePopUp)

    const buttonStyle = {
        margin: "10px"
    }
    return(
        <main
            style={{
                backgroundColor: "rgba(236, 239, 249, 0.7)",
                position: "fixed",
                top: 0,
                height: "100%"
            }}
        >
            <div 
                className="w-[70%] md:w-[30%]"
                style={deletePopUpStyle}>
                <p
                    className="text-lg md:text-xl"
                >
                    Are you sure you want to delete this task
                </p>
                <div>
                    <button
                        className="text-lg md:text-xl"
                        style={buttonStyle}
                        onClick={()=> {
                            deleteTask(openDeletePopUp)
                            setOpenDeletePopUp(null)
                        }}
                    >Delete</button>
                    <button
                        className="text-lg md:text-xl"
                        style={buttonStyle}
                        onClick={()=> setOpenDeletePopUp('')}
                    >Cancel</button> 
                </div>
                
            </div>  
        </main>
        
    )
}