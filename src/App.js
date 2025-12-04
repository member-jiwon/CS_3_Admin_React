import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './admin/login/login';
import useAuthStore from './store/useAuthStore';
import MainIndex from './mainIndex/MainIndex'; // 새로 만든 MainIndex
import { connectAdminWebSocket } from './webSocket/connectWebSocket';
import "./styles/them.css";

function App() {
  const {isLogin, login} = useAuthStore(state => state);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const id = sessionStorage.getItem("id");
    if (token) {
      login(token, id);
      connectAdminWebSocket(token);
    }
  }, [])

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={!isLogin ? <Login /> : <MainIndex />} />
          {/* <Route path="/*" element={<MainIndex />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
