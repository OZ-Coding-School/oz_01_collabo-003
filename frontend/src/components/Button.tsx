import { MouseEventHandler } from "react";
import { mainButton } from "../styles/ButtonStyle.css";

type ButtonProps = {
  children: React.ReactNode;
  type: "submit" | "reset" | "button" | undefined;
  onClick: MouseEventHandler;
  
};

function Button({ children, type, onClick }: ButtonProps) {
  return (
    <button className={mainButton} type={type} onClick={onClick} >
      {children}
    </button>
  );
}

export default Button;


