import React,{useState} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';


import Report from './pages/Report/Report';
import Contact from './pages/Contact/Contact';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import User from './pages/User/User';
import Navbar from './Components/Navbar/Navbar';
import style from './App.module.css'
import Signup from './pages/Signup/Signup'
import Toggle from './Components/Toggle/Toggle'
import Login from './pages/Login/Login'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
import Verify from './pages/Verify/Verify'
import { Provider } from "react-redux";
import {createStore,combineReducers,applyMiddleware} from 'redux'
import ReduxThunk from "redux-thunk";
import { userReducer } from "./store/reducers/user";
import { CircularProgress } from '@material-ui/core';

const App = () => {

 
    const rootReducer = {
      user: userReducer
    };
  
    const reducer = combineReducers(rootReducer);
    const store = createStore(reducer, applyMiddleware(ReduxThunk));

  const [bgColor, setBgColor] = useState('white')
  if(bgColor==='black'){
  document.body.style.backgroundColor='black';
  document.body.style.color='white'
}
const [state, setState] = useState({checkedA: true});

const handleChange = (event) => {
  setState({ ...state, [event.target.name]: event.target.checked });  
};

if(state.checkedA){
  document.body.style.backgroundColor='black',
  document.body.style.color='white'
}
if(!state.checkedA){
  document.body.style.backgroundColor='white',
  document.body.style.color='black'
}
 
const token = localStorage.getItem('token')
const [load, setLoad] = useState(false)
setTimeout(() => {
   setLoad(true)
}, 1000);

  return (
    <div>
    <Provider store={store}>
   <Router>
   
    <main >
      
      <Switch>
        <Route path="/" exact component={Home}>
        <Navbar/> <Toggle handleChange={handleChange} state={state}></Toggle> <Home state={state}/>
        </Route>
        <Route path="/report" exact component={Report}>
        <Navbar/> <Toggle handleChange={handleChange} state={state}></Toggle> <Report/>
        </Route>
        <Route path="/dashboard" exact component={Dashboard}>
        <Navbar/> <Toggle handleChange={handleChange} state={state}></Toggle>   <Dashboard/>
        </Route>
        <Route path="/user" exact component={User}>
        <Navbar/> <Toggle handleChange={handleChange} state={state}></Toggle>  <User/>
        </Route>
        <Route path="/signup" exact component={Signup}>
        <Signup state={state}/>
        </Route>
        <Route path="/login" exact component={Login}>
         <Login state={state}/>
        </Route>
        <Route path='/forgot-password' exact component={ForgotPassword}>
           <ForgotPassword state={state}/>
        </Route>
        <Route path='/verify/:id' exact component={Verify}></Route>
        <Redirect to="/" />
      </Switch>
    </main>
   </Router>
   </Provider>
   </div>
  );
}

export default App;
