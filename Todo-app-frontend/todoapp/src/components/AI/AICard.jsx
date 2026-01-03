export function AICard(props){
    const { requestResponsePair} = props

    return(
        <div className="ai-card ai-card-left">
                {
                    requestResponsePair.loading ? (
                        <p>AI is thinking…</p>
                        ) : (
                        <p className="prompt">{requestResponsePair.ai_response}</p>
                        )
                }
        </div>
    )
}