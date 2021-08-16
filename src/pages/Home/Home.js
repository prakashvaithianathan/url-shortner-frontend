import React, { useState, useEffect } from "react";

import { SearchRounded,FileCopyOutlined } from "@material-ui/icons";
import classnames from "classnames";
import Ztext from "react-ztext";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../../store/actions/user";
import { Link } from "react-router-dom";
import validUri from "valid-url";
import axios from "../../axios";
import { CircularProgress } from "@material-ui/core";
import style from "./Home.module.css";
import {Redirect} from 'react-router-dom'
import copy from "copy-to-clipboard";


const Home = ({ state: { checkedA } }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const token = localStorage.getItem("token");
const [user, setUser] = useState('')
const [result, setResult] = useState('')
  useEffect(()=>{
     (async()=>{
       try {
         const {data} = await axios.get('api/user/data',{headers:{authorization:token}});
         
         setUser(data)
       } catch (error) {
         
       }
     })()
  },[token])

  if (!user) {
    dispatch(authActions.login(token));
  }
  const [message, setMessage] = useState("");
  const handleClick = async () => {
    if (value.trim() === "") {
      return setMessage("Please fill the input box");
    }
    if (validUri.isUri(value)) {
      setMessage("");
      const url = { longUrl: value };
      
      const { data } = await axios.post("/api/url/shorten", url, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      setResult(data.shortUrl)
    } else {
      return setMessage("Enter the correct Url");
    }
  };
  const handle = () => {
    setMessage("");
    setValue("");
    setResult("")
  };
  const [loading, setLoading] = useState(user);
  setTimeout(() => {
    setLoading(true);
  }, 1000);
 

  const copied = () => {
    // const output = document.querySelector("#output").innerHTML;
    copy(result);
    alert("Successfully copied: " + result);
  };


  return (
    <div>
      {token ?
      <div>
      {loading ? (
        <div className={style.container}>
          <Ztext
            // depth='5rem'
            direction="both"
            event="pointer"
            eventRotation="5deg"
            eventDirection="default"
            fade={false}
            layers={2}
            perspective="500px"
            style={{
              fontSize: "5rem",
              // color:'pink',
              position: "absolute",
              left: "50%",
              top: "20%",
              transform: "translateX(-50%)",
              // color: "none",
              fontFamily: "cursive",
            }}
          >
          
            {token  ? (
              <span role="img" aria-label="emoji" className={style.mainText}>
                
                
                 {/* Hi, {user.data.firstName} {user.data.lastName} */}
            
              </span>
            ) : null}
          </Ztext>
          <div
            className={classnames(
              style.inputBox,
              `${checkedA ? style.nightInputBox : style.dayInputBox}`
            )}
          >
            <input
              placeholder="Put your Long Url here......"
              type="text"
              name="url"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              onClick={handle}
            />
            <SearchRounded className={style.searchRounded} onClick={handleClick}></SearchRounded>
          </div>
          {message ? <h3 className={style.message}>{message}</h3> : null}
          <div className={classnames(style.proceed)}>
            {!user ? (
              <CircularProgress color="secondary"></CircularProgress>
            ) : user && token ? (
              <button onClick={handleClick}>Proceed</button>
            ) : (
              <Link to="/login">
                {" "}
                <button>Sign in and Proceed</button>
              </Link>
            )}
          </div>
          {result?
          <div className={style.result} onClick={copied}>
          <h4 id="output">
            {result}
          </h4>
          <FileCopyOutlined className={style.file}></FileCopyOutlined>
        </div>:null}
        </div>
      ) : (
        <div className={style.spinner}>
          
          <CircularProgress color="secondary"></CircularProgress>
        </div>
      )}
    </div> : <Redirect to="/login"></Redirect> }
    </div>
  );
};
export default Home;
