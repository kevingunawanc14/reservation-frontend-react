import { useNavigate } from 'react-router-dom';
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { LiaHeartbeatSolid } from "react-icons/lia";
import { IoTrophyOutline } from "react-icons/io5";
export default function ListGor() {

    const navigate = useNavigate();

    const handleDetailGedung = () => {
        navigate('/detail-gedung');
    };

    return (
        <>
            <h1 className="m-4 text-2xl font-bold text-black">List Gor</h1>
            <div className="card lg:card-side bg-base-100 shadow-xl m-4 ">
                <figure><img src="https://images.unsplash.com/photo-1518409274682-1cb2fe2955a8?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Album" className="lg:w-72" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Gor 1</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-150 text-white" onClick={handleDetailGedung}>Detail</button>
                    </div>
                </div>
            </div>
            <div className="card lg:card-side bg-base-100 shadow-xl m-4">
                <figure><img src="https://images.unsplash.com/photo-1518409274682-1cb2fe2955a8?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Album" className="lg:w-72" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Gor 2</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-150 text-white">Detail</button>
                    </div>
                </div>
            </div>
            <div className="card lg:card-side bg-base-100 shadow-xl m-4">
                <figure><img src="https://images.unsplash.com/photo-1518409274682-1cb2fe2955a8?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Album" className="lg:w-72" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Gym</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-150 text-white">Detail</button>
                    </div>
                </div>
            </div>
            <div className="card lg:card-side bg-base-100 shadow-xl m-4 mb-20">
                <figure><img src="https://images.unsplash.com/photo-1518409274682-1cb2fe2955a8?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Album" className="lg:w-72" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Kolam Renang</h2>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-150 text-white">Detail</button>
                    </div>
                </div>
            </div>

            <div className="btm-nav">
                {/* <button>
                    <IoCompassOutline />

                    <span className="btm-nav-label">Home</span>
                </button> */}
                <button className="active">
                    <LiaHeartbeatSolid />

                    <span className="btm-nav-label">Journal</span>
                </button>
                <button>
                    <RiMoneyDollarCircleLine />

                    <span className="btm-nav-label">Payment</span>
                </button>
                <button>
                    <IoTrophyOutline />

                    <span className="btm-nav-label">Leaderboard</span>
                </button>
                <button>
                    <RiAccountCircleLine />

                    <span className="btm-nav-label">Account</span>
                </button>
            </div>

        </>
    );
}