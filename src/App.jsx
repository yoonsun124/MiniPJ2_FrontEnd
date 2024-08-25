import "./App.css";
import { useState, useEffect } from "react";						
import { Link, Route, Routes } from "react-router-dom";

import Login from "./page/Login";
import Logout from './page/Logout';
import Home from "./page/Home";
import Join from "./page/Join";

import List from "./page/List";
import Write from "./page/Write";
import Detail from "./page/Detail";

import ProtectedRoute from './page/ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 사용자가 로그인되어 있는지 확인하기 위해 useEffect를 사용
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);  // 토큰이 존재하면 로그인된 것으로 간주
  }, []);

  return (
 
    <>
      <nav>
        {isLoggedIn ? (
          <Link to="/logout"><button>Logout</button></Link>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}
      </nav>
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

