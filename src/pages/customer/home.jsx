import { useNavigate } from 'react-router-dom';
import { GiShuttlecock } from "react-icons/gi";
import { CgGym } from "react-icons/cg";
import Navbar from '../../components/navbar.jsx';
import aha from '../../assets/aha.png'; // Import the image file
import Who from '../../assets/who.png'; // Import the image file
import { useState, useEffect, useContext } from 'react';
import { FaRegAddressCard } from "react-icons/fa6";
import Header from '../../components/header';
import axios from 'axios';
import { GoGift } from "react-icons/go";
import { TfiBasketball } from "react-icons/tfi";
import { FaSwimmingPool } from "react-icons/fa";
import { BiFootball } from "react-icons/bi";
import { FaSkull } from "react-icons/fa";


export default function Home() {

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [challenges, setChallenges] = useState([]);
    const navigate = useNavigate();
    const [progressiveChallangeUser, setProgressiveChallangeUser] = useState(0);
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

            console.log('responseData detail user', responseData)

            // Update the state with the fetched data
            setUserData({
                username: responseData.username,
                rank: responseData.rank,
                xp: responseData.experiencePoint,
                hp: responseData.healthPoint,
                coin: responseData.krakatauCoin,
                statusDailyReward: responseData.statusDailyReward,
                statusWeeklyChallange: responseData.statusWeeklyChallange,
                statusMonthlyChallange: responseData.statusMonthlyChallange,
                status6MonthChallange: true
            });

            console.log('response', userData.status6MonthChallange)
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
            console.log('dataToSend', dataToSend);
            const token = localStorage.getItem('token');

            const response = await axios.post(`http://localhost:2000/claim-reward/${username}`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

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

    const getProgressChallangeUser = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:2000/progressive-challange/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });
            setProgressiveChallangeUser(response.data.scheduleCount);

        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

        }
    };

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

        getDataChallange();
        getDataDetailUser();
        getProgressChallangeUser();

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
                    <div className="card lg:card-side bg-accent shadow-xl m-4">
                        <div className="card-body">
                            <h2 className="card-title text-neutral">Tantangan Mingguan</h2>
                            <div className="grid grid-cols-12">
                                <div className='sm:col-span-1 col-span-2 justify-self-center'>
                                    <p className='text-neutral font-semibold'>0/2</p>
                                </div>
                                <div className='sm:col-span-11 col-span-9'>
                                    <progress className="progress progress-success w-full bg-neutral-content" value={progressiveChallangeUser * 10} max="20"></progress>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className='sm:col-span-2 col-span-4'>
                                    {challenges.filter(challenge => challenge.id === 1).map((challenge) => (
                                        <p key={challenge.id} className='font-semibold text-neutral'>
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
                                            <button className={`btn btn-primary  ${progressiveChallangeUser < 2 ? 'btn-disabled' : 'btn-primary'}`}>Claim Reward</button>
                                        )}

                                        {/* {userData && (
                                            <>
                                                {userData.statusWeeklyChallange ? (
                                                    <button className={`btn btn-primary btn-disabled`}>Already Claim</button>

                                                ) : (
                                                    <button className={`btn btn-primary  ${progressiveChallangeUser < 2 ? 'btn-disabled' : 'btn-primary'}`}>Claim Reward</button>
                                                )}
                                            </>
                                        )} */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card lg:card-side bg-accent shadow-xl m-4">
                        <div className="card-body">
                            <h2 className="card-title text-neutral">Tantangan Bulanan</h2>
                            <div className="grid grid-cols-12">
                                <div className='sm:col-span-1 col-span-2 justify-self-center'>
                                    <p className='text-neutral font-semibold'>0/10</p>
                                </div>
                                <div className='sm:col-span-11 col-span-9'>
                                    <progress className="progress progress-success w-full bg-neutral-content" value={progressiveChallangeUser * 10} max="100"></progress>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className='sm:col-span-2 col-span-4'>
                                    {challenges.filter(challenge => challenge.id === 2).map((challenge) => (
                                        <p key={challenge.id} className='text-base text-neutral font-semibold'>
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
                                            <button className={`btn btn-primary  ${progressiveChallangeUser < 10 ? 'btn-disabled' : 'btn-primary'}`}>Claim Reward</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card lg:card-side bg-accent shadow-xl m-4">
                        <div className="card-body">
                            <h2 className="card-title text-neutral">Tantangan 6 Bulan</h2>
                            <div className="grid grid-cols-12">
                                <div className='sm:col-span-1 col-span-2 justify-self-center'>
                                    <p className='text-neutral font-semibold'>0/50</p>
                                </div>
                                <div className='sm:col-span-11 col-span-9'>
                                    <progress className="progress progress-success w-full bg-neutral-content" value={progressiveChallangeUser * 10} max="500"></progress>
                                </div>
                            </div>
                            <div className="grid grid-cols-4">
                                <div className='sm:col-span-2 col-span-4'>
                                    {challenges.filter(challenge => challenge.id === 3).map((challenge) => (
                                        <p key={challenge.id} className='text-base text-neutral font-semibold'>
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
                                            <button className={`btn btn-primary  ${progressiveChallangeUser < 50 ? 'btn-disabled' : 'btn-primary'}`}>Claim Reward</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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

                <dialog id="rewardModal" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box bg-secondary">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-secondary-content">✕</button>
                        </form>
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
                    {/* <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form> */}
                </dialog>

                <dialog id="whoModal" className="modal modal-bottom sm:modal-middle bg-ne">
                    <div className="modal-box bg-neutral">
                        {/* <h3 className="font-bold text-lg"></h3> */}
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
                    <div className="modal-box">
                        {/* <h3 className="font-bold text-lg">Recommendations for Adults
                        </h3> */}
                        <ul className='list-inside list-disc mt-3 text-base font-medium'>
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




            </div >

            <Navbar />
        </>
    );
}