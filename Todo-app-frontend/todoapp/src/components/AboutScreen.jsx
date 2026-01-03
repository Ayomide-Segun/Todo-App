import { useContext } from "react"
import { SmallerComponentsContext } from "../contexts/SmallerComponentsContext"

export function AboutScreen(){

    const {setOpenNotificationPopUp, openSidebar,} = useContext(SmallerComponentsContext)

    return(
        <main
            className={openSidebar ? 'open-side-bar' : ''}
            onClick={()=> setOpenNotificationPopUp(false)}
        >
            <section>
                <p className="title">About Us</p>
            <article>
                <p>
                    This Todo App was built to make planning less stressful and actually productive. It’s not just about writing tasks down — it’s about organizing work intelligently, staying consistent, and finishing what you start
                </p>
                <p>
                    With features like project-based tasks, deadlines, priorities, and AI-assisted planning, the app helps you break down work into manageable steps instead of feeling overwhelmed.Whether you’re managing personal goals, school work, or team projects, this app is designed to keep everything clear, structured, and easy to follow.
                </p>
            </article>
            </section>
            <section>
                <h2>What can you do:</h2>
                <ul>
                    <li>
                        Create and manage tasks with start and end date
                    </li>
                    <li>
                        Set task intensity (High, Medium, Low)
                    </li>
                    <li>
                        Use AI to break down large tasks into smaller steps
                    </li>
                    <li>
                        Track progress and stay on schedule
                    </li>
                </ul>
            </section>
            <section>
                <h2>Why it exists:</h2>
                <article>
                    <p>
                        Most todo apps are either too simple to be useful, or too complicated to enjoy using. This app sits in the middle, it is powerful, but calm. The goal is to help you focus on doing the work, not fighting the tool.</p>
                        <p>
                            Productivity isn’t about doing more, it’s about doing the right things, at the right time, with less stress. This app is here to help with exactly that 🚀
                        </p>
                </article>
                
            </section>
        </main>
    )
}