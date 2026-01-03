export function DeletePopUp(props){
    const {deleteTask, openDeletePopUp, setOpenDeletePopUp} = props
    const deletePopUpStyle = {
        position: "fixed",
        top: "50%",
        backgroundColor: "white",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
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
            <div style={deletePopUpStyle}>
                <p>
                    Are you sure you want to delete this task
                </p>
                <div>
                    <button 
                        style={buttonStyle}
                        onClick={()=> {
                            deleteTask(openDeletePopUp)
                            setOpenDeletePopUp(null)
                        }}
                    >Delete</button>
                    <button 
                        style={buttonStyle}
                        onClick={()=> setOpenDeletePopUp('')}
                    >Cancel</button> 
                </div>
                
            </div>  
        </main>
        
    )
}