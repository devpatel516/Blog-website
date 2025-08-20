import { Link, useNavigate } from "react-router-dom";
import "./header.css"; 
const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("accessToken"); 
        sessionStorage.removeItem("refreshToken");
        navigate("/account");
    };

    return (
        <div className="header-container font-mono text-gray-900 bg-white hover:opacity-100 transition-all duration-500 rounded-lg">
        <nav className="header">
            <ul className="nav-links flex justify-center  gap-6 p-5 text-lg">
                <li className="hover:text-xl transition-all duration-75"><Link to="/home">Home</Link></li>
                <li className="hover:text-xl transition-all duration-75"><Link to="/about">About</Link></li>
                <li className="hover:text-xl transition-all duration-75"><Link to="/contact">Contact</Link></li>
                <li className="hover:text-xl transition-all duration-75"><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
            </ul>
        </nav>
        </div>
    );
};

export default Header;
