import { IoCompassOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { LiaHeartbeatSolid } from "react-icons/lia";
import { IoTrophyOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RxDashboard } from "react-icons/rx";
import { FaUsersCog } from "react-icons/fa";
import { TbPresentationAnalytics } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { PiWarehouse } from "react-icons/pi";
import { BiTask } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";

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
        <div className="btm-nav">
            <button className={window.location.pathname === '/dashboard' ? 'active' : ''} onClick={() => handleNavigate('/dashboard')}>
                <TbPresentationAnalytics />
                <span className="btm-nav-label">Dashboard</span>
            </button>

            <button className={window.location.pathname === '/report' ? 'active' : ''} onClick={() => handleNavigate('/report')}>
                <TbReportMoney />
                <span className="btm-nav-label">Report</span>
            </button>

            <button className={window.location.pathname === '/user' ? 'active' : ''} onClick={() => handleNavigate('/user')}>
                <FiUsers />
                <span className="btm-nav-label">User</span>
            </button>

            <button className={window.location.pathname === '/challange' ? 'active' : ''} onClick={() => handleNavigate('/challange')}>
                <BiTask />
                <span className="btm-nav-label">Challange</span>
            </button>

            <button className={window.location.pathname === '/court' ? 'active' : ''} onClick={() => handleNavigate('/court')}>
                <PiWarehouse />
                <span className="btm-nav-label">Court</span>
            </button>


        </div >
    );
}