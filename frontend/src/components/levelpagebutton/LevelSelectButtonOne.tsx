import { level_page_button_one, level_page_button_text } from "../../styles/LevelPage.css"

type Props = {
  name: string
  onClick: () => void
}

const LevelSelectButtonOne = ({ name, onClick }: Props) => {
  return (
    <div className={level_page_button_one} onClick={onClick}>
      <p className={level_page_button_text}>{name}</p>
    </div>
  )
}

export default LevelSelectButtonOne