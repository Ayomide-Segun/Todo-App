import { useState, createContext } from "react";
import { useNavigate} from "react-router-dom"
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthContextProvider({children}){
    const [username, setUsername] = useState(()=>{
        const saved = localStorage.getItem('username')
        return saved ? JSON.parse(saved) : ''
    })
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState( ()=>{
        const saved = localStorage.getItem("userDetails")
        return saved ? 
        JSON.parse(saved) :
        {
            username:"",
            password:"",
            email:"",
            repeatPassword:""
        }
    })
    const [loading, setLoading] = useState(false)

    async function Login(username, password){
        try {
        const res = await api.post('login/', {
        username, password
        });
        const token = res.data.access;
        const refresh = res.data.refresh
        localStorage.setItem("token", token); // save it
        setLoading(false)
        navigate('/')
        } catch (err) {
            setLoading(false)
            alert('Username or password is incorrect!')
            console.error(err)
        } 
        
    }
    
    async function VerifyEmail(email, username){
        try {
            const res = await api.post('verifyEmail/',
                {email, username}
            );
            

            // ✅ DEMO MODE
        if (res.data.verified) {
            const { username, email, password } = userDetails;
            console.log("Demo mode: email verification skipped");
            await Register(username, email, password);
            return;
        }

        alert('A verificaton code has been sent to your email')
        } catch (err) {
            console.log(err)
            setLoading(false)
            alert(
                err?.response?.data?.error ||
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong"
            )
        }finally {
            setLoading(false);
        }
    }

    async function Register(  username, email, password ){
        try {
        const res = await api.post('register/',{ 
            username, email, password
        });
        alert('Account created successfully!')
        navigate('/Login')
        localStorage.removeItem("userDetails")
        } catch (err) {
            console.log(err)
            setLoading(false)
            alert("Registration failed");
        }finally {
            setLoading(false);
        }
    }
    return(
        <AuthContext.Provider 
            value={{
                Login,
                VerifyEmail, 
                Register, 
                username,
                setUsername,
                userDetails,
                setUserDetails,
                loading,
                setLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}