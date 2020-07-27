import React from "react";
import "./button.css";

const STYLES = [
  "btn--primary--solid",
  "btn--clear--solid",
  "btn--operator--solid",
  "btn--number--solid",
  "btn--equals--solid",
  "btn--warning--solid",
  "btn--danger--solid",
  "btn--success--solid",
  "btn--primary--outline",
  "btn--warning--outline",
  "btn--danger--outline",
  "btn--success--outline",
];

const SIZES = [
  "btn--normal",
  "btn--long",
  "btn--wide",
];

export const Button = ({ 
  children, 
  type, 
  onClick, 
  buttonStyle, 
  buttonSize 
}) => {

  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  return(
    <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};