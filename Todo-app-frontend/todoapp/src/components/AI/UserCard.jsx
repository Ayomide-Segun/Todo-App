export function UserCard(props){
    const { text} = props

    return(
        <div className="ai-card ml-[50%]">
            <p className="prompt">
                {
                    text
                }
            </p>
        </div>
    )
}