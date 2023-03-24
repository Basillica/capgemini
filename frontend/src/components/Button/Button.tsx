import React from 'react';
import "./Button.css";

interface ButtonProps {
  buttonText: string;
  buttonClass?: string;
  buttonAction?: React.MouseEventHandler<HTMLButtonElement>;
}
const Button = ({
  buttonText,
  buttonClass,
  buttonAction,
}: ButtonProps) => {
  return (
    <button onClick={buttonAction} className={buttonClass ? buttonClass : "btn"}>
      {buttonText}
    </button>
  );
};

export default Button;
