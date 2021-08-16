import React,{useState} from 'react'
import style from './ForgotPassword.module.css'

import { Link, Redirect } from "react-router-dom";

const ForgotPassword = ({state:{checkedA}}) => {



    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [value, setValue] = useState({
      email: "",
      password: "",
      confirmPassword: "",
    });
  
    const [emptyEmail, setEmptyEmail] = useState("")
    const [emptyPassword,setEmptyPassword] = useState("")
    const [emptyConfirmPassword, setEmptyConfirmPassword] = useState("")
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setEmptyPassword('')
      setEmptyEmail('')
      setEmptyConfirmPassword('')
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
      if(value.confirmPassword.trim()===""){
        return setEmptyConfirmPassword('! Please fill out this field')
      }
      if(value.password!==value.confirmPassword){
        return setEmptyConfirmPassword('! Password Mismatch')
      }



    }



    return (
        <div>
             <div className={checkedA?style.container:style.containerDay}>
      {nextPage ? <Redirect to="/"></Redirect> : null}
      <div className={style.logo}>
      <Link to='/'> <h1>Mini Url</h1></Link> 
      </div>
      <div className={style.mainBox}>
        <div className={style.box}>
          <form className={style.form}>
            {/* <h2>Sign-In</h2> */}
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
            <br />
            <input
              className={style.input}
              type="password"
              required={true}
              autoComplete="cc-number"
              onChange={handleChange}
              value={value.confirmPassword}
              name="confirmPassword"
              placeholder=' Confirm Password...'
            />
            <p className={style.warning}>{emptyConfirmPassword?emptyConfirmPassword:null}</p>
            <br />
            <br />
            <div className={style.buttonBox}>
              <button
                type="submit"
                onClick={handleClick}
                className={style.button}
              >
                Change
              </button>
            </div>
          </form>
        
        </div>
    

      </div>
     
    </div>
        </div>
    )
}

export default ForgotPassword
