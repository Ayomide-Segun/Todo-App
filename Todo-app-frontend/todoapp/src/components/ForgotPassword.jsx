import { useState, useContext, useEffect } from 'react'
import { SmallerComponentsContext } from '../contexts/SmallerComponentsContext.jsx'
import '../Login.css'
import api from '../api/axios.js'

export function ForgotPassword(){
    const {setAddTodoShowing, setHeaderShowing} = useContext(SmallerComponentsContext)

    const [email, setEmail] = useState('')
    const [emailSent , setEmailSent] = useState(false)
    

    async function handleSubmit(e, email){
        e.preventDefault()
        try{
            const res = await api.post("forgotPassword/", {
            email
        });
        setEmailSent(true)
        alert('If the account exists, a reset link has been sent') 
        }catch (err){
            console.log(err)
        }
        
    }
        
    useEffect(()=>{
        setAddTodoShowing(false)
        setHeaderShowing(false)
        setEmailSent(false)
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
            
            <form className='login-form'>
                
                
                <div className='header'>
                    <img className='app-logo' src="/logo.png" alt="logo of todo app" />
                    
                    <h2 className='authenticate'>Forgot Password</h2>
                </div>
                {!emailSent ? 
                <div className='email-div'>
                    <input 
                    className='authentication-input email'
                    type="email" 
                    id='email' 
                    name='email' 
                    placeholder='Email Address'
                    value={email}
                    required
                    onChange={(e)=>{
                        const value = e.target.value
                        setEmail(value)
                    }}
                />
                    <button
                        className='submit-button'
                        onClick={(e)=> handleSubmit(e, email)}
                    >
                        Reset
                    </button>
                </div>:
            <p>Recovery Email has been sent</p>
            }
            </form>
        </main>
    )
}