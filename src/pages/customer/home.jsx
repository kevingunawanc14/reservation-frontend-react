import { useNavigate } from 'react-router-dom';
import { IoCompassOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { LiaHeartbeatSolid } from "react-icons/lia";
import { IoTrophyOutline } from "react-icons/io5";
import { GiBasketballBasket } from "react-icons/gi";
import { GiShuttlecock } from "react-icons/gi";
import { PiSoccerBallFill } from "react-icons/pi";
import { TbPlayBasketball } from "react-icons/tb";
import { GiSoccerKick } from "react-icons/gi";
import { FaSwimmer } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { MdOutlineSportsMartialArts } from "react-icons/md";

export default function Home() {

    const navigate = useNavigate();

    const handleBook = () => {
        navigate('/list-gedung');
    };

    return (
        <>

            <div className="">
                <div className='grid justify-items-center m-5'>
                    <input type="text" placeholder="Cari Tempat Olahraga" className="input input-bordered w-full max-w-xs" />
                </div>

                <div className="grid grid-cols-3 m-5">
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-outline btn-success">
                            <GiShuttlecock />

                        </button>
                        <p>Badminton</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-outline btn-success">
                            <GiSoccerKick />


                        </button>
                        <p>Futsal</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-outline btn-success">
                            <TbPlayBasketball />


                        </button>
                        <p>Basket</p>
                    </div>

                </div>

                <div className="grid grid-cols-3 m-5">

                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-outline btn-success">
                            <CgGym />

                        </button>
                        <p>Gym</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-outline btn-success">
                            <FaSwimmer />


                        </button>
                        <p>Swim</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-outline btn-success">
                            <MdOutlineSportsMartialArts />


                        </button>
                        <p>Martial Art</p>
                    </div>
                </div>

                <p className='text-start text-2xl mx-5 mt-5'>Selesaikan Tantanganmu Sekarang</p>

                <div className="grid grid-rows-3 grid-flow-col gap-4 justify-items-center">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Tantangan Mingguan</h2>
                            <div className="grid grid-cols-4">
                                {/* <div className='col-span-2 '>
                                    <progress className="progress progress-success w-56 " value="40" max="100"></progress>

                                </div>
                                <div className='justify-self-center'>
                                    <p>0/2 jam</p>

                                </div> */}
                                <div className='col-span-1 justify-self-start'>
                                    <p>0/2 jam</p>
                                </div>
                                <div className=''>
                                    <progress className="progress progress-success w-56 " value="40" max="100"></progress>

                                </div>
                            </div>
                            <div className="grid grid-cols-3">
                                <div className='col-span-2'>

                                    <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus repellat reiciendis impedit, quis error ratione blanditiis eius labore cupiditate similique, excepturi rem consequuntur sit explicabo obcaecati molestias corrupti assumenda! Iusto.</p>
                                </div>
                                <div className='self-center'>
                                    <img src="" alt="who image logo" />

                                </div>
                            </div>

                            <button className="btn btn-success text-white btn-disabled">Claim Reward</button>



                        </div>
                    </div>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Tantangan Mingguan</h2>
                            <div className="grid grid-cols-4">
                                {/* <div className='col-span-2 '>
                                    <progress className="progress progress-success w-56 " value="40" max="100"></progress>

                                </div>
                                <div className='justify-self-center'>
                                    <p>0/2 jam</p>

                                </div> */}
                                <div className='col-span-1 justify-self-start'>
                                    <p>0/2 jam</p>
                                </div>
                                <div className=''>
                                    <progress className="progress progress-success w-56 " value="40" max="100"></progress>

                                </div>
                            </div>
                            <div className="grid grid-cols-3">
                                <div className='col-span-2'>

                                    <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus repellat reiciendis impedit, quis error ratione blanditiis eius labore cupiditate similique, excepturi rem consequuntur sit explicabo obcaecati molestias corrupti assumenda! Iusto.</p>
                                </div>
                                <div className='self-center'>
                                    <img src="" alt="who image logo" />

                                </div>
                            </div>

                            <button className="btn btn-success">Claim Reward</button>



                        </div>
                    </div>
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Tantangan Mingguan</h2>
                            <div className="grid grid-cols-4">
                                {/* <div className='col-span-2 '>
                                    <progress className="progress progress-success w-56 " value="40" max="100"></progress>

                                </div>
                                <div className='justify-self-center'>
                                    <p>0/2 jam</p>

                                </div> */}
                                <div className='col-span-1 justify-self-start'>
                                    <p>0/2 jam</p>
                                </div>
                                <div className=''>
                                    <progress className="progress progress-success w-56 " value="40" max="100"></progress>

                                </div>
                            </div>
                            <div className="grid grid-cols-3">
                                <div className='col-span-2'>

                                    <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus repellat reiciendis impedit, quis error ratione blanditiis eius labore cupiditate similique, excepturi rem consequuntur sit explicabo obcaecati molestias corrupti assumenda! Iusto.</p>
                                </div>
                                <div className='self-center'>
                                    <img src="" alt="who image logo" />

                                </div>
                            </div>

                            <button className="btn btn-success">Claim Reward</button>



                        </div>
                    </div>
                </div>

                {/* <div className="card w-96 bg-white text-primary-content">
                    <div className=''>
                        <button className="btn btn-circle btn-outline btn-success">
                            <GiShuttlecock />

                        </button>
                        <p>Badminton</p>
                    </div>
                    <div className="card-body">
                        <p>weekly challange</p>
                        <h2 className="card-title">0 / 2 hour</h2>
                        <p>swimming 1 times  / play badminton 2 hour / play basketball 2 hour  / play futsal 2 hour  / gym 1 times</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-success text-white">Claim Reward</button>
                        </div>
                    </div>
                </div> */}
                {/* <div className="card w-96 bg-green-100 shadow-xl">
                    <progress className="progress w-56" value={0} max="100"></progress>

                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Tantangan Mingguan!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">Claim Reward</button>
                        </div>
                    </div>
                </div> */}
                {/* <p>Monthly Challange</p>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
                <p>6 Month Challange</p>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div> */}
                {/* <div className="grid grid-cols-2">
                    <div>
                        <ul className="steps steps-vertical lg:steps-horizontal">
                            <li className="step step-primary">Mulai Challange</li>
                            <li className="step step-primary">Selesaikan 1 jam pemesanan xyz</li>
                            <li className="step step-primary">Selesaikan 1 jam pemesanan xyz</li>
                            <li className="step">Get Reward</li>
                        </ul>
                    </div>
                    <div>
                        <ul className="steps steps-vertical lg:steps-horizontal">
                            <li className="step step-primary">Tantangan dimulai</li>
                            <li className="step step-primary">Selesaikan 5 jam pemesanan xyz</li>
                            <li className="step">Selesaikan 5 jam pemesanan xyz</li>
                            <li className="step">Receive Product</li>
                        </ul>
                    </div>
                </div> */}




            </div>

            {/* <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518409274682-1cb2fe2955a8?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
                <div className="hero-overlay bg-opacity-50"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-4xl font-bold text-white">Krakatau Sport Centre Jombang</h1>
                        <p className="mb-5">Reservation And Gamification App</p>
                        <button className="btn btn-primary" onClick={handleBook}>Book Now</button>
                    </div>
                </div>
            </div> */}
            <div className="btm-nav">
                <button>
                    <IoCompassOutline />

                    <span className="btm-nav-label">Home</span>
                </button>
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