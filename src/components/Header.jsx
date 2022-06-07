import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../reducer/userSlice';

import { HeaderWrapper } from '../styles/HeaderStyle';

export default function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  return (
    <HeaderWrapper>
      <div className="logo">
        <Link to="/">
          <img
            src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/116213338/original/7018431291594eca898c7fc1615c56baf9c9fba8/do-cheap-logo-design.png"
            alt="로고"
          />
        </Link>
      </div>
      <nav className="navigation">
        <Link to="/">HOME</Link>
        {user.isLogin ? (
          <>
            <Link to="/upload">게시물 등록</Link>
            <a href="/" onClick={handleLogout}>
              로그아웃
            </a>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
          </>
        )}
      </nav>
    </HeaderWrapper>
  );
}
