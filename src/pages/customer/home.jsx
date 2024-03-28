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
import useAxiosPrivate from '../../hooks/useAxiosPrivate.jsx';
import Header from '../../components/header';
import axios from 'axios';
import AuthContext from "../../context/AuthProvider";

export default function Home() {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [challenges, setChallenges] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const [valueTantanganMingguan, setValueTantanganMingguan] = useState(0);
    const [valueTantanganBulanan, setValueTantanganBulanan] = useState(0);
    const [valueTantangan6Bulanan, setValueTantangan6Bulanan] = useState(0);




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
        navigate(`/lapangan/${productName}`);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Redirect if token is null or undefined on initial render
        if (!token) {
            navigate('/login'); // Replace '/login' with your actual login path
        }

        getDataChallange()



    }, [])


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
                                    <progress className="progress progress-success w-48 bg-neutral-content" value={null} max="100"></progress>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className='col-span-2'>
                                    {challenges.filter(challenge => challenge.id === 1).map((challenge) => (
                                        <p key={challenge.id} className='text-sm text-neutral-content'>
                                            {challenge.description}
                                        </p>
                                    ))}
                                </div>
                                <div className='self-center col-span-2'>
                                    <img src={aha} alt="who image logo" />

                                </div>
                            </div>
                            <button className={`btn btn-primary mt-5 ${valueTantanganMingguan < 2 ? 'btn-error' : 'btn-success'}`}>Claim Reward</button>
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
                            <button className={`btn btn-primary mt-5 ${valueTantanganBulanan < 2 ? 'btn-error' : 'btn-success'}`}>Claim Reward</button>
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
                            <button className={`btn btn-primary mt-1 `}>Claim Reward</button>
                        </div>
                    </div>
                </div>
            </div >

            <Navbar />
        </>
    );
}