import React,{useState,useEffect} from 'react'
import axios from '../../axios'
import {TableBody,TableCell,TableContainer,TableHead,TableRow,Table} from '@material-ui/core'
import style from './Report.module.css'
import Paper from '@material-ui/core/Paper';
import { withStyles, Theme, createStyles,makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom'


const About = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([])
    useEffect(()=>{
       (async()=>{
         try {
           const {data} = await axios.get('api/url/find/report',{headers:{authorization:token}});
           
           setData(data)
         } catch (error) {
           console.log(error);
         } 
       })()
    },[])

    const StyledTableCell = withStyles((theme) => ({
      head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      body: {
        fontSize: 14,
      },
    }))(TableCell);
    
    const StyledTableRow = withStyles((theme) => ({
      root: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    }))(TableRow);




    const useStyles = makeStyles({
      table: {
        minWidth: 650,
      },
    });
    const classes = useStyles();
   
  return (
    <div className="container">
    {token && data?
    
    <div>
    <h1 className={style.title}>Already used URL</h1>
  <TableContainer className={style.table}  component={Paper}>
  <Table className={classes.table}   aria-label="simple table">
    <TableHead>
      <TableRow className={style.rowHead}>
        <StyledTableCell className={style.rowHead}>SI.No.</StyledTableCell>
        <StyledTableCell className={style.rowHead} align="right">Date.</StyledTableCell>
        <StyledTableCell className={style.rowHead} align="right">ShortUrl</StyledTableCell>
        <StyledTableCell className={style.rowHead} align="right">LongUrl</StyledTableCell>
       
      </TableRow>
    </TableHead>
    <TableBody>
      {data.map((item,i) => (
        <StyledTableRow key={i}>
          <StyledTableCell className={style.row} component="th" scope="row">{i+1}</StyledTableCell>
          <StyledTableCell className={style.row} align="right">{item.date}</StyledTableCell>
          <StyledTableCell className={style.row} align="right">{item.shortUrl}</StyledTableCell>
          <StyledTableCell className={style.row} align="right">{item.longUrl}</StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
  </div>: <Redirect to='/'></Redirect> }
      
    </div>
  )
}
export default About;