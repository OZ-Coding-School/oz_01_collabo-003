import { HTMLInputTypeAttribute } from "react";
import { input } from "../styles/LoginStyle.css";

type InputProps = {
  children: React.ReactNode;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: HTMLInputTypeAttribute;
};
const Input = ({ children, value, onChange, type }: InputProps) => {
  return (
    <div>
      <label>
        {children}
        <input
          className={input}
          value={value}
          onChange={onChange}
          type={type}
          required
        ></input>
      </label>
    </div>
  );
};

export default Input;
