import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";
import style from "./Login.module.css";
import axios from '../../axios'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useDispatch } from "react-redux";
import * as authActions from '../../store/actions/user'

const Login = ({state:{checkedA}}) => {
 const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [emptyEmail, setEmptyEmail] = useState("")
  const [emptyPassword,setEmptyPassword] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmptyPassword('')
    setEmptyEmail('')
    setValue((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const [message, setMessage] = useState("");
  const [nextPage, setNextPage] = useState(false);

  const handleClick = async (event) => {
    event.preventDefault();

    if(value.email.trim()===""){
      return setEmptyEmail('! Please fill out this field')
    }
    if(value.password.trim()===""){
      return setEmptyPassword('! Please fill out this field')
    }

    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    onOpenModal()
    try {
      const res = await axios.post("/api/user/login", value, config);
       
      if(res.status===200){
       localStorage.setItem("token", res.data.token);
      dispatch(authActions.login(res.data.token));
      }
      
      if (res.data.token) {
        setNextPage(true);
      }
      setMessage(res.data.message);
    } catch (error) {
      
      setMessage(error.response.data.message);
      
    }
    
  };

  return (
    <div className={checkedA?style.container:style.containerDay}>
      {nextPage ? <Redirect to="/"></Redirect> : null}
      <div className={style.logo}>
      </div>
      <div className={style.mainBox}>
        <div className={style.box}>
          <form className={style.form}>
            <h2>Sign-In</h2>
            {/* <h6 className={style.field}>Enter your Email</h6> */}
            <input
              className={style.input}
              type="email"
              required={true}
              onChange={handleChange}
              value={value.email}
              name="email"
              placeholder='Email...'
            />
            <p className={style.warning}>{emptyEmail?emptyEmail:null}</p>
            <br />
            {/* <h6 className={style.field}>Enter your Password</h6> */}
            <input
              className={style.input}
              type="password"
              required={true}
              autoComplete="cc-number"
              onChange={handleChange}
              value={value.password}
              name="password"
              placeholder='Password...'
            />
            <p className={style.warning}>{emptyPassword?emptyPassword:null}</p>
            <Link to='/forgot-password' className={style.forgot}>Forgot Password !</Link>
            <br />
            <br />
            <div className={style.buttonBox}>
              <button
                type="submit"
                onClick={handleClick}
                className={style.button}
              >
                Sign-In
              </button>
            </div>
          </form>
        
        
        </div>
        <br />
        <p className={style.new}>New to Mini Url?</p>
        <Link to="/signup">
          {" "}
          <button className={style.signUp}>Create your Account Today</button>
        </Link>

        
      </div>
      {message ? 
         
         <Modal  open={open} onClose={onCloseModal} center>
           
           <h2 className={style.modal}>{message}</h2>
         </Modal> :null}
      
    </div>
  );
};

export default Login;
