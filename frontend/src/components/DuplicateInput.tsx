import { HTMLInputTypeAttribute } from "react";
import {
  duplicateCheckBtn,
  duplicateInputDiv,
  input,
} from "../styles/LoginStyle.css";
import {} from "../styles/signupStyle.css";

type InputProps = {
  children: React.ReactNode;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type: HTMLInputTypeAttribute;
};
const DuplicateInput = ({ children, value, onChange, type }: InputProps) => {
  return (
    <div>
      <label>
        {children}
        <div className={duplicateInputDiv}>
          <input
            className={input}
            value={value}
            onChange={onChange}
            type={type}
            required
          ></input>
          <button className={duplicateCheckBtn}>중복 확인</button>
        </div>
      </label>
    </div>
  );
};

export default DuplicateInput;
