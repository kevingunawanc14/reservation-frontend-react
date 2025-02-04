import { useNavigate } from 'react-router-dom';
import { GiShuttlecock } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import { GoGift } from "react-icons/go";
import { TfiBasketball } from "react-icons/tfi";
import { FaSwimmingPool } from "react-icons/fa";
import { BiFootball } from "react-icons/bi";
import { FaRegAddressCard } from "react-icons/fa6";
import { FaSkull } from "react-icons/fa";
import { RiHeartAddFill } from "react-icons/ri";
import { GiSecretBook } from "react-icons/gi";
import { LuSwords } from "react-icons/lu";
import { TbShieldPlus } from "react-icons/tb";

import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import Navbar from '../../components/navbar.jsx';
import Header from '../../components/header';
import aha from '../../assets/aha.png';
import Who from '../../assets/who.png';




export default function Home() {

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);


    const [userData, setUserData] = useState(null);
    const [challenges, setChallenges] = useState(null);
    const [progressiveChallangeUser, setProgressiveChallangeUser] = useState(null);

    const [statusClaimReward, setStatusClaimReward] = useState({ point: 0, type: '' });

    const [loadingStatusDaily, setLoadingStatusDaily] = useState(null);
    const [loadingStatusWeekly, setLoadingStatusWeekly] = useState(null);
    const [loadingStatusMontlhy, setLoadingStatusMontlhy] = useState(null);
    const [loadingStatus6Month, setLoadingStatus6Month] = useState(null);


    const handleDetailLapangan = (id, courtName) => {
        let parts = courtName.split(" ");
        let lastPart = parts.pop();
        lastPart = parts.pop();
        let lowercaseLastPart = lastPart.toLowerCase();
        courtName = lowercaseLastPart
        const path = `/product/lapangan/${courtName}/${id}`;
        navigate(path);
    };

    const getDataDetailUser = async () => {
        try {

            const response = await axios.get(`/user/detail/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const responseData = response.data;

            // console.log('responseData detail user', responseData)

            setUserData({
                username: responseData.username,
                rank: responseData.rank,
                xp: responseData.experiencePoint,
                hp: responseData.healthPoint,
                coin: responseData.krakatauCoin,
                statusDailyReward: responseData.statusDailyReward,
                statusWeeklyChallange: responseData.statusWeeklyChallange,
                statusMonthlyChallange: responseData.statusMonthlyChallange,
                status6MonthChallange: responseData.status6MonthChallange,
                activeTheme: responseData.activeTheme
            });


            document.querySelector('html').setAttribute('data-theme', responseData.activeTheme.toLocaleLowerCase());

        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');

        }
    };

    const handleClaimReward = async (type) => {
        const dataToSend = {
            username: username,
            valueReward: type === 'daily'
                ? Math.floor(Math.random() * 3) + 1
                : type === 'weekly'
                    ? 10
                    : type === 'monthly'
                        ? 100
                        : type === '6month'
                            ? 1000
                            : 0,
            type: type === 'daily' ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 4) + 1
        };

        try {

            if (type === 'daily') {
                setLoadingStatusDaily(true)

            } else if (type === 'weekly') {
                setLoadingStatusWeekly(true)

            } else if (type === 'monthly') {
                setLoadingStatusMontlhy(true)

            } else if (type === '6month') {
                setLoadingStatus6Month(true)

            }

            const response = await axios.post(`/claim-reward/${username}`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            if (type === 'daily') {
                setLoadingStatusDaily(false)
            } else if (type === 'weekly') {
                setLoadingStatusWeekly(false)

            } else if (type === 'monthly') {
                setLoadingStatusMontlhy(false)

            } else if (type === '6month') {
                setLoadingStatus6Month(false)

            }


            setStatusClaimReward(
                {
                    point: response.data.valueReward,
                    type: response.data.type
                }
            );

            document.getElementById('rewardModal').showModal();
            setUserData(prevState => {
                let updatedStatus = { ...prevState };

                switch (type) {
                    case 'daily':
                        updatedStatus.statusDailyReward = true;
                        break;
                    case 'weekly':
                        updatedStatus.statusWeeklyChallange = true;
                        break;
                    case 'monthly':
                        updatedStatus.statusMonthlyChallange = true;
                        break;
                    case '6month':
                        updatedStatus.status6MonthChallange = true;
                        break;
                    default:
                }

                return updatedStatus;
            });


        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }

    const handleDetailFasilitas = (id, courtName) => {
        if (id >= 37 && id <= 40) {
            courtName = 'renang'
        } else {
            courtName = 'gym'

        }
        const path = `/product/fasilitas/${courtName.toLowerCase()}/${id}`;
        navigate(path);
    };

    const getDataChallange = async () => {
        try {
            const response = await axios.get('/challenge', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setChallenges(response.data);

        } catch (error) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    }

    const getProgressChallangeUser = async () => {
        try {

            const response = await axios.get(`/progressive-challange/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setProgressiveChallangeUser({
                hourWeekly: response.data.hourWeekly,
                hourMonthly: response.data.hourMonthly,
                hour6Month: response.data.hour6Month
            });

        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');

        }
    };

    const detailPage = (productName) => {
        navigate(`/product/${productName}`);
    };

    const handleSearch = async (value) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/search?q=${value}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setSearchResults(response.data);

        } catch (error) {
            console.error('Error searching courts:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setSearchQuery(value);
        handleSearch(value);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
        }


        getDataChallange();
        getDataDetailUser();
        getProgressChallangeUser();

        // const pusher = new Pusher('5f32af0ccd95b9fc2649', {
        //     cluster: 'ap1',
        // });

        // console.log('pusher', pusher)

        // const channel = pusher.subscribe('admin-channel');
        // channel.bind('user-login', (data) => {
        //     alert(JSON.stringify(data));
        //     //     if (Notification.permission === 'granted') {
        //     //         new Notification('User Login', {
        //     //             body: data.message + username,
        //     //             icon: '/src/assets/notif_icon.png'
        //     //         });
        //     //     } else if (Notification.permission !== 'denied') {
        //     //         Notification.requestPermission().then(permission => {
        //     //             if (permission === 'granted') {
        //     //                 new Notification('User Login', {
        //     //                     body: data.message + username,
        //     //                     icon: '/src/assets/notif_icon.png'
        //     //                 });
        //     //             }
        //     //         });
        //     //     }
        // });

        // console.log('channel', channel)


        // return () => {
        //     channel.unbind_all();
        //     channel.unsubscribe();
        // };

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
                                {searchResults ? (
                                    searchResults.length === 0 ? (
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
                                    )
                                ) : (
                                    <li className='hover:bg-neutral p-2 hover:text-neutral-content rounded-lg skeleton'>
                                        Loading...
                                    </li>
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

                {userData && challenges && progressiveChallangeUser ? (
                    <>
                        <div className='grid grid-rows-3 gap-4 mb-20 text-accent-content'>
                            <div className="card lg:card-side bg-accent shadow-xl m-4">
                                <div className="card-body">
                                    <h2 className="card-title ">Tantangan Mingguan</h2>
                                    <div className="grid grid-cols-12">
                                        <div className='sm:col-span-1 col-span-2 justify-self-center'>
                                            <p className=' font-semibold'>
                                                {progressiveChallangeUser.hourWeekly >= 2 ? 2 : progressiveChallangeUser.hourWeekly}/2</p>
                                        </div>
                                        <div className='sm:col-span-11 col-span-9'>
                                            <progress
                                                className="progress progress-success w-full bg-neutral-content"
                                                value={progressiveChallangeUser.hourWeekly * 10}
                                                max="20"
                                            ></progress>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4">
                                        <div className='sm:col-span-2 col-span-4'>
                                            {challenges.filter(challenge => challenge.id === 1).map((challenge) => (
                                                <p key={challenge.id} className='font-semibold '>
                                                    {challenge.description}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className='grid grid-cols-2'>
                                            <div className='self-center '>
                                                <img
                                                    src={aha}
                                                    alt=""
                                                    className='w-20 h-11 bg-neutral-content rounded border-1 cursor-pointer animate-pulse'
                                                    onClick={() => document.getElementById('ahaModal').showModal()}
                                                />
                                            </div>
                                            <div className='justify-self-end'>
                                                {userData?.statusWeeklyChallange ? (
                                                    <button className={`btn btn-primary btn-disabled`}>Already Claimed</button>

                                                ) : (
                                                    <div className='cursor-pointer ' onClick={() => {
                                                        if (progressiveChallangeUser.hourWeekly < 2) {
                                                            document.getElementById('challangeInfo').showModal();
                                                        }
                                                    }}>
                                                        <button
                                                            className={`btn btn-primary  ${progressiveChallangeUser.hourWeekly < 2 ? 'btn-disabled ' : 'btn-primary'}  ${loadingStatusWeekly ? 'btn-disabled skeleton' : ''}`
                                                            }
                                                            onClick={() => handleClaimReward('weekly')}

                                                        >Claim Reward</button>
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card lg:card-side bg-accent shadow-xl m-4">
                                <div className="card-body">
                                    <h2 className="card-title ">Tantangan Bulanan</h2>
                                    <div className="grid grid-cols-12">
                                        <div className='sm:col-span-1 col-span-2 justify-self-center'>
                                            <p className=' font-semibold'> {progressiveChallangeUser.hourMonthly >= 10 ? 10 : progressiveChallangeUser.hourMonthly}/10</p>
                                        </div>
                                        <div className='sm:col-span-11 col-span-9'>
                                            <progress
                                                className="progress progress-success w-full bg-neutral-content"
                                                value={progressiveChallangeUser.hourMonthly * 10}
                                                max="100"></progress>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4">
                                        <div className='sm:col-span-2 col-span-4'>
                                            {challenges.filter(challenge => challenge.id === 2).map((challenge) => (
                                                <p key={challenge.id} className='text-base  font-semibold'>
                                                    {challenge.description}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className='grid grid-cols-2'>
                                            <div className='self-center '>
                                                <img
                                                    src={Who}
                                                    alt=""
                                                    className='w-20 h-11 bg-neutral-content rounded border-1 p-1 cursor-pointer animate-pulse'
                                                    onClick={() => document.getElementById('whoModal').showModal()}
                                                />
                                            </div>
                                            <div className='justify-self-end'>
                                                {userData?.statusMonthlyChallange ? (
                                                    <button className={`btn btn-primary btn-disabled`}>Already Claimed</button>

                                                ) : (
                                                    <div className='cursor-pointer '
                                                        onClick={() => {
                                                            if (progressiveChallangeUser.hourMonthly < 10) {
                                                                document.getElementById('challangeInfo').showModal();
                                                            }
                                                        }}>
                                                        <button
                                                            className={`btn btn-primary  ${progressiveChallangeUser.hourMonthly < 10 ? 'btn-disabled  ' : 'btn-primary'} ${loadingStatusMontlhy ? 'btn-disabled skeleton' : ''}`}
                                                            onClick={() => handleClaimReward('monthly')}
                                                        >Claim Reward</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card lg:card-side bg-accent shadow-xl m-4">
                                <div className="card-body">
                                    <h2 className="card-title ">Tantangan 6 Bulan</h2>
                                    <div className="grid grid-cols-12">
                                        <div className='sm:col-span-1 col-span-2 justify-self-center'>
                                            <p className=' font-semibold'> {progressiveChallangeUser.hour6Month >= 50 ? 50 : progressiveChallangeUser.hour6Month}/50</p>
                                        </div>
                                        <div className='sm:col-span-11 col-span-9'>
                                            <progress
                                                className="progress progress-success w-full bg-neutral-content"
                                                value={progressiveChallangeUser.hour6Month * 10}
                                                max="500">
                                            </progress>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4">
                                        <div className='sm:col-span-2 col-span-4'>
                                            {challenges.filter(challenge => challenge.id === 3).map((challenge) => (
                                                <p key={challenge.id} className='text-base  font-semibold'>
                                                    {challenge.description}
                                                </p>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="">
                                        <div className='grid grid-cols-1'>
                                            <div className='justify-self-end '
                                            >
                                                {userData?.status6MonthChallange ? (
                                                    <button className={`btn btn-primary btn-disabled`}>Already Claimed</button>

                                                ) : (
                                                    <div className='cursor-pointer ' onClick={() => {
                                                        if (progressiveChallangeUser.hour6Month < 50) {
                                                            document.getElementById('challangeInfo').showModal();
                                                        }
                                                    }}>
                                                        <button
                                                            className={`btn btn-primary  ${progressiveChallangeUser.hour6Month < 50 ? 'btn-disabled' : 'btn-primary'} ${loadingStatus6Month ? 'btn-disabled skeleton' : ''}`}
                                                            onClick={() => handleClaimReward('6month')}

                                                        >Claim Reward</button>
                                                    </div>

                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='grid grid-rows-3 gap-4 mb-20 text-accent-content'>
                        <div className="card lg:card-side bg-accent shadow-xl m-4 ">
                            <div className="card-body skeleton">
                                <h2 className="card-title ">Tantangan Mingguan</h2>
                                <div className="grid grid-cols-12 ">
                                    <div className='sm:col-span-1 col-span-2 justify-self-center'>
                                        <p className=' font-semibold  '>
                                        </p>
                                    </div>
                                    <div className='sm:col-span-11 col-span-9'>
                                        <progress
                                            className="progress progress-success w-full bg-neutral-content  "
                                            max="20"
                                        ></progress>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4">
                                    <div className='sm:col-span-2 col-span-4 '>

                                    </div>
                                </div>
                                <div className="">
                                    <div className='grid grid-cols-2'>
                                        <div className='self-center '>
                                            <img
                                                src={aha}
                                                alt=""
                                                className='w-20 h-11 bg-neutral-content rounded border-1 cursor-pointer animate-pulse '

                                            />
                                        </div>
                                        <div className='justify-self-end '>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card lg:card-side bg-accent shadow-xl m-4">
                            <div className="card-body skeleton">
                                <h2 className="card-title ">Tantangan Bulanan</h2>
                                <div className="grid grid-cols-12">
                                    <div className='sm:col-span-1 col-span-2 justify-self-center'>
                                        <p className=' font-semibold'> </p>
                                    </div>
                                    <div className='sm:col-span-11 col-span-9'>
                                        <progress
                                            className="progress progress-success w-full bg-neutral-content"
                                            max="100"></progress>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4">
                                    <div className='sm:col-span-2 col-span-4'>

                                    </div>
                                </div>
                                <div className="">
                                    <div className='grid grid-cols-2'>
                                        <div className='self-center '>
                                            <img
                                                src={Who}
                                                alt=""
                                                className='w-20 h-11 bg-neutral-content rounded border-1 p-1 cursor-pointer animate-pulse'
                                                onClick={() => document.getElementById('whoModal').showModal()}
                                            />
                                        </div>
                                        <div className='justify-self-end'>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card lg:card-side bg-accent shadow-xl m-4">
                            <div className="card-body skeleton">
                                <h2 className="card-title ">Tantangan 6 Bulan</h2>
                                <div className="grid grid-cols-12">
                                    <div className='sm:col-span-1 col-span-2 justify-self-center'>
                                        <p className=' font-semibold'></p>
                                    </div>
                                    <div className='sm:col-span-11 col-span-9'>
                                        <progress
                                            className="progress progress-success w-full bg-neutral-content"
                                            max="500">
                                        </progress>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4">
                                    <div className='sm:col-span-2 col-span-4'>
                                    </div>
                                </div>

                                <div className="">
                                    <div className='grid grid-cols-1'>
                                        <div className='justify-self-end '
                                        >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {userData && (
                    <>
                        {userData.statusDailyReward ? (
                            <div
                                style={{ position: 'fixed', bottom: 100, right: 20 }}
                                className="tooltip tooltip-left tooltip-primary cursor-pointer"
                                data-tip="Available again soon"
                                onClick={() => document.getElementById('rewardInfo').showModal()}
                            >
                                <button className="btn  mt-3 hover:animate-bounce btn-disabled skeleton" disabled>
                                    <GoGift fontSize="20px" />
                                </button>
                            </div>

                        ) : (
                            <div
                                style={{ position: 'fixed', bottom: 100, right: 20 }}
                                className="tooltip tooltip-left tooltip-primary cursor-pointer"
                                data-tip="Claim your reward"
                            >
                                <button
                                    className={`btn btn-primary mt-3 hover:animate-bounce  ${loadingStatusDaily ? 'btn-disabled skeleton' : ''}`}
                                    onClick={() => handleClaimReward('daily')}
                                >
                                    <GoGift fontSize="20px" />
                                </button>
                            </div>
                        )}
                    </>
                )}

            </div >

            <dialog id="challangeInfo" className="modal modal-bottom sm:modal-middle bg-ne">
                <div className="modal-box bg-neutral text-neutral-content">
                    <p className='text-xl font-semibold'>Challange Rewards</p>
                    <div className="grid grid-cols-2 gap-4 mt-3 ">
                        <p>Tantangan Mingguan: </p>
                        <p className='font-semibold  text-start'>+10 Random Point</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 ">
                        <p>Tantangan Bulanan: </p>
                        <p className='font-semibold  text-start'>+100 Random Point</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 ">
                        <p>Tantangan 6 Bulan: </p>
                        <div>
                            <p className='font-semibold  text-start'>+1000 Random Point </p>
                        </div>

                    </div>

                    <p className='mt-3'>Note: random point can be (Experience Point, Health Point, Attack Point, Shield Point)</p>


                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn ">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="rewardInfo" className="modal modal-bottom sm:modal-middle bg-ne">
                <div className="modal-box bg-neutral text-neutral-content">
                    <p className='text-xl font-semibold'>List of Reward You Can Get</p>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <GiSecretBook className='w-full h-20 text-neutral-content' />
                        <p className='font-semibold mt-3 text-start'>Experience Point</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <RiHeartAddFill className='w-full h-20 text-neutral-content' />
                        <p className='font-semibold mt-3'>Health Point</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <LuSwords className='w-full h-20 text-neutral-content' />

                        <p className='font-semibold mt-3'>Attack Point</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <TbShieldPlus className='w-full h-20 text-neutral-content' />

                        <p className='font-semibold mt-3'>Shield Point</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                        <FaSkull className='w-full h-20 text-neutral-content' />
                        <p className='font-semibold mt-3'>Zonk</p>
                    </div>


                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn ">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="rewardModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-secondary text-secondary-content">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 ">✕</button>
                    </form>
                    <div className='grid grid-cols-2'>
                        <div>
                            {statusClaimReward.type === 1 && <GiSecretBook className='w-full h-20' />}
                            {statusClaimReward.type === 2 && <RiHeartAddFill className='w-full h-20' />}
                            {statusClaimReward.type === 3 && <LuSwords className='w-full h-20' />}
                            {statusClaimReward.type === 4 && <TbShieldPlus className='w-full h-20' />}
                            {statusClaimReward.type === 5 && <FaSkull className='w-full h-20' />}
                        </div>
                        <div>
                            <p className='text-lg font-bold mt-2 ms-[-10px]'>Reward Points</p>
                            {statusClaimReward.type == 5 ? (
                                <p className='font-semibold ms-[-10px]'>
                                    You got nothing...
                                </p>
                            ) : (
                                <p className='font-semibold ms-[-10px]'>
                                    {statusClaimReward.type === 1 && `You got + ${statusClaimReward.point} experience point`}
                                    {statusClaimReward.type === 2 && `You got + ${statusClaimReward.point} heart point`}
                                    {statusClaimReward.type === 3 && `You got + ${statusClaimReward.point} attack point`}
                                    {statusClaimReward.type === 4 && `You got + ${statusClaimReward.point} shield point`}

                                </p>
                            )}
                        </div>

                    </div>
                </div>
            </dialog>

            <dialog id="whoModal" className="modal modal-bottom sm:modal-middle bg-ne">
                <div className="modal-box bg-neutral">
                    <ul className='list-inside list-disc mt-3 text-base font-medium text-neutral-content'>
                        <li>Should do at least 150–300 minutes of moderate-intensity aerobic physical activity; or at least 75–150 minutes of vigorous-intensity aerobic physical activity; or an equivalent combination of moderate- and vigorous-intensity activity throughout the week.</li>
                        <li>Should also do muscle-strengthening activities at moderate or greater intensity that involve all major muscle groups on 2 or more days a week, as these provide additional health benefits.</li>
                        <li>May increase moderate-intensity aerobic physical activity to more than 300 minutes; or do more than 150 minutes of vigorous-intensity aerobic physical activity; or an equivalent combination of moderate- and vigorous-intensity activity throughout the week for additional health benefits.</li>
                        <li>Should limit the amount of time spent being sedentary. Replacing sedentary time with physical activity of any intensity (including light intensity) provides health benefits.</li>
                        <li>To help reduce the detrimental effects of high levels of sedentary behaviour on health, all adults and older adults should aim to do more than the recommended levels of moderate- to vigorous-intensity physical activity.</li>
                    </ul>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn ">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="ahaModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-neutral">
                    <ul className='list-inside list-disc mt-3 text-base font-medium text-neutral-content'>
                        <li>Get at least 150 minutes per week of moderate-intensity aerobic activity or 75 minutes per week of vigorous aerobic activity, or a combination of both, preferably spread throughout the week.</li>
                        <li>Add moderate- to high-intensity muscle-strengthening activity (such as resistance or weights) on at least 2 days per week.</li>
                        <li>Spend less time sitting. Even light-intensity activity can offset some of the risks of being sedentary.</li>
                        <li>Gain even more benefits by being active at least 300 minutes (5 hours) per week.</li>
                        <li>Increase amount and intensity gradually over time.</li>
                    </ul>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>


            </dialog>


            <Navbar />
        </>
    );
}