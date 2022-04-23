import React from 'react';
import { logout } from '../../redux/authSlice';
import { useAppDispatch } from '../../redux/store';

const NavigationBar: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout: () => void = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Spotifun Music</h1>
      </div>
      <div className="navbar-login">
        <button className="btn btn-one" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
