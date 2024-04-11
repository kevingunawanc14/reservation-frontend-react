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
import Alert from '@mui/material/Alert';
import { FaHandHoldingHeart } from "react-icons/fa";
import { IoShieldOutline } from "react-icons/io5";
import { LuSword } from "react-icons/lu";
import { GiRank2 } from "react-icons/gi";
import { FaSkull } from "react-icons/fa";


export default function Home() {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [challenges, setChallenges] = useState([]);
    const navigate = useNavigate();
    const [valueTantanganMingguan, setValueTantanganMingguan] = useState(0);
    const [valueTantanganBulanan, setValueTantanganBulanan] = useState(0);
    const [valueTantangan6Bulanan, setValueTantangan6Bulanan] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);
    const username = localStorage.getItem('username');

    const [userData, setUserData] = useState(null);


    const handleDetailLapangan = (id, courtName) => {
        let parts = courtName.split(" ");
        let lastPart = parts.pop();
        lastPart = parts.pop();
        let lowercaseLastPart = lastPart.toLowerCase();
        courtName = lowercaseLastPart
        const path = `/product/lapangan/${courtName}/${id}`;
        localStorage.setItem('detailPath', `/`);
        navigate(path);
    };

    const getDataDetailUser = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:2000/user/detail/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            const responseData = response.data; // Assuming the response contains the user details

            console.log(responseData)

            // Update the state with the fetched data
            setUserData({
                username: responseData.username,
                rank: responseData.rank,
                xp: responseData.experiencePoint,
                hp: responseData.healthPoint,
                coin: responseData.krakatauCoin,
                statusDailyReward: responseData.statusDailyReward
            });

            console.log('response', response)
        } catch (error) {
            console.error('Error fetching data:', error);
            // navigate('/login', { state: { from: location }, replace: true });

        }
    };

    const handleClaimReward = async () => {
        const dataToSend = {
            username: username,
            valueReward: Math.floor(Math.random() * 4),
            tipe: Math.floor(Math.random() * 4) + 1
        };


        try {
            // console.log('dataToSend', dataToSend);
            // const token = localStorage.getItem('token');

            // const response = await axios.post(`http://localhost:2000/claim-reward/${username}`, dataToSend, {
            //     headers: {
            //         Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
            //     }
            // });

            document.getElementById('rewardModal').showModal();
            setUserData(prevState => ({
                ...prevState,
                statusDailyReward: true
            }));


        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDetailFasilitas = (id, courtName) => {
        if (id >= 37 && id <= 40) {
            courtName = 'renang'
        } else {
            courtName = 'gym'

        }
        const path = `/product/fasilitas/${courtName.toLowerCase()}/${id}`;
        localStorage.setItem('detailPath', `/`);
        navigate(path);
    };

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

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Redirect if token is null or undefined on initial render
        if (!token) {
            navigate('/login'); // Replace '/login' with your actual login path
        }

        getDataChallange()
        getDataDetailUser();

    }, [])



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
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-80">
                                {searchResults.length === 0 ? (
                                    <li className='hover:bg-neutral p-2 hover:text-neutral-content rounded-lg '>
                                        Product not found...
                                    </li>
                                ) : (
                                    searchResults.map(item => (
                                        item.gor === 0 ? (
                                            <li
                                                key={item.id}
                                                className='hover:bg-neutral p-2 hover:text-neutral-content rounded-lg cursor-pointer'
                                                onClick={() => handleDetailFasilitas(item.id, item.name)}
                                            >
                                                {item.name} - {item.price}
                                            </li>
                                        ) : (
                                            <li
                                                key={item.id}
                                                className='hover:bg-neutral p-2 hover:text-neutral-content rounded-lg cursor-pointer'
                                                onClick={() => handleDetailLapangan(item.id, item.name)}

                                            >
                                                {item.name} - Gor {item.gor} - {item.price}
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

                {userData && (
                    <>
                        {userData.statusDailyReward ? (
                            <div
                                style={{ position: 'fixed', bottom: 100, right: 20 }}
                                className="tooltip tooltip-left tooltip-primary"
                                data-tip="Please wait until tomorrow">
                                <button className="btn  mt-3 hover:animate-bounce btn-disabled" disabled>
                                    <GoGift fontSize="20px" />
                                </button>
                            </div>

                        ) : (
                            <div
                                style={{ position: 'fixed', bottom: 100, right: 20 }}
                                className="tooltip tooltip-left tooltip-primary"
                                data-tip="Claim Daily Reward"
                                onClick={() => handleClaimReward()}
                            >
                                <button className="btn btn-primary mt-3 hover:animate-bounce">
                                    <GoGift fontSize="20px" />
                                </button>
                            </div>
                        )}
                    </>
                )}

                <dialog id="rewardModal" className="modal">
                    <div className="modal-box bg-primary">
                        <div className='grid grid-cols-2'>
                            <div>
                                <FaSkull fontSize={''} className='w-full h-20  text-neutral-content' />
                                {/* <FaSkull /> */}

                            </div>
                            <div>
                                <p className='text-lg font-bold mt-2 ms-[-10px] text-neutral-content'>Reward Points</p>
                                <p className='font-semibold ms-[-10px]  text-neutral-content'>You get 0 points</p>
                            </div>

                        </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>




            </div >

            <Navbar />
        </>
    );
}