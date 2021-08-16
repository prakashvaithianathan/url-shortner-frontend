import React, { useState } from "react";
import { Switch } from "@material-ui/core";
import style from "./Toggle.module.css";

const Toggle = ({ handleChange, state }) => {
  return (
    <div className={style.toggle}>
      <Switch
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ "aria-label": "secondary checkbox" }}
      ></Switch>
      <div className={style.dayNight}>
        {" "}
        {state.checkedA ? <p>Night</p> : <p>Day</p>}
      </div>
    </div>
  );
};

export default Toggle;
