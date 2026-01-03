import { useState, useContext, useEffect } from 'react'
import { SmallerComponentsContext } from '../contexts/SmallerComponentsContext.jsx'
import '../Login.css'
import { useParams } from "react-router-dom";
import { FaCheck } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import api from '../api/axios.js';

export function PasswordReset(props){
    const {navigate} = props
    const {setAddTodoShowing, setHeaderShowing} = useContext(SmallerComponentsContext)
    
    const [userDetails, setUserDetails] = useState(
        {
        password: "",
        repeatPassword: ""
    })

    const [passwordCorrect, setPasswordCorrect] = useState(null)
    const [repeatPasswordCorrect, setRepeatPasswordCorrect] = useState(null)

    const { uid, token } = useParams();

    async function handleSubmit(e, uid, token, password) {
        e.preventDefault()
        try{
            await api.post(
                `passwordReset/${uid}/${token}/`, {password} )
            alert("Password reset successful")
            navigate('/login')
        }catch (err) {
            console.log(err)
            alert("Reset link invalid")
            navigate('/login')
        }
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
    },[userDetails.repeatPassword, userDetails.password])
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
                height: "80%",
                alignItems: "center"
            }}
        >
            <form className='login-form'  onSubmit={(e)=> handleSubmit(e, uid, token, userDetails.password)}>
                <div className='header'>
                        <img className='app-logo' src="/logo.png" alt="logo of todo app" />
                    
                    <h2 className='authenticate'>Reset Password</h2>
                </div>
                <p 
                    className='password-instruction'
                    style={{
                        marginBottom: "15px"
                    }}
                >
                    Password must be at least 8 characters long and contain at least 1 number and 1 symbol.
                </p>
                
                <div className='password-div'>               
                    <input 
                        className={passwordCorrect === null ? 'before-password' : 'password'}
                        type="password" 
                        id='password' 
                        name='password' 
                        placeholder='Password'
                        autoComplete="new-password"
                        value={userDetails.password}
                        required
                        onChange={(e) => {
                            const value = e.target.value;
                            setUserDetails(prev => ({ ...prev, password: value }));
                            }}
                    />
                    {passwordCorrect === true &&
                        <FaCheck
                            style={{
                                    marginLeft: "7px"
                            }}
                            color='#66ff00'
                            size={24}
                        />
                    }
                    {passwordCorrect === false && <FaTimes
                        style={{
                            marginLeft:"7px"
                        }}
                        color='#ff0000f'
                        size={24}
                    />}
                </div>
                                
                <div className='password-div'> 
                    <input 
                        className={repeatPasswordCorrect === null ? 'before-password' : 'password'}
                        type="password" 
                        id='repeat-password' 
                        name='repeat-password' 
                        placeholder='Repeat Password'
                        autoComplete="new-password"
                        value={userDetails.repeatPassword}
                        required
                        onChange={(e) => {
                            const value = e.target.value;
                            setUserDetails(prev => ({ ...prev, repeatPassword: value }));
                        }}
                    />
                    {repeatPasswordCorrect === true &&
                    <FaCheck
                        style={{
                            marginLeft: "7px"
                        }}
                        color='#66ff00'
                        size={24}
                    />}
                    {repeatPasswordCorrect === false && 
                    <FaTimes
                        style={{
                            marginLeft: "7px"
                        }}
                        color='#ff0000ff'
                        size={24}
                    />}
                </div>
                                
                <input 
                    className='submit-button' 
                    type="submit" 
                    value="Sign up"
                />
                
            </form>
        </main>
    )
}