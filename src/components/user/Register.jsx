import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserFormWrapper } from '../../styles/UserFormStyle';

export default function Register() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [idCheck, setIdCheck] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const [idMsg, setIdMsg] = useState('');
  const [nameMsg, setNameMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [registerMsg, setRegisterMsg] = useState('');

  const [idCheckLoading, setIdCheckLoading] = useState(false);
  const [registerLoading, setRegisterLoading] = useState(false);

  // validation check
  useEffect(() => {
    name.trim() ? setNameCheck(true) : setNameCheck(false);
  }, [name]);

  useEffect(() => {
    password && passwordConfirm && password === passwordConfirm
      ? setPasswordCheck(true)
      : setPasswordCheck(false);
  }, [password, passwordConfirm]);

  // event handler
  const handleIdChange = (e) => {
    setId(e.target.value);
    idMsg && setIdMsg('');
    idCheck && setIdCheck(false);
    registerMsg && setRegisterMsg('');
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
    nameMsg && setNameMsg('');
    registerMsg && setRegisterMsg('');
  };
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'password':
        setPassword(value);
        break;
      case 'passwordConfirm':
        setPasswordConfirm(value);
        break;
      default:
    }
    passwordMsg && setPasswordMsg('');
    registerMsg && setRegisterMsg('');
  };

  // server request
  const requestIdCheck = async (e) => {
    e.preventDefault();
    if (!id) {
      setIdMsg('아이디를 먼저 입력해주세요.');
    } else {
      const body = { id };
      setIdCheckLoading(true);
      try {
        const res = await axios.post('https://st-fe34.herokuapp.com/api/user/idCheck', body);
        if (res.data.check) {
          setIdMsg('등록 가능한 아이디입니다.');
          setIdCheck(true);
        } else {
          setIdMsg('이미 등록된 아이디입니다.');
          setIdCheck(false);
        }
      } catch (e) {
        console.error(e);
      }
      setIdCheckLoading(false);
    }
  };
  const requestRegister = async (e) => {
    e.preventDefault();
    if (!(idCheck && nameCheck && passwordCheck)) {
      !idCheck && setIdMsg('아이디 먼저 확인해주세요.');
      !nameCheck && setNameMsg('이름을 입력해주세요.');
      !passwordCheck && setPasswordMsg('비밀번호가 일치하지 않습니다.');
    } else {
      const body = { id, name, password };
      setRegisterLoading(true);
      try {
        const res = await axios.post('https://st-fe34.herokuapp.com/api/user/register', body);
        if (res.data.code === 200) {
          alert('회원가입이 완료되었습니다.');
          navigate('/login');
        } else {
          setIdMsg('새로운 아이디를 입력해주세요.');
          setRegisterMsg('아이디가 선등록 되었습니다.');
          setIdCheck(false);
        }
      } catch (e) {
        console.error(e);
        setRegisterMsg('예상치 못한 예러가 발생했습니다.');
      }
      setRegisterLoading(false);
    }
  };

  return (
    <UserFormWrapper>
      <form onSubmit={requestRegister}>
        <h1>회원가입</h1>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" value={id} onChange={handleIdChange} />
        <button onClick={requestIdCheck} disabled={idCheck || idCheckLoading}>
          아이디 체크
        </button>
        {idMsg && <span className={idCheck ? 'success' : 'warning'}>{idMsg}</span>}

        <label htmlFor="name">이름:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
        {nameMsg && <span className="warning">{nameMsg}</span>}

        <label htmlFor="password">비밀번호:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <label htmlFor="passwordConfirm">비밀번호 확인:</label>
        <input
          type="password"
          id="passwordConfirm"
          name="passwordConfirm"
          value={passwordConfirm}
          onChange={handlePasswordChange}
        />
        {passwordMsg && <span className="warning">{passwordMsg}</span>}

        <button type="submit" disabled={!idCheck || registerLoading}>
          회원가입
        </button>
        {registerMsg && <span className="warning">{registerMsg}</span>}
      </form>
    </UserFormWrapper>
  );
}
