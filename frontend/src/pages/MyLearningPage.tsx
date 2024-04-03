import { box1, box1_box1, box1_box2, box1_text, box2, box3, my_learning_page_content_container, my_learning_page_main_container, my_learning_page_title } from "../styles/MyLearningPage.css"

const MyLearningPage = () => {
  return (
    <div className={my_learning_page_main_container}>
      <div className={my_learning_page_title}>
        <p>하염빵님의 학습 공간</p>
      </div>
      <div className={my_learning_page_content_container}>
        <div className={box1}>
          <div className={box1_box1}>
            <p className={box1_text}>내가 푼 문제 수</p>
            <p className={box1_text}>13문제</p>
          </div>
          <div className={box1_box2}></div>
        </div>
        <div className={box2}></div>
        <div className={box3}></div>
      </div>
    </div>
  )
}

export default MyLearningPage