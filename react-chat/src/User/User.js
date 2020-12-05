import React, {useState} from "react";
import './user.scss';
import Menu from "./menu/Menu";

export default function User({photo}) {
  const [isVisible, setIsVisible] = useState("");

  let classes = ['img-wrapper'];

  if (isVisible === "hovered") {
    classes.push("hover")
  }

  return (
      <div
          className={'user-box'}
          onMouseLeave={() => {
            isVisible === "clicked" || setIsVisible("");
          }}
          onMouseEnter={() => {
            isVisible === "clicked" || setIsVisible("hovered");
          }}
          onClick={() => {
            isVisible !== "clicked" ?
                setIsVisible("clicked") :
                setIsVisible("");
          }}
      >
        {/*<div className="username">oleg.mel123@gmail.com</div>*/}
        <div className={classes.join(" ")}>
          <img
              src={`https://drive.google.com/uc?export=view&id=${photo}`}
              alt="user icon"/>
        </div>

        <Menu visibility={isVisible}/>
      </div>
  )
}