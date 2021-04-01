import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useState, useEffect} from 'react';
import JoblyAPI from './api';
import Storege from './components/Storege';
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
  let currUser = JSON.parse(window.localStorage.getItem('user'))
  const [user, setUser] = useState(currUser.user|| {})
  const [userInfo, setUserInfo] = Storege()

  console.log(userInfo)

  useEffect(() => {
    const token = JSON.parse(window.localStorage.getItem('user')).user
    if(token){
      JoblyAPI.autoLogin(token.token || '')
    }
    setUserInfo(user)
  },[user])

  const login = async(info) => { 
    let res = await JoblyAPI.login(info)
    
    setUser({username: info.username, token: res})
  }

  const signUp = async(data) => {
    let res = await JoblyAPI.registerUser(data)
    setUser({username: data.username, token: res})
  }

  const logout = () => {
    JoblyAPI.logout()
    setUser({})
    window.localStorage.setItem('user', JSON.stringify({}))
  }
  
  return (
    <div className="grid justify-items-stretch">
      <BrowserRouter >
      <NavBar name={user.username} logout={logout}/>
        <Switch>
          <Route exact path="/">
            <Welcome name={user.username} />
          </Route>
          <Route exact path="/companies">
            <Companies user={user} />
          </Route>
          <Route exact path="/companies/:name">
            <Company user={user} setUserInfo={setUser} />
          </Route>
          <Route exact path="/jobs">
            <Jobs user={user} setUserInfo={setUser} />
          </Route>
          <Route  exact path="/login">
            <Login login={login} />
          </Route>
          <Route exact path="/signup">
            <SignUp signUp={signUp} />
          </Route>
          <Route exact path="/profile">
            <Profile user={userInfo} login={login} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
