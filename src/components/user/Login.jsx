import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../../reducer/userSlice';
import { UserFormWrapper } from '../../styles/UserFormStyle';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loginMsg, setLoginMsg] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const handleIdChange = (e) => {
    setId(e.target.value);
    loginMsg && setLoginMsg('');
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    loginMsg && setLoginMsg('');
  };

  const reqeustLogin = async (e) => {
    e.preventDefault();

    if (!(id && password)) {
      setLoginMsg('ID 또는 비밀번호를 입력해주세요.');
    } else {
      const body = { id, password };
      setLoginLoading(true);
      try {
        const res = await axios.post('https://st-fe34.herokuapp.com/api/user/login', body);
        const { code, userInfo } = res.data;
        switch (code) {
          case 400:
            throw new Error('body 값이 비어 있습니다.');
          case 401:
            setLoginMsg('존재하지 않는 id입니다.');
            break;
          case 402:
            setLoginMsg('비밀번호가 틀렸습니다.');
            break;
          default:
            dispatch(login(userInfo));
            navigate('/');
        }
      } catch (e) {
        console.error(e);
        setLoginMsg('예상치 못한 오류가 발생했습니다. 다시 시도해주세요.');
      }
      setLoginLoading(false);
    }
  };
  return (
    <UserFormWrapper>
      <form onSubmit={reqeustLogin}>
        <h1>로그인</h1>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" value={id} onChange={handleIdChange} />
        <label htmlFor="password">비밀번호:</label>
        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        <button type="submit" disabled={loginLoading}>
          로그인
        </button>
        {loginMsg && <span className="warning">{loginMsg}</span>}
      </form>
    </UserFormWrapper>
  );
}
