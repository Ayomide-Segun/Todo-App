export function UserCard(props){
    const { text} = props

    return(
        <div className="ai-card ai-card-right">
            <p className="prompt">
                {
                    text
                }
            </p>
        </div>
    )
}