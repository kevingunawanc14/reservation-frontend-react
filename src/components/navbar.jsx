import { IoCompassOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { LiaHeartbeatSolid } from "react-icons/lia";
import { IoTrophyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const navigate = useNavigate();

    const handleNavigate = (pageName) => {
        navigate(`${pageName}`);
    };

    useEffect(() => {
        // console.log(window.location.pathname)
        // console.log(window.location.href)

    }, []);
    const [isActive, setIsActive] = useState(false);


    return (
        <div className="btm-nav mt-10">
            <button className={window.location.pathname === '/' ? 'active text-primary' : ''} onClick={() => handleNavigate('/')}>
                <IoCompassOutline />
                <span className="btm-nav-label">Home</span>
            </button>

            <button className={window.location.pathname === '/journal' ? 'active text-primary' : ''} onClick={() => handleNavigate('/journal')}>
                <LiaHeartbeatSolid />
                <span className="btm-nav-label">Journal</span>
            </button>

            <button className={window.location.pathname === '/payment' ? 'active text-primary' : ''} onClick={() => handleNavigate('/payment')}>
                <RiMoneyDollarCircleLine />
                <span className="btm-nav-label">Payment</span>
            </button>

            <button className={window.location.pathname === '/leaderboard' ? 'active text-primary' : ''} onClick={() => handleNavigate('/leaderboard')}>
                <IoTrophyOutline />
                <span className="btm-nav-label">Leaderboard</span>
            </button>

            <button className={window.location.pathname === '/setting' ? 'active text-primary' : ''} onClick={() => handleNavigate('/setting')}>
                <RiAccountCircleLine />
                <span className="btm-nav-label">Account</span>
            </button>
        </div >
    );
}