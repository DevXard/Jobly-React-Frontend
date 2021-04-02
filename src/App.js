import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useState, useEffect} from 'react';
import JoblyAPI from './api';
import Storege from './components/Storege';
import UserContext from './components/UserContext';
import jwt from 'jsonwebtoken';
// import Context from './components/userContext';

//components
import Welcome from './components/Welcome';
import Companies from './components/Companies';
import Company from './components/Company';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Jobs from './components/Jobs';
import NavBar from './components/NavBar';


//Styles
import './App.css';

function App() {
  
  const [user, setUser] = useState(null)
  const [token, setToken] = Storege("token")
  const [applications, setApplications] = useState(new Set([]))

  

  useEffect(() => {

    const getCurrUser = async () =>{
      if(token){
        try{
          let {username} = jwt.decode(token);

          JoblyAPI.token = token;
          let currentUser = await JoblyAPI.getUser(username)
          console.log("Current user", currentUser)
          setUser(currentUser)
          setApplications(new Set(currentUser.user.applications))
        }catch(e){
          console.error(e)
          setUser(null)
        }
      }
    }

    getCurrUser()
  }, [token])
 

  const login = async(info) => { 
    try{
      let res = await JoblyAPI.login(info)
      setToken(res);
      return{success: true}
    }catch(e){
      console.error("Login Faild", e)
      return{success: false}
    }
    
    
  }

  const signUp = async(data) => {
    try{
      let res = await JoblyAPI.registerUser(data)
      setToken(res)
      return{success: true}
    }catch(e){
      console.error("Sign Up Faild", e)
      return{success: false}
    }
    
    
  }

  const logout = () => {
    JoblyAPI.logout()
    setUser(null)
    setToken(null)
  }
  
  return (
    <div className="grid justify-items-stretch">
      <BrowserRouter >
      <UserContext.Provider value={{login, signUp, logout, user, applications, setApplications}}>
      <NavBar logout={logout}/>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route exact path="/companies">
            <Companies  />
          </Route>
          <Route exact path="/companies/:name">
            <Company />
          </Route>
          <Route exact path="/jobs">
            <Jobs   />
          </Route>
          <Route  exact path="/login">
            <Login  />
          </Route>
          <Route exact path="/signup">
            <SignUp  />
          </Route>
          <Route exact path="/profile">
            <Profile  />
          </Route>
        </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;



// useEffect(() => {
//   let currUser = JSON.parse(window.localStorage.getItem('user'))
//   console.log( "CURUSER",currUser)
//   if(currUser !== null){
//     setUser(currUser)
//   }
//   setUserInfo(user)
// },[])
// useEffect(() => {

  
//   setUserInfo(user)
// },[user])