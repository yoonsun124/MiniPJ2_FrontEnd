import "./App.css";
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import Login from "./page/Login";
import Logout from './page/Logout';
import Home from "./page/Home";
import Join from "./page/Join";

import List from "./page/List";
import Write from "./page/Write";
import Detail from "./page/Detail";

import ProtectedRoute from './page/ProtectedRoute';

function App() {
  const location = useLocation();
    const isLoggedIn = !!localStorage.getItem('token'); // 인증 여부 확인

    // 로그인 페이지, 회원가입 페이지에서는 버튼을 숨기기
    const showAuthButtons = location.pathname !== '/login' && location.pathname !== '/join';

    return (
        <>
            {showAuthButtons && (
                <nav>
                    {isLoggedIn ? (
                        <Link to="/logout"><button>Logout</button></Link>
                    ) : (
                        <Link to="/login"><button>Login</button></Link>
                    )}
                </nav>
            )}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/logout" element={<Logout />} />  

        <Route path="/list" element={<ProtectedRoute element={List} />} />
        <Route path="/write" element={<ProtectedRoute element={Write} />} />
        <Route path="/detail/:boardIdx" element={<ProtectedRoute element={Detail} />} />    
      </Routes>
    </>

  );
}

export default App;

