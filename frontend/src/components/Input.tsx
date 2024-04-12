import { HTMLInputTypeAttribute } from "react";
import { input, inputLabel, inputMessage } from "../styles/LoginStyle.css";

type InputProps = {
  children: React.ReactNode;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  ErrorMessage?: string;
  placeholder?: string;
  disabled?: boolean;
};
const Input = ({
  children,
  value,
  onChange,
  type,
  ErrorMessage,
  disabled,
}: InputProps) => {
  return (
    <div>
      <label className={inputLabel}>
        {children}
        <input
          className={input}
          value={value}
          onChange={onChange}
          type={type}
          required
          disabled={disabled}
        ></input>
      </label>
      <p className={inputMessage}>{ErrorMessage}</p>
    </div>
  );
};

export default Input;
