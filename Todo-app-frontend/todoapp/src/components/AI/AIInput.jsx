export function AIInput(props){
    const {value, setValue, handleSubmission, loading} = props

    return(
        <form
            className="w-[90%] px-5 md:px-24 md:w-[85%] lg:w-[90%]"
            style={{
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                position: "fixed",
                bottom: "0px"

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
                className="ask-button w-16 md:w-24"
                type="button"
                value = {loading ? "Thinking..." : "Ask AI"}
                disabled={loading}
                onClick={(e) => handleSubmission(e)}
            />
        </form>
    )
}