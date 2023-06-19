import AccountCircle from './AccountCircle';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import KeyboardOutlinedIcon from '@mui/icons-material/KeyboardOutlined';

const Header = () => {
const navigate = useNavigate();

const openHomePage = ()=>{
  navigate("/");
}

  return (

    <div className="header">
      <div className="logo" onClick={openHomePage}>
      <img src="https://cdn-icons-png.flaticon.com/512/1804/1804483.png" alt=""  style={{width:"55px",height:"55px"}}/>
        <span className='logo-name'>Typing-Trainer</span>
      </div>
      <div className="user-icon">
        <AccountCircle />
      </div>
    </div>
  )
}

export default Header