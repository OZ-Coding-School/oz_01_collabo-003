import { level_page_button_text, level_page_button_two } from "../../styles/LevelPage.css"

type Props = {
  name: string
  onClick: (() => void) | undefined
}

const LevelSelectButtonTwo = ({ name, onClick }: Props) => {
  return (
    <div className={level_page_button_two} onClick={onClick}>
      <p className={level_page_button_text}>{name}</p>
    </div>
  )
}

export default LevelSelectButtonTwo