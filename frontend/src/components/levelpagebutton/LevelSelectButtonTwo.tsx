import { levelPageButtonText, levelPageButtonTwo } from "../../styles/LevelPage.css"

type Props = {
  name: string
  onClick: (() => void) | undefined
}

const LevelSelectButtonTwo = ({ name, onClick }: Props) => {
  return (
    <div className={levelPageButtonTwo} onClick={onClick}>
      <p className={levelPageButtonText}>{name}</p>
    </div>
  )
}

export default LevelSelectButtonTwo