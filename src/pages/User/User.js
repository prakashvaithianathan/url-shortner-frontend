import React,{useState,useEffect} from 'react'
import style from './User.module.css'
import axios from '../../axios'
import classnames from 'classnames'
import { Modal } from 'react-responsive-modal';
import {useSelector,useDispatch} from 'react-redux'
import * as authActions from '../../store/actions/user'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

const User = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const token = localStorage.getItem("token");
  const [user, setUser] = useState('')
  const [message, setMessage] = useState('')
  const [value, setValue] = useState({
    firstName:'',
    lastName:'',
    email:''
  })
  const [disable, setDisable] = useState(true)
    useEffect(()=>{
       (async()=>{
         try {
           const {data} = await axios.get('api/user/data',{headers:{authorization:token}});
           
           setValue(data.data)
           setUser(data.data)
         } catch (error) {
           console.log(error);
         }
       })()
    },[token])
   
    
    const handleChange=(event)=>{
      
      const { name, value } = event.target;
      
        setValue((prev)=>{
          return{
            ...prev,
            [name]:value
          }
        })
    }
  
    const update=async(event)=>{
      event.preventDefault()
      setDisable(true);
       onOpenModal()
     try {
      const {data} = await axios.put('/api/user/update',value,{headers:{
        'authorization':token,
        'Content-Type':'application/json'
      }})
      
      setMessage(data.message);
     } catch (error) {
       setMessage(error.message);
     }
      
    }

    const logout=()=>{
     dispatch(authActions.logout())
    }
    
  return (
 <div>
   {token?(
      <div className="container">
      
      <div className={classnames(style.container,`${disable?style.disable:null}`)} >
        <form className={style.form}>
        <h1>User Data</h1>
          <div>
            <span>First Name: &nbsp;</span><input disabled={disable} type="text" name='firstName' value={value.firstName} onChange={handleChange}/>
          </div>
          <div>
            <span>Last Name: &nbsp;</span><input disabled={disable} type="text" name='lastName' value={value.lastName} onChange={handleChange}/>
          </div>
          <div>
            <span>Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><input disabled={disable} type="email" name='email' value={value.email} onChange={handleChange}/>
          </div>
          {/* <div>
            <span>Password: &nbsp;&nbsp;&nbsp;</span><input disabled={disable} type="password" name='password' value={value.password} onChange={handleChange}/>
          </div> */}
          </form>
      </div>
       <div className={style.button}>
         <button onClick={()=>setDisable(false)}>Edit</button>
         <button onClick={update}>Update</button>
       <Link to='/login'>  <button onClick={logout} className={style.logout}>Log-Out</button></Link>
       </div>
       {message ? 
           
           <Modal  open={open} onClose={onCloseModal} center>
             
             <h2 className={style.modal}>{message}</h2>
           </Modal> : null}
    </div>
   ):<Redirect to='/'></Redirect> }
 </div>
  )
}
export default User;