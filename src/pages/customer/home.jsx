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
import Navbar from '../../components/navbar.jsx';
import aha from '../../assets/aha.png'; // Import the image file
import Who from '../../assets/who.png'; // Import the image file
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { useState, useEffect } from 'react';
import { FaRegAddressCard } from "react-icons/fa6";
import useAxiosPrivate from '../../hooks/useAxiosPrivate.jsx';
import Header from '../../components/header';

export default function Home() {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    const handleSearch = async (searchQuery) => {
        try {
            const response = await axiosPrivate.get('/search', {
                params: {
                    query: searchQuery,
                    // Add any other query parameters as needed
                },
            });
            console.log(response.data);
            setSearchResults(response.data);
            if (searchQuery == "") {
                setSearchQuery()
            }
        } catch (error) {
            console.error('Error searching courts:', error);
        }
    };


    const handleChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
        handleSearch(searchQuery);
    };

    const login = async (data) => {
        const dataToSend = { username: data.username, password: data.password };
        try {
            const response = await fetch(`http://localhost:2000/login`, {
                method: 'Post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            });
            const data = await response.json();

            navigate('/home');

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const navigate = useNavigate();

    const handleBook = () => {
        navigate('/list-gedung');
    };

    // const detailPage = (product) => {
    //     console.log('product', product)
    // };


    const detailPage = (productName) => {
        navigate(`/lapangan/${productName}`);

    };



    return (
        <>

            <div className="mb-10">

                <div className='grid justify-items-center mt-5'>
                    <div className="dropdown">
                        {/* <div className='grid justify-items-center m-5'> */}
                        <input
                            type="text"
                            placeholder="Cari tempat olahraga"
                            className="input input-bordered w-80 font-mono"
                            onChange={handleChange}
                            value={searchQuery}
                        />
                        {/* </div> */}
                        {/* <div tabIndex={0} role="button" className="btn m-1">Click</div> */}
                        <ul className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-80">
                            {searchResults.map(item => (
                                <p key={item.id}>{item.name}</p>
                            ))}
                            {/* <li><a>Badminton - Lapangan 1</a></li>
                            <li><a>Badminton - Lapangan 1</a></li>
                            <li><a>Badminton - Lapangan 1</a></li>
                            <li><a>Badminton - Lapangan 1</a></li> */}
                        </ul>
                    </div>
                </div>


                <div className="grid grid-cols-3 m-5">
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-neutral" onClick={() => detailPage('badminton')}>
                            <GiShuttlecock />

                        </button>
                        <p className='font-mono'>Badminton</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-neutral" onClick={() => detailPage('futsal')}>
                            <GiSoccerKick />


                        </button>
                        <p className='font-mono'>Futsal</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-neutral" onClick={() => detailPage('basket')}>
                            <TbPlayBasketball />


                        </button>
                        <p>Basket</p>
                    </div>

                </div>

                <div className="grid grid-cols-3 m-5">

                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle  btn-neutral" onClick={() => detailPage('gym')}>
                            <CgGym />

                        </button>
                        <p className='font-mono'>Gym</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle  btn-neutral" onClick={() => detailPage('swim')}>
                            <FaSwimmer />


                        </button>
                        <p className='font-mono'>Renang</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle  btn-neutral" onClick={() => detailPage('martial-art')}>
                            <FaRegAddressCard />


                        </button>
                        <p className='font-mono'>Membership</p>
                    </div>
                </div>

                <div className="mx-10 mt-5">

                    <Header title={'Selesaikan Tantanganmu Sekarang'} />

                </div>
                <div className="grid grid-rows-3 grid-flow-col gap-4 justify-items-center mt-3">
                    <div className="card w-80 h-96 bg-neutral shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title mt-3">Tantangan Mingguan</h2>
                            <div className="grid grid-cols-4">
                                <div className='col-span-1 justify-self-center'>
                                    <p>0/2</p>
                                </div>
                                <div className=''>
                                    <progress className="progress progress-success w-48 " value="0" max="100"></progress>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className='col-span-2'>
                                    <p className='text-sm text-neutral-content'>Berolahraga selama 2 jam dalam seminggu dapat membantu anda hidup lebih lama, tidur lebih baik, dan meningkatkan mood anda</p>
                                </div>
                                <div className='self-center col-span-2'>
                                    <img src={aha} alt="who image logo" />

                                </div>
                            </div>
                            <button className="btn btn-primary text-neutral-content">Claim Reward</button>
                        </div>
                    </div>
                    <div className="card w-80 h-96 bg-neutral shadow-xl mt-2">
                        <div className="card-body">
                            <h2 className="card-title mt-3">Tantangan Bulanan</h2>
                            <div className="grid grid-cols-4">
                                <div className='col-span-1 justify-self-center'>
                                    <p>0/10</p>
                                </div>
                                <div className=''>
                                    <progress className="progress progress-success w-48 " value="0" max="100"></progress>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className='col-span-2'>
                                    <p className='text-sm text-neutral-content'>Berolahraga selama 10 jam dalam sebulan dapat membantu anda hidup lebih lama, tidur lebih baik, dan meningkatkan mood anda</p>
                                </div>
                                <div className='self-center col-span-2'>
                                    <img src={Who} alt="who image logo" className='w-28' />

                                </div>
                            </div>
                            <button className="btn btn-primary text-neutral-content">Claim Reward</button>
                        </div>
                    </div>
                    <div className="card w-80 h-60 bg-neutral shadow-xl mt-2">
                        <div className="card-body">
                            <h2 className="card-title mt-3 text-neutral-content">Tantangan 6 Bulan</h2>
                            <div className="grid grid-cols-4">
                                <div className='col-span-1 justify-self-center'>
                                    <p>0/50</p>
                                </div>
                                <div className=''>
                                    <progress className="progress progress-success w-48 " value="0" max="100"></progress>
                                </div>
                            </div>
                            <div className="grid">
                                <div className=''>
                                    <p className='text-sm text-neutral-content'>Selesaikan berolahraga selama 50 jam dan dapatkan hadiah </p>
                                </div>
                            </div>
                            <button className="btn btn-primary text-neutral-content">Claim Reward</button>
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




            </div >

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
            {/* <div className="btm-nav">
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
            </div> */}
            <Navbar />
        </>
    );
}