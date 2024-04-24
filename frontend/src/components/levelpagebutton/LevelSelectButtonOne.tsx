import {
  levelPageButtonOne,
  levelPageButtonText,
} from "../../styles/LevelPage.css";

export type Props = {
  name: string;
  number: number;
  onClick?: () => void;
};

const LevelSelectButtonOne = ({ name, onClick, number }: Props) => {
  console.log("넘버", number);
  return (
    <div className={levelPageButtonOne} data-index={number} onClick={onClick}>
      <p className={levelPageButtonText} data-index={number}>
        {name}
      </p>
    </div>
  );
};

export default LevelSelectButtonOne;
