import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance'; // axiosInstance의 경로를 적절히 수정하세요

export default function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                // 서버에 로그아웃 요청
                await axiosInstance.get('/logout');
                // 로컬 스토리지에서 토큰 제거
                localStorage.removeItem('token');
                // 로그아웃 알림
                alert('로그아웃 되었습니다!');
                // 로그인 페이지로 리디렉션
                navigate('/login');
            } catch (error) {
                console.error('Logout error:', error);
                // 로그아웃 오류가 발생하면 알림을 띄우고 로그인 페이지로 이동
                alert('로그아웃 중 오류가 발생했습니다.');
                navigate('/login');
            }
        };

        handleLogout();
    }, [navigate]);

    return null; // 컴포넌트는 UI를 렌더링하지 않음
}
