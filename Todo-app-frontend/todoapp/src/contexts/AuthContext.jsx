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
    const [userDetails, setUserDetails] = useState(() => {
        const saved = localStorage.getItem("userDetails")
        return saved ? JSON.parse(saved) : {
            username:"",
            password:"",
            email:"",
            repeatPassword:""

        }
    })
    async function Login(username, password){
        try {
        const res = await api.post('login/', {
        username, password
        });
        const token = res.data.access;
        const refresh = res.data.refresh
        localStorage.setItem("token", token); // save it
        navigate('/')
        } catch (err) {
            alert('Username or password is incorrect!')
            console.error(err)
        } 
        
    }
    
    async function VerifyEmail( email ){
        try {
        const res = await api.post('verifyEmail/',
            email
        );
        alert('A verificaton code has been sent to your email')
        navigate('/verifyEmail')
        } catch (err) {
            console.log(err)
        }
    }

    async function Register( otp, username, email, password ){
        try {
        const res = await api.post('register/',{ 
            otp, username, email, password
        });
        alert('Account created successfully!')
        navigate('/Login')
        } catch (err) {
            const errors = err.response?.data;
            if(!errors){
                alert("Network error. Try again later")
                return
            }
            if (typeof data === "object") {
                const messages = [];

                Object.values(data).forEach((value) => {
                    if (Array.isArray(value)) {
                        messages.push(value[0]);
                        alert(messages.join("\n"));
                        navigate('/register')
                        return;
                    } else if (typeof value === "string") {
                        messages.push(value);
                        alert(messages.join("\n"));
                        return;
                    }
                });

                
            }

            alert("Registration failed");
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
                setUserDetails
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}