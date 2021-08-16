import React,{useState, useEffect} from 'react'
import {Line,Bar} from 'react-chartjs-2'
import style from './Dashboard.module.css'
import {useSelector,useDispatch} from 'react-redux'
import axios from '../../axios'
import { CircularProgress } from "@material-ui/core";
import { Redirect } from 'react-router-dom'

const Dashboard = () => {
  const [value, setValue] = useState(0)
  const [month, setMonth] = useState('')
   useEffect(() =>{
     const token = localStorage.getItem('token') 
     if(token){
      (async()=>{
        
        
        const {data} = await axios.get('/api/url/find/data',{
          headers: {'Content-Type': 'application/json',authorization:token}
        })
        
       
         setMonth(data.monthValue)
        setValue(data.dailyValue);
      })()
    }
   },[])

   const monthNames = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
 ];
 const token = localStorage.getItem('token')
const d = new Date()
 
  return (
   <div>
     {
       token ?
       <div>
       {token?(
         <div className={style.chart}>
            <Bar
  
            data={{
           
                labels:["Today's Limit","Processed URL"],
                datasets:[
                    {
                        label: new Date().toDateString(),
                        backgroundColor:["orange","green"],
                        data:[10,value],
                        fontColor:'red'
 
                    }
                ]
            }}
            
            ></Bar>
          
            </div>
       ):<div className={style.spinner}>
           
       <CircularProgress color="secondary"></CircularProgress>
     </div>}
       <div className={style.month}>
       <h1>Total no. of URL's processed in {monthNames[d.getMonth()]} month : {month}</h1>
       </div>
     </div> :<Redirect to='/'></Redirect>
     }
   </div>
  )
}

export default Dashboard
