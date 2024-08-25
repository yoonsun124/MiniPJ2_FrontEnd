import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const navigate = useNavigate();


        const handleSubmit = async (event) => {
            event.preventDefault();
            const newErrors = { username: '', password: '' };
            let valid = true;
    
            if (!username) {
                newErrors.username = '아이디를 입력하세요.';
                valid = false;
            }
    
            if (!password) {
                newErrors.password = '비밀번호를 입력하세요.';
                valid = false;
            }
    
            if (!valid) {
                setErrors(newErrors);
                return;
            }

        try {
            const response = await axios.post(`http://localhost:8080/api/loginProc`, {  //로그인 요청을 서버로 보냄
                username,
                password
            });

            if (response.status === 200) {
                const token = response.headers['token']; // 헤더에서 'token' 값을 가져오기
                localStorage.setItem('token', token);
                navigate('/home');  // 로그인 성공 시 홈페이지로 리디렉션
            } else {
                alert('아이디 또는 비밀번호가 일치하지 않습니다!');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('로그인에 실패하였습니다!');
        }
    };

    const homeButtonClick = (e) => {
        e.preventDefault();
        navigate('/home');
    };

    return (
        <div className="login-container">
            <h2>로그인 페이지입니다.</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="ID를 입력하세요." 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    {/* 아이디 입력 필드 아래 오류 메시지 */}
                    {errors.username && <span className="error-message">{errors.username}</span>}
                </div>

                <div className="form-group">
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="패스워드를 입력하세요." 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {/* 비밀번호 입력 필드 아래 오류 메시지 */}
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <button type="submit">로그인</button>
            </form>
            <button 
                id="home" 
                className="btn" 
                onClick={homeButtonClick}
            >
                홈페이지로
            </button>
        </div>
    );
}