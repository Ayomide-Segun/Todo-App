import { useState, useContext, useEffect } from 'react'
import { SmallerComponentsContext } from '../contexts/SmallerComponentsContext.jsx'
import '../Login.css'
import { AuthContext } from '../contexts/AuthContext.jsx'

export function EmailVerification(props){
    const {setAddTodoShowing, setHeaderShowing} = useContext(SmallerComponentsContext)
    const {userDetails, Register, setLoading} = useContext(AuthContext)
    const {navigate} = props


    async function handleSubmit(e, userDetails){
        e.preventDefault()
        setLoading(true)
        const [username, email, password] = userDetails
        Register(
            username, email, password
        );        
    }
        
    useEffect(()=>{
        setAddTodoShowing(false)
        setHeaderShowing(false)
    },[])

    return(
        <main
            style={{
                display: "flex",
                justifyContent: "center",
                height: "80%",
                alignItems: "center"
            }}
        >
            
            <form 
                className='login-form w-full h-[300px]  md:w-[700px] sm:w-[500px] md:w-[700px] md:h-[1/2]' 
                onSubmit={(e) => handleSubmit(e, userDetails)}
            >
                <div 
                    className='header'
                >
                    <img 
                        className='app-logo' src="/logo.png" alt="logo of todo app"
                    />
                    
                    <h2 
                        className='authenticate text-lg'
                    >
                        Email Verification
                    </h2>
                </div>
                <div
                    className='w-full'
                >
                    <p
                        className='text-center font-bold text-lg md:text-2xl'
                    >
                        You account has been verified successfully
                    </p>
                    <input              
                        className='submit-button mt-10 mx-24 sm:mx-48 md:mx-80 sm:w-[70px] md:w-[90px]' 
                        type="submit" 
                        value="Send" 
                    />
                </div>
            </form>
        </main>
    )
}