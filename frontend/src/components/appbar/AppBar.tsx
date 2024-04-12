import { useLocation, useNavigate } from 'react-router-dom';
import { nav } from '../../styles/AppBar.css';
import { levelPageLogo, levelPageTopButton, levelPageTopMenu } from '../../styles/LevelPage.css';
import './AppBar.css';

const AppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <div className='app_bar_main_container'>
      <div className={levelPageTopMenu}>
        <img className={levelPageLogo} src='/images/logo.png' alt='로고' />
        <div className={levelPageTopButton} onClick={() => navigate(
          location.pathname === '/learning' ? '/level' : '/learning')}>
          <p>{location.pathname === '/learning' ? '메인페이지로' : '나의 학습공간'}</p>
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
              <div className='menu_list_item' onClick={() => navigate('/level')}>메인페이지</div>
              <div className='menu_list_item' onClick={() => navigate('/learning')}>나의 학습공간</div>
              <div className='menu_list_item' onClick={() => navigate('/user-update')}>정보수정</div>
              <div className='menu_list_item' onClick={handleLogout}>로그아웃</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppBar