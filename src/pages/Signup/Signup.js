import React,{useState} from "react";
import style from "./Signup.module.css";
import { TextField} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import validator from 'validator'
import {Link} from 'react-router-dom'
import axios from '../../axios'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

const Signup = ({state:{checkedA}}) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
   
    const [value, setValue] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      const [message, setMessage] = useState("")
      const [emailError, setEmailError] = useState('')
      
      const [emptyEmail, setEmptyEmail] = useState("")
      const [emptyFirstName,setEmptyFirstName] = useState("")
      const [emptyLastName,setEmptyLastName] = useState("")
      const [emptyPassword,setEmptyPassword] = useState("")
     
    
    
      const handleChange = (event) => {
    
        setEmptyLastName('')
        setEmptyFirstName('')
        setEmptyEmail('')
        setEmptyPassword('')
        setEmailError('')
        
        const { name, value } = event.target;
        setValue((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      };
    
      
    
      const handleClick = async(event) => {
       
         event.preventDefault();
    
       if(value.firstName.trim()===""){
         return setEmptyFirstName('! Please fill out this field')
       }
       if(value.lastName.trim()===""){
         return setEmptyLastName('! Please fill out this field')
       }
       if(value.email.trim()===""){
         return setEmptyEmail('! Please fill out this field')
       }
       if(value.password.trim()===""){
         return setEmptyPassword('! Please fill out this field')
       }
       
       if(validator.isEmail(value.email)){
                
        onOpenModal()
         
           try {
             const res = await axios.post('/api/user/signup',value,{
               headers: { 'Content-Type': 'application/json'}
             })
             console.log(res);
             
             if(res.status===200){
              setMessage(res.data.message);
             }
            
           
           } catch (error) {
             if(error.response.status===500)
             {
              setEmptyEmail('Email already exists')
              setMessage("");
              return  setValue({
               firstName:value.firstName,
               lastName:value.lastName,
               email:value.email,
               password:value.password
             })
             }
            setMessage(error.response.data.message);
            
         
            
           }
           setValue({
            firstName:'',
            lastName:'',
            email:'',
            password:'',
          })
         
         
       
    
    }else{
        setEmailError('! Enter the valid Email Address')
    }}


    
  return (
    <div className={style.container}>
       
    <Link to='/'>  <h1 className={style.logo}>Mini Url</h1></Link>
      <div className={checkedA?style.box:style.boxDay}>
          
          
          <h2>Create Account</h2>
          <form className={style.form}>
            {/* <h6 className={style.field}>Enter your Firstname</h6> */}
 
            <input
              className={style.input}
              type="text"
              name="firstName"
              required={true}
              onChange={handleChange}
              value={value.firstName}
              placeholder='Firstname'
            />
           
            <p className={style.warning}>
              {emptyFirstName? emptyFirstName :null}
            </p>
            {/* <br /> */}
            {/* <h6 className={style.field}>Enter your Lastname</h6> */}
            <input
              className={style.input}
              type="text"
              name="lastName"
              required={true}
              onChange={handleChange}
              value={value.lastName}
              placeholder='Lastname'
            />
            <p className={style.warning}>
             {emptyLastName? emptyLastName :null}
            </p>
            {/* <br /> */}

            {/* <h6 className={style.field}>Enter your Email</h6> */}
            <input
              className={style.input}
              type="email"
              name="email"
              required={true}
              onChange={handleChange}
              value={value.email}
              placeholder='Email'
            />
            <p className={style.warning}>
             {emptyEmail? emptyEmail :null}
             {emailError?emailError:null}
            </p>
            {/* <br /> */}
            {/* <h6 className={style.field}>Enter your Password</h6> */}
            <input
              className={style.input}
              type="password"
              name="password"
              autoComplete="cc-number"
              required={true}
              onChange={handleChange}
              value={value.password}
              placeholder='Password'
            />
            <p className={style.warning}>
            {emptyPassword? emptyPassword :null}
            </p>

            {/* <br /> */}
            <div className={style.buttonBox}>
              <button
                type="button"
                onClick={handleClick}
                className={style.button}
              >
                Sign-Up
              </button>
            </div>
          </form>
          <p>
            Already have an account ?{" "}
            <Link to="/login" className={style.link}>
              Sign in{" "}
            </Link>{" "}
          </p>
        
       
        
          </div>
          <div className={style.message}>
          {message ? 
         
         <Modal  open={open} onClose={onCloseModal} center>
           
           <h2 className={style.modal}>{message}</h2>
         </Modal> :null}
          </div>
      
    </div>
  );
};

export default Signup;
