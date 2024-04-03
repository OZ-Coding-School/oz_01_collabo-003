import { nav } from '../../styles/AppBar.css';
import { level_page_logo, level_page_top_button, level_page_top_menu } from '../../styles/LevelPage.css';
import './AppBar.css';

const AppBar = () => {
  return (
    <div className='app_bar_main_container'>
      <div className={level_page_top_menu}>
        <img className={level_page_logo} src='images/logo.png' alt='로고' />
        <div className={level_page_top_button}>
          <p>나의 학습공간</p>
        </div>
      </div>
      <div className={nav}>
        <div className='container'>
          <input type='checkbox' className='menu_icon_input' id='menu_icon' />
          <div className="menu_bar">
            <label htmlFor='menu_icon' className='menu_icon'>
              <span className='menu_icon_bar'></span>
              <span className='menu_icon_bar'></span>
              <span className='menu_icon_bar'></span>
            </label>
          </div>
          <div className='menu'>
            <div className='user_info'>
              <div className='user_icon'></div>
              <p className='user_nickname'>닉네임</p>
            </div>
            <div className='menu_list'>
              <div className='menu_list_item'>메뉴 1</div>
              <div className='menu_list_item'>메뉴 2</div>
              <div className='menu_list_item'>메뉴 3</div>
              <div className='menu_list_item'>메뉴 4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppBar