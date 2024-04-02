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
import { useState, useEffect, useContext } from 'react';
import { FaRegAddressCard } from "react-icons/fa6";
import Header from '../../components/header';
import axios from 'axios';
import { GoGift } from "react-icons/go";
import { IoIosFootball } from "react-icons/io";
import { TfiBasketball } from "react-icons/tfi";
import { FaSwimmingPool } from "react-icons/fa";
import { IoFootball } from "react-icons/io5";
// import { PiSoccerBallFill } from "react-icons/pi";
import { BiFootball } from "react-icons/bi";


export default function Home() {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [challenges, setChallenges] = useState([]);
    const navigate = useNavigate();
    const [valueTantanganMingguan, setValueTantanganMingguan] = useState(0);
    const [valueTantanganBulanan, setValueTantanganBulanan] = useState(0);
    const [valueTantangan6Bulanan, setValueTantangan6Bulanan] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    const [showTooltip, setShowTooltip] = useState(false);





    const getData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:2000/user', {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            console.log('responsex', response);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getDataChallange = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:2000/challenge', {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            setChallenges(response.data); // Assuming your response contains challenge data


        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token'); // Hapus token dari local storage
            navigate('/login');
        }
    }



    const detailPage = (productName) => {
        navigate(`/product/${productName}`);
    };

    const handleSearch = async (value) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:2000/search?q=${value}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            setSearchResults(response.data);

        } catch (error) {
            console.error('Error searching courts:', error);
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
        handleSearch(value);
    };

    function calculateTimeRemaining() {
        const now = new Date();
        const target = new Date();
        target.setHours(7, 0, 0, 0); // Set target time to 7:00:00 AM

        if (now > target) {
            // If current time is after 7 am, set target to next day 7 am
            target.setDate(target.getDate() + 1);
        }

        const timeDiff = target.getTime() - now.getTime();
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        return { hours, minutes, seconds };
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Redirect if token is null or undefined on initial render
        if (!token) {
            navigate('/login'); // Replace '/login' with your actual login path
        }

        getDataChallange()


    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(timer);
    }, []);


    return (
        <>
            <div className="mb-2">
                <div className='grid justify-items-center mt-5'>
                    <div className="dropdown">
                        <input
                            type="text"
                            placeholder="Cari tempat olahraga"
                            className="input input-bordered w-80 font-mono "
                            onChange={handleChange}
                            value={searchQuery}
                        />
                        {searchQuery != '' && (
                            <ul className="dropdown-content menu shadow bg-base-100 rounded-box w-80 z-40">
                                {searchResults.length === 0 ? (
                                    <li className='hover:bg-neutral p-2 hover:text-neutral-content rounded-lg '>
                                        Product not found...
                                    </li>
                                ) : (
                                    searchResults.map(item => (
                                        item.gor === 0 ? (
                                            <li key={item.id} className='hover:bg-neutral p-2 hover:text-neutral-content rounded-lg cursor-default	'>
                                                {item.name}
                                            </li>
                                        ) : (
                                            <li key={item.id} className='hover:bg-neutral p-2 hover:text-neutral-content rounded-lg cursor-default	'>
                                                {item.name} - Gor {item.gor} - {item.price} / Jam
                                            </li>
                                        )
                                    ))
                                )}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-3 m-5">
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-neutral text-neutral-content" onClick={() => detailPage('badminton')}>
                            <GiShuttlecock fontSize="17px" />
                        </button>
                        <p className='font-mono'>Badminton</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-neutral text-neutral-content" onClick={() => detailPage('futsal')}>
                            <BiFootball fontSize="20px" />
                        </button>
                        <p className='font-mono'>Futsal</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-neutral text-neutral-content" onClick={() => detailPage('basket')}>
                            <TfiBasketball fontSize="20px" />


                        </button>
                        <p>Basket</p>
                    </div>

                </div>
                <div className="grid grid-cols-3 m-5">
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle  btn-neutral text-neutral-content" onClick={() => detailPage('gym')}>
                            <CgGym fontSize="20px" />
                        </button>
                        <p className='font-mono'>Gym</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle  btn-neutral text-neutral-content" onClick={() => detailPage('renang')}>
                            <FaSwimmingPool fontSize="20px" />


                        </button>
                        <p className='font-mono'>Renang</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle  btn-neutral text-neutral-content" onClick={() => detailPage('membership')}>
                            <FaRegAddressCard fontSize="20px" />


                        </button>
                        <p className='font-mono'>Membership</p>
                    </div>
                </div>
                <div className="mx-10 mt-5">
                    <Header title={'Selesaikan Tantanganmu Sekarang'} />
                </div>
                <div className=''>

                </div>

                <div className='grid grid-rows-3 gap-4 mb-20'>
                    <div className="card lg:card-side bg-neutral shadow-xl m-4">
                        <div className="card-body">
                            <h2 className="card-title text-neutral-content">Tantangan Mingguan</h2>
                            <div className="grid grid-cols-12">
                                <div className='sm:col-span-1 col-span-2 justify-self-center'>
                                    <p className='text-neutral-content'>0/2</p>
                                </div>
                                <div className='sm:col-span-11 col-span-9'>
                                    <progress className="progress progress-success w-full bg-neutral-content" value={null} max="100"></progress>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className='sm:col-span-2 col-span-4'>
                                    {challenges.filter(challenge => challenge.id === 1).map((challenge) => (
                                        <p key={challenge.id} className='text-sm text-neutral-content'>
                                            {challenge.description}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="">
                                <div className='grid grid-cols-2'>
                                    <div className='self-center '>
                                        <img src={aha} alt="" className='w-20 h-11 bg-neutral-content rounded border-1' />
                                    </div>
                                    <div className='justify-self-end'>
                                        <button className={`btn btn-primary mt-5 ${valueTantanganMingguan < 2 ? 'btn-error cursor-not-allowed' : 'btn-success'}`}>Claim Reward</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card lg:card-side bg-neutral shadow-xl m-4">
                        <div className="card-body">
                            <h2 className="card-title text-neutral-content">Tantangan Bulanan</h2>
                            <div className="grid grid-cols-12">
                                <div className='sm:col-span-1 col-span-2 justify-self-center'>
                                    <p className='text-neutral-content'>0/10</p>
                                </div>
                                <div className='sm:col-span-11 col-span-9'>
                                    <progress className="progress progress-success w-full bg-neutral-content" value={null} max="100"></progress>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className='sm:col-span-2 col-span-4'>
                                    {challenges.filter(challenge => challenge.id === 2).map((challenge) => (
                                        <p key={challenge.id} className='text-sm text-neutral-content'>
                                            {challenge.description}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="">
                                <div className='grid grid-cols-2'>
                                    <div className='self-center '>
                                        <img src={Who} alt="" className='w-20 h-11 bg-neutral-content rounded border-1 p-1' />
                                    </div>
                                    <div className='justify-self-end'>
                                        <button className={`btn btn-primary mt-5 ${valueTantanganMingguan < 2 ? 'btn-error cursor-not-allowed' : 'btn-success'}`}>Claim Reward</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card lg:card-side bg-neutral shadow-xl m-4">
                        <div className="card-body">
                            <h2 className="card-title text-neutral-content">Tantangan 6 Bulan</h2>
                            <div className="grid grid-cols-12">
                                <div className='sm:col-span-1 col-span-2 justify-self-center'>
                                    <p className='text-neutral-content'>0/50</p>
                                </div>
                                <div className='sm:col-span-11 col-span-9'>
                                    <progress className="progress progress-success w-full bg-neutral-content" value={null} max="100"></progress>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className='sm:col-span-2 col-span-4'>
                                    {challenges.filter(challenge => challenge.id === 3).map((challenge) => (
                                        <p key={challenge.id} className='text-sm text-neutral-content'>
                                            {challenge.description}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <div className="">
                                <div className='grid grid-cols-1'>
                                    <div className='justify-self-end'>
                                        <button className={`btn btn-primary mt-5 ${valueTantanganMingguan < 2 ? 'btn-error cursor-not-allowed' : 'btn-success'}`}>Claim Reward</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className="grid grid-rows-3 grid-flow-col gap-4 justify-items-center mt-3">

                    <div className="card w-80 h-96 bg-neutral shadow-xl mt-2">
                        <div className="card-body">
                            <h2 className="card-title mt-3 text-neutral-content">Tantangan Bulanan</h2>
                            <div className="grid grid-cols-4">
                                <div className='col-span-1 justify-self-center'>
                                    <p className='text-neutral-content'>0/10</p>
                                </div>
                                <div className=''>
                                    <progress className="progress progress-success w-48 bg-neutral-content" value={null} max="100"></progress>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className='col-span-2'>
                                    {challenges.filter(challenge => challenge.id === 2).map((challenge) => (
                                        <p key={challenge.id} className='text-sm text-neutral-content'>
                                            {challenge.description}
                                        </p>
                                    ))}
                                </div>
                                <div className='self-center col-span-2'>
                                    <img src={Who} alt="who image logo" className='w-28' />

                                </div>
                            </div>
                            <button className={`btn btn-primary mt-5 ${valueTantanganBulanan < 2 ? 'btn-error cursor-not-allowed' : 'btn-success'}`}>Claim Reward</button>
                        </div>
                    </div>
                    <div>
                        <div className="card w-80 h-60 bg-neutral shadow-xl mt-2">
                            <div className="card-body">
                                <h2 className="card-title mt-3 text-neutral-content">Tantangan 6 Bulan</h2>
                                <div className="grid grid-cols-4">
                                    <div className='col-span-1 justify-self-center'>
                                        <p className='text-neutral-content'>0/50</p>
                                    </div>
                                    <div className=''>
                                        <progress className="progress progress-success w-48 bg-neutral-content" value={null} max="100"></progress>
                                    </div>
                                </div>
                                <div className="grid">
                                    <div className=''>
                                        {challenges.filter(challenge => challenge.id === 3).map((challenge) => (
                                            <p key={challenge.id} className='text-sm text-neutral-content'>
                                                {challenge.description}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                                <button className={`btn btn-primary mt-1 ${valueTantangan6Bulanan < 2 ? 'btn-error cursor-not-allowed' : 'btn-success'} `}>Claim Reward</button>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div>
                    <div style={{ position: 'fixed', bottom: 100, right: 20 }} className="tooltip tooltip-left tooltip-primary" data-tip="Claim Daily Reward">
                        <button className="btn btn-primary mt-3 hover:animate-bounce ">
                            {/* {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`} */}
                            <GoGift fontSize="20px" />
                        </button>
                    </div>
                </div>




            </div >

            <Navbar />
        </>
    );
}