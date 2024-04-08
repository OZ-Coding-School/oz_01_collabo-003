import { HTMLInputTypeAttribute } from "react";
import {
  input,
  inputLabel,
  inputMessage,
  inputdiv,
} from "../styles/LoginStyle.css";

type InputProps = {
  children: React.ReactNode;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  ErrorMessage?: string;
};
const Input = ({
  children,
  value,
  onChange,
  type,
  required,
  ErrorMessage,
}: InputProps) => {
  return (
    <div className={inputdiv}>
      <label className={inputLabel}>
        {children}
        <input
          className={input}
          value={value}
          onChange={onChange}
          type={type}
          required={required}
        ></input>
      </label>
      <p className={inputMessage}>{ErrorMessage}</p>
    </div>
  );
};

export default Input;
