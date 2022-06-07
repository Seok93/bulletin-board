import { Route, Routes } from 'react-router-dom';
import style from './App.module.css';

import Header from './components/Header';
import Login from './components/user/Login';
import Register from './components/user/Register';
import BulletinBoard from './components/bulletin-board/BulletinBoard';
import AddBulletinBoard from './components/bulletin-board/AddBulletinBoard';

function App() {
  return (
    <div className={style['wrapper']}>
      <Header />
      <main className={style['content']}>
        <Routes>
          <Route path="/" element={<BulletinBoard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/upload" element={<AddBulletinBoard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
