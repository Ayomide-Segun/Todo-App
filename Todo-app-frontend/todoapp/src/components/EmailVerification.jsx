import clsx from 'clsx'
import { useState, useContext, useEffect } from 'react'
import { SmallerComponentsContext } from '../contexts/SmallerComponentsContext.jsx'
import '../Login.css'
import api from '../api/axios.js'
import { AuthContext } from '../contexts/AuthContext.jsx'

export function EmailVerification(props){
    const {setAddTodoShowing, setHeaderShowing} = useContext(SmallerComponentsContext)
    const {userDetails, Register, VerifyEmail} = useContext(AuthContext)
    const {navigate} = props

    const [otp, setOtp] = useState(null) 

    async function handleSubmit(e, otp, userDetails){
        e.preventDefault()
        const [username, email, password] = userDetails
        Register(
            otp, username, email, password
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
            className='login-form w-full h-8/10 p-0 md:w-1/2 md:h-1/2' 
            onSubmit={(e) => handleSubmit(e, userDetails, otp)}>
                
                
                <div className='header'>
                    <img className='app-logo' src="/logo.png" alt="logo of todo app" />
                    
                    <h2 className='authenticate text-lg'>Email Verification</h2>
                </div>
                <div className='otp-div w-full md:w-1/2'>
                    <p 
                        className='new-email text-sm sm:text-xl'
                        
                    >
                        OTP not received? 
                        <a
                            className="cursor-pointer"
                            onClick={() => {
                                navigate('/register')  
                        }}
                        >
                            Sign up with new email
                        </a> 
                    </p>
                    <input 
                        className='authentication-input text-sm md:text-lg otp'
                        type="text" 
                        id='otp' 
                        name='otp' 
                        placeholder='OTP'
                        value={otp}
                        required
                        onChange={(e)=>{
                            const value = e.target.value
                            setOtp(value)
                        }}
                    />
                        <a
                            className='resend-otp text-sm sm:text-xl cursor-pointer'
                            onClick={() => {
                                VerifyEmail(userDetails.email)
                            }}
                        >
                            Resend OTP
                        </a> 
                        <input className='submit-button mt-10' type="submit" value="Send" />
                    </div>
            
            </form>
        </main>
    )
}