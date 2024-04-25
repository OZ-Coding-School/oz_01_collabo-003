import {
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";
import {
  duplicateCheckBtn,
  duplicateCheckBtnChecked,
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
  isEmail?: boolean;
  isUserName?: boolean;
  disabled?: boolean;
  onKeyDown?: KeyboardEventHandler;
};
const DuplicateInput = ({
  children,
  value,
  onChange,
  type,
  required,
  ErrorMessage,
  onClick,
  onKeyDown,

  disabled,
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
            onKeyDown={onKeyDown}
          ></input>
          {/* disabled 이면 버튼 색 없어지게 */}
          <button
            disabled={disabled}
            className={disabled ? duplicateCheckBtn : duplicateCheckBtnChecked}
            onClick={onClick}
          >
            중복 확인
          </button>
          <p className={inputMessage}>{ErrorMessage}</p>
        </div>
      </label>
    </div>
  );
};

export default DuplicateInput;
