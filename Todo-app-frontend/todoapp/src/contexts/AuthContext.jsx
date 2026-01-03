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
    
    async function Register( username, email, password ){
        try {
        const res = await api.post('register/', {
        username, email, password
        });
        alert("Account created 🎉");
        navigate('/login')
        } catch (err) {
            const errors = err.response?.data;
            if (errors?.username) {
                alert(errors.username[0]);
            } else if (errors?.email) {
                alert(errors.email[0]);
            } else {
                alert("Registration failed");
                console.log(err)
            }
        }
    }
    return(
        <AuthContext.Provider 
            value={{
                Login, 
                Register, 
                username,
                setUsername
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}