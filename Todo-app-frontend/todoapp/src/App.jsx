import { useEffect, useContext } from 'react'
import './App.css'
import './HomeScreen.css'
import {Header} from './components/Header.jsx'
import {HomeScreen} from './components/home-components/HomeScreen.jsx'
import { AboutScreen } from "./components/AboutScreen.jsx";
import { TasksScreen } from "./components/TasksScreen.jsx";
import {AddTodo} from './components/AddTodo.jsx';
import { TodoInput } from './components/TodoInput.jsx'
import api from './api/axios.js'
import { Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { AppContext } from './contexts/AppContext.jsx'
import { InputContext } from './contexts/InputContext.jsx'
import { SmallerComponentsContext } from './contexts/SmallerComponentsContext.jsx'
import { AIAssistant } from './components/AI/AIAssistant.jsx'
import { SubTaskScreen } from './components/AI/SubTasksScreen.jsx'
import {RegisterScreen} from './components/RegisterScreen.jsx'
import {LoginScreen} from './components/LoginScreen.jsx'
import {ForgotPassword} from './components/ForgotPassword.jsx'
import { PasswordReset } from './components/PasswordReset.jsx'
import { EmailVerification } from './components/EmailVerification.jsx'


function App() {

  const {todos, setTodos, setCheckedIn} = useContext(AppContext)

  const {aiProject, todoId, project_id, setTodoId} = useContext(InputContext)

  const {lastScrollY, setLastScrollY, openSidebar, openDeletePopUp, exceededTasksValue,exceededTasks, justStarted, endingToday, setHidden, addTodoShowing, headerShowing, lowIntensity, highIntensity} = useContext(SmallerComponentsContext)

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    function handleScroll(){
        const currentScrollY = window.scrollY
        if (currentScrollY > lastScrollY){
            setHidden(true)
        }else{
            setHidden(false)
        }
        setLastScrollY(currentScrollY)   
    }
    window.addEventListener("scroll", handleScroll)
    // helper function
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  useEffect(() => {
    if (openSidebar || openDeletePopUp) {
      document.body.classList.add("freeze");
    } else {
      document.body.classList.remove("freeze");
    }
    // cleanup
    return () => document.body.classList.remove("freeze");
  }, [openSidebar, openDeletePopUp]);

  useEffect(() => {
    async function fetchTodos(){
      try{
        // 🚫Not logged in
        if (!token) {
          console.log("No token, user not logged in");
          return;
        }
        const response = await api.get("todos/")
        setTodos(response.data)
      }catch(error){
        console.error("Failed to fetch todos:", error);
      }
    }
    fetchTodos()
  }, [token])

  useEffect(() => {
    
    //🚫 Not logged in
    if (!token) {
      console.log("No token, user not logged in");
      // redirect or show login
      return;
    }
    if (todos.length === 0) return;
    async function fetchCheckIns () {
      try {
        const response = await api.get('checkIns/')
        setCheckedIn(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCheckIns();
  }, [todos])


  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  useEffect(()=>{
    localStorage.setItem("aiProject", JSON.stringify(aiProject))
  }, [aiProject])

  useEffect(()=>{
    localStorage.setItem("editingTodoId", todoId)
  }, [todoId])
  
  useEffect(()=>{
    localStorage.setItem("exceeded", JSON.stringify(exceededTasksValue))
  }, [exceededTasks])
  useEffect(()=>{
    localStorage.setItem("justStarted", JSON.stringify(justStarted))
  }, [justStarted])
  useEffect(()=>{
    localStorage.setItem("ending", JSON.stringify(endingToday))
  }, [endingToday])
  useEffect(()=>{
    localStorage.setItem("highIntensity", JSON.stringify(highIntensity))
  }, [highIntensity])
  useEffect(()=>{
    localStorage.setItem("lowIntensity", JSON.stringify(lowIntensity))
  }, [lowIntensity])

  return (
    <>
      {headerShowing &&
        <Header
          title="Header"
          navigate={navigate}
          token = {token}
      />
      }
      
      <Routes>
        <Route path="/" element={
            <HomeScreen 
              navigate={navigate}
              openSidebar={openSidebar}
            />
          } 
        />
        <Route path="/forgotPassword" element={
            <ForgotPassword
              navigate={navigate}
            />
          }
        />
        <Route path="/verifyEmail" element={
            <EmailVerification
              navigate={navigate}
            />
          }
        />
        <Route path="/passwordReset/:uid/:token" element={
            <PasswordReset
              navigate={navigate}
            />
          } 
        />
        <Route path="/register" element={
            <RegisterScreen 
              navigate={navigate}
            />
          } 
        />
        <Route path="/login" element={
            <LoginScreen 
              navigate={navigate}
            />
          } 
        />
        <Route path="/tasks" element={
            <TasksScreen
              navigate={navigate}
              project_id={project_id}
            />
          } 
        />
        <Route path="/about" element={
            <AboutScreen 
              navigate={navigate}
              openSidebar={openSidebar}
            />
          }
        />
        <Route path="/addTask" element={
            <TodoInput
              openSidebar={openSidebar}
              setTodoId={setTodoId}
              navigate={navigate}
            />
          } 
        />
        <Route path="/tasks/subTasks" element={
            <SubTaskScreen
            />
          } 
        />
        <Route path="/aiAssistant" element={
            <AIAssistant
              navigate={navigate}
              openSidebar={openSidebar} 
            />
          } 
        />
      </Routes>

      {(addTodoShowing) && <AddTodo
        navigate={navigate}
      />}

    </>
  )
}
export default App
