export function AIInput(props){
    const {value, setValue, handleSubmission, loading} = props

    return(
        <form
            style={{
                display: "flex",
                justifyContent: "center",
                position: "fixed",
                bottom: "10px",
                width: "100%",
            }}
            >
            <textarea 
                className="prompt-input"
                value={value}
                onChange={(e)=>{
                    e.preventDefault()
                    setValue(e.target.value)
                }}
                rows={1}
                placeholder="Type your prompt..."
            />
            <input
                className="ask-button"
                type="button"
                value = {loading ? "Thinking..." : "Ask AI"}
                disabled={loading}
                onClick={(e) => handleSubmission(e)}
            />
        </form>
    )
}