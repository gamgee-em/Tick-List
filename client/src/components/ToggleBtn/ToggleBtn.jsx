import { useState } from 'react';
import './ToggleBtn.css';

const ToggleBtn = () => {
  const handleRememberMe = (e) => {
    let isChecked = e.target.checked;
    isChecked
      ? localStorage.setItem('remember_me', 'true')
      : localStorage.setItem('remember_me', 'false');
  };

  return (
    <div className='toggle-container'>
      <h6> Remember Me? </h6>
      <div className='toggle'>
        <input
          type='checkbox'
          className='toggle-btn'
          onChange={(e) => handleRememberMe(e)}
        />
        <span className='circle'> </span>
      </div>
    </div>
  );
};

export default ToggleBtn;
