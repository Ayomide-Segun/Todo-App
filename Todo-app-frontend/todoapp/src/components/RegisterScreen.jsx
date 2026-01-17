import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext.jsx'
import { SmallerComponentsContext } from '../contexts/SmallerComponentsContext.jsx'
import '../Login.css'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Loader } from './Loader.jsx'



export function RegisterScreen(props){
    const {VerifyEmail, userDetails, setUserDetails, loading, setLoading} = useContext(AuthContext)
    const {setAddTodoShowing, setHeaderShowing} = useContext(SmallerComponentsContext)
    const {navigate} = props

    
    
    const [passwordCorrect, setPasswordCorrect] = useState(null)
    const [repeatPasswordCorrect, setRepeatPasswordCorrect] = useState(null)
    console.log(passwordCorrect)
    console.log(repeatPasswordCorrect)
    
    function handleSubmit(e){
        e.preventDefault(); // prevent page refresh
        if(passwordCorrect !== true) {
            alert("Password incorrect")
            return
        }
        if(repeatPasswordCorrect === false){
            alert("Passwords don't match, try again!")
            setUserDetails(prev => ({...prev, password: "", repeatPassword:""}))
            return;
        }
        setLoading(true)
        VerifyEmail(userDetails.email)
    }

    useEffect(()=>{
        function isValidPassword(password) {
            const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
            return regex.test(password);
        }
        if(isValidPassword(userDetails.password)){
            setPasswordCorrect(true)
        }else{
            setPasswordCorrect(false)
        }

    }, [userDetails.password])
    useEffect(()=>{
        if(userDetails.password !== userDetails.repeatPassword){
            setRepeatPasswordCorrect(false)
        }else{
            setRepeatPasswordCorrect(true)
        }
    },[userDetails.repeatPassword])
    useEffect(()=>{
            setAddTodoShowing(false)
            setHeaderShowing(false)
            setPasswordCorrect(null)
            setRepeatPasswordCorrect(null)
        },[])

    return(
        <main
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <form
                method='POST'
                className='register-form w-full h-full md:w-1/2 md:h-9/10'
                >
                <div className='header header mb-5 md:mb-0'>
                    <div>
                        <img className='app-logo' src="/logo.png" alt="logo of todo app" />
                    </div>
                    
                    <h2 className='authenticate text-xl'>Sign Up</h2>
                </div>
            <p
                className="text-lg mb-3 md:text-xl"
                >Already have an account? <a     
                    style={{
                        cursor: "pointer"
                    }}
                    onClick={()=>{
                        navigate("/login")   
                        }}
                >Click here to Login</a></p>

                <input 
                    className='authentication-input text-lg md:text-xl'
                    type="text" 
                    id='user-name' 
                    name='user-name' 
                    placeholder='Username'
                    value={userDetails.username}
                    required
                    onChange={(e)=>{
                        const value = e.target.value
                        setUserDetails(prev => ({ ...prev, username: value }))
                    }}
                />

                <input 
                    className='authentication-input text-lg md:text-xl'
                    type="email" 
                    id='email' 
                    name='email' 
                    placeholder='Email Address'
                    value={userDetails.email}
                    required
                    onChange={(e)=>{
                        const value = e.target.value
                        setUserDetails(prev => ({ ...prev, email: value }))
                    }}
                />
                <p      
                        className='password-instruction text-sm md:text-lg'
                    >Password must be at least 8 characters long and contain at least 1 number and 1 symbol.</p>
                <div className='password-div'>
                    <input
                        className={` text-lg md:text-xl ${passwordCorrect === null ? 'before-password' : 'password'}`}
                        type="password" 
                        id='password' 
                        name='password' 
                        placeholder='Password'
                        value={userDetails.password}
                        required
                        onChange={(e) => {
                            const value = e.target.value;
                            setUserDetails(prev => ({ ...prev, password: value }));
                        }}
                    />
                    {passwordCorrect === true &&<FaCheck
                        style={{
                            marginLeft: "7px"
                        }}
                        color='#66ff00'
                        size={24}
                    />}
                    {passwordCorrect === false && <FaTimes
                        style={{
                            marginLeft: "7px"
                        }}
                        color='#ff0000ff'
                        size={24}
                    />}
                </div>
                
                <div className='password-div'> 
                    <input 
                        className={`text-lg md:text-xl ${repeatPasswordCorrect === null ? 'before-password' : 'password'}`}
                        type="password" 
                        id='repeat-password' 
                        name='repeat-password' 
                        placeholder='Repeat Password'
                        value={userDetails.repeatPassword}
                        required
                        onChange={(e) => {
                            const value = e.target.value;
                            setUserDetails(prev => ({ ...prev, repeatPassword: value }));
                        }}
                    />
                    {repeatPasswordCorrect === true &&<FaCheck
                        style={{
                            marginLeft: "7px"
                        }}
                        color='#66ff00'
                        size={24}
                    />}
                    {repeatPasswordCorrect === false && <FaTimes
                        style={{
                            marginLeft: "7px"
                        }}
                        color='#ff0000ff'
                        size={24}
                    />}
                </div>
                
                <input 
                    className='submit-button' 
                    type="button" 
                    onClick={(e)=> {
                        handleSubmit(e)
                    }}
                    value="Sign up"
                />
                {loading && <Loader/>}
            </form>
        </main>
    )
}
