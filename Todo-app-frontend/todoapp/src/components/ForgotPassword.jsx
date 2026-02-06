import { useState, useContext, useEffect } from 'react'
import { SmallerComponentsContext } from '../contexts/SmallerContext.jsx'
import { AuthComponentsContext } from '../contexts/AuthContext.jsx'
import '../Login.css'
import api from '../api/axios.js'

export function ForgotPassword(){
    const {setAddTodoShowing, setHeaderShowing} = useContext(SmallerComponentsContext)
    const {setLoading} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [emailSent , setEmailSent] = useState(false)
    

    async function handleSubmit(e, email){
        e.preventDefault()
        try{
            setLoading(true)
            const res = await api.post("forgotPassword/", {
            email
        });
         // 🧪 DEMO MODE
        if (res.data.demo) {
            const { uid, token } = res.data;
            navigate(`/passwordReset/${uid}/${token}`);
            setEmailSent(true)
            return;
        }
        setEmailSent(true)
        alert('If the account exists, a reset link has been sent') 
        }catch (err){
            console.log(err)
            alert(
            err?.response?.data?.error ||
            "Something went wrong. Please try again.")
        }finally {
            setLoading(false);
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
            
            <form className='login-form w-full h-8/10 p-0 md:w-1/2 md:h-1/2'>
                
                
                <div className='header'>
                    <img className='app-logo' src="/logo.png" alt="logo of todo app" />
                    
                    <h2 className='authenticate text-lg '>Forgot Password</h2>
                </div>
                {!emailSent ? 
                <div className='email-div w-full md:w-1/2'>
                    <input 
                    className='authentication-input text-sm md:text-lg email'
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
                        className='submit-button text-sm  md:text-lg'
                        onClick={(e)=> handleSubmit(e, email)}
                    >
                        Reset
                    </button>
                </div>:
            <p className='recovery'>Recovery Email has been sent</p>
            }
            </form>
        </main>
    )
}