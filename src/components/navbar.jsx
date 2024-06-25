import { IoCompassOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { LiaHeartbeatSolid } from "react-icons/lia";
import { IoTrophyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoCompass } from "react-icons/io5";
import { PiHeartbeatLight } from "react-icons/pi";
import { PiHeartbeatFill } from "react-icons/pi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoTrophy } from "react-icons/io5";
import { TbStars } from "react-icons/tb";

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
        <div className="btm-nav mt-10 z-40">
            <button className={`sm:btm-nav-md btm-nav-xs ${window.location.pathname === '/' ? 'active text-primary ' : ''}`} onClick={() => handleNavigate('/')}>
                {window.location.pathname === '/' ? <IoCompass /> : <IoCompassOutline />}
                <span className={window.location.pathname === '/' ? 'btm-nav-label font-medium' : 'btm-nav-label'}>Home</span>
            </button>

            <button className={`sm:btm-nav-md btm-nav-xs ${window.location.pathname === '/journal' ? 'active text-primary ' : ''}`} onClick={() => handleNavigate('/journal')}>
                {window.location.pathname === '/journal' ? <PiHeartbeatFill /> : <PiHeartbeatLight />}
                <span className={window.location.pathname === '/journal' ? 'btm-nav-label font-medium' : 'btm-nav-label'}>Journal</span>
            </button>

            <button className={`sm:btm-nav-md btm-nav-xs ${window.location.pathname === '/payment' ? 'active text-primary ' : ''}`} onClick={() => handleNavigate('/payment')}>
                {window.location.pathname === '/payment' ? <RiMoneyDollarCircleFill /> : <RiMoneyDollarCircleLine />}
                <span className={window.location.pathname === '/payment' ? 'btm-nav-label font-medium ' : 'btm-nav-label'}>Payment</span>
            </button>

            <button className={`sm:btm-nav-md btm-nav-xs ${window.location.pathname === '/leaderboard' ? 'active text-primary ' : ''}`} onClick={() => handleNavigate('/leaderboard')}>
                {window.location.pathname === '/leaderboard' ? <IoTrophy /> : <IoTrophyOutline />}
                <span className={window.location.pathname === '/leaderboard' ? 'btm-nav-label font-medium' : 'btm-nav-label'}>Leaderboard</span>
            </button>

            <button className={`sm:btm-nav-md btm-nav-xs ${window.location.pathname === '/setting' ? 'active text-primary ' : ''}`} onClick={() => handleNavigate('/setting')}>
                {window.location.pathname === '/setting' ? <RiAccountCircleFill /> : <RiAccountCircleLine />}
                <span className={window.location.pathname === '/setting' ? 'btm-nav-label font-medium ' : 'btm-nav-label'}>Account</span>
            </button>
        </div >
    );
}