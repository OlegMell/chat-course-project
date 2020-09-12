import React from "react";
import {useAlert} from "./AlertContext";


export default function Alert() {
  const { alertText, alert } = useAlert();

  if (!alert) return null;

  return (
      <div className="alert alert-light" style={{'position': 'absolute'}} role="alert">
        { alertText }
      </div>
  )
}