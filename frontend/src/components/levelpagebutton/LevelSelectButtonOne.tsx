import { levelPageButtonOne, levelPageButtonText } from "../../styles/LevelPage.css"

export type Props = {
  name: string
  onClick: () => void
}

const LevelSelectButtonOne = ({ name, onClick }: Props) => {
  return (
    <div className={levelPageButtonOne} onClick={onClick}>
      <p className={levelPageButtonText}>{name}</p>
    </div>
  )
}

export default LevelSelectButtonOne