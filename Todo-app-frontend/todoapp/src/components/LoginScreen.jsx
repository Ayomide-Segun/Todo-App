import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext.jsx'
import { SmallerComponentsContext } from '../contexts/SmallerComponentsContext.jsx'
import '../Login.css'
import {Loader} from './Loader.jsx'

export function LoginScreen(props){
    const {navigate} = props
    const {Login, username, setUsername, loading, setLoading} = useContext(AuthContext)
    const {setAddTodoShowing, setHeaderShowing} = useContext(SmallerComponentsContext)
    const [loginDetails, setLoginDetails] = useState({
        "username": '',
        "password": ''
    })

    function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        Login(loginDetails.username, loginDetails.password)
        setUsername(loginDetails.username)
    }

    useEffect(()=>{
        localStorage.setItem('username', JSON.stringify(username))
    }, [username])

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
            className='login-form w-full h-full md:w-1/2 md:h-9/10' 
            method='POST' onSubmit={handleSubmit}>
                <div className='header mb-5 md:mb-0'>
                        <img className='app-logo' src="/logo.png" alt="logo of todo app" />
                    
                    <h2 
                        className='authenticate text-xl'
                    >Welcome back</h2>
                </div>
                

                <p
                className="text-lg md:text-xl"
                >New here? <a     
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={()=>{
                        navigate("/register")   
                        }}
                >Click here to create an account</a></p>

                <input 
                    className='authentication-input text-lg md:text-xl'
                    type="text" 
                    id='user-name' 
                    name='user-name' 
                    placeholder='Username'
                    value={loginDetails.username}
                    onChange={(e)=>{
                        const value = e.target.value
                        setLoginDetails(prev => ({ ...prev, username: value }))
                    }}
                />

                <input 
                    className='authentication-input text-lg md:text-xl'
                    type="password" 
                    id='password' 
                    name='password' 
                    placeholder='Password'
                    value={loginDetails.password}
                    onChange={(e) => {
                        const value = e.target.value;
                        setLoginDetails(prev => ({ ...prev, password: value }));
                    }}
                />

                <div
                    style={{
                        display: "flex-end",
                        justifyContent: "end",
                        width: "90%"
                    }}
                >
                    <a 
                        className='forgot-password' 
                        href="SignUpScreen.jsx"
                        onClick={(e)=> {
                            e.preventDefault()
                            navigate('/forgotPassword')}}
                        
                    >Forgot password</a>
                </div>
                
                <input 
                    className='submit-button' 
                    type="submit" 
                    value="Sign in"
                />
                {loading && <Loader/>}
            </form>
        </main>
    )
}
