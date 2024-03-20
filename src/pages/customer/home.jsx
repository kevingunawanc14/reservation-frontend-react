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

    const detailPage = (productName) => {
        navigate(`/lapangan/${productName}`);
    };

    return (
        <>
            <div className="mb-2">
                <div className='grid justify-items-center mt-5'>
                    <div className="dropdown">
                        <input
                            type="text"
                            placeholder="Cari tempat olahraga"
                            className="input input-bordered w-80 font-mono"
                            onChange={handleChange}
                            value={searchQuery}
                        />
                        <ul className="dropdown-content  menu p-2 shadow bg-base-100 rounded-box w-80">
                            {searchResults.map(item => (
                                <p key={item.id}>{item.name}</p>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="grid grid-cols-3 m-5">
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-neutral text-neutral-content" onClick={() => detailPage('badminton')}>
                            <GiShuttlecock />
                        </button>
                        <p className='font-mono'>Badminton</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-neutral text-neutral-content" onClick={() => detailPage('futsal')}>
                            <GiSoccerKick />
                        </button>
                        <p className='font-mono'>Futsal</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle btn-neutral text-neutral-content" onClick={() => detailPage('basket')}>
                            <TbPlayBasketball />


                        </button>
                        <p>Basket</p>
                    </div>

                </div>
                <div className="grid grid-cols-3 m-5">
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle  btn-neutral text-neutral-content" onClick={() => detailPage('gym')}>
                            <CgGym />
                        </button>
                        <p className='font-mono'>Gym</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle  btn-neutral text-neutral-content" onClick={() => detailPage('renang')}>
                            <FaSwimmer />


                        </button>
                        <p className='font-mono'>Renang</p>
                    </div>
                    <div className='grid justify-items-center'>
                        <button className="btn btn-circle  btn-neutral text-neutral-content" onClick={() => detailPage('membership')}>
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
                            <h2 className="card-title mt-3 text-neutral-content">Tantangan Mingguan</h2>
                            <div className="grid grid-cols-4">
                                <div className='col-span-1 justify-self-center'>
                                    <p className='text-neutral-content'>0/2</p>
                                </div>
                                <div className=''>
                                    <progress className="progress progress-success w-48 bg-neutral-content" value="10" max="100"></progress>
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
                            <button className="btn btn-primary mt-5">Claim Reward</button>
                        </div>
                    </div>
                    <div className="card w-80 h-96 bg-neutral shadow-xl mt-2">
                        <div className="card-body">
                            <h2 className="card-title mt-3 text-neutral-content">Tantangan Bulanan</h2>
                            <div className="grid grid-cols-4">
                                <div className='col-span-1 justify-self-center'>
                                    <p className='text-neutral-content'>0/10</p>
                                </div>
                                <div className=''>
                                    <progress className="progress progress-success w-48 bg-neutral-content" value="0" max="100"></progress>
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
                            <button className="btn btn-primary mt-5">Claim Reward</button>
                        </div>
                    </div>
                    <div className="card w-80 h-60 bg-neutral shadow-xl mt-2">
                        <div className="card-body">
                            <h2 className="card-title mt-3 text-neutral-content">Tantangan 6 Bulan</h2>
                            <div className="grid grid-cols-4">
                                <div className='col-span-1 justify-self-center'>
                                    <p className='text-neutral-content'>0/50</p>
                                </div>
                                <div className=''>
                                    <progress className="progress progress-success w-48 bg-neutral-content" value="0" max="100"></progress>
                                </div>
                            </div>
                            <div className="grid">
                                <div className=''>
                                    <p className='text-sm text-neutral-content'>Selesaikan berolahraga selama 50 jam dan dapatkan hadiah </p>
                                </div>
                            </div>
                            <button className="btn btn-primary  mt-1">Claim Reward</button>
                        </div>
                    </div>
                </div>
            </div >

            <Navbar />
        </>
    );
}