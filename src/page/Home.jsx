import { Link } from "react-router-dom";

export default function Home() {

    return (
        <div className="home-container">
            <h1>Home page</h1>
        

            <Link to="/list" className="btn">게시판</Link>
            <Link to="/login" className="btn">Login</Link>
            <Link to="/join" className="btn">회원가입</Link>
        </div>
    );
}


