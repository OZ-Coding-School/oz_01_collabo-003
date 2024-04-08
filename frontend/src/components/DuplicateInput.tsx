import { HTMLInputTypeAttribute, MouseEventHandler } from "react";
import {
  duplicateCheckBtn,
  duplicateInputDiv,
  input,
  inputLabel,
  inputMessage,
} from "../styles/LoginStyle.css";

type InputProps = {
  children: React.ReactNode;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  ErrorMessage?: string;
  onClick?: MouseEventHandler;
};
const DuplicateInput = ({
  children,
  value,
  onChange,
  type,
  required,
  ErrorMessage,
  onClick,
}: InputProps) => {
  return (
    <div>
      <label className={inputLabel}>
        {children}
        <div className={duplicateInputDiv}>
          <input
            className={input}
            value={value}
            onChange={onChange}
            type={type}
            required={required}
          ></input>
          <button className={duplicateCheckBtn} onClick={onClick}>
            중복 확인
          </button>
          <p className={inputMessage}>{ErrorMessage}</p>
        </div>
      </label>
    </div>
  );
};

export default DuplicateInput;
