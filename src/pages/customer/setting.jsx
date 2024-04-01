import Navbar from "../../components/navbar";
import Header from '../../components/header.jsx';
import Avatar1 from '../../assets/avatar/avatar1.webp';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GiRank2 } from "react-icons/gi";

export default function DetailAccount() {


    const [userData, setUserData] = useState({
        username: '',
        rank: '',
        xp: '',
        hp: '',
        coin: ''
    });

    const [theme, setTheme] = useState();
    const navigate = useNavigate();


    const handleClick = (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme);
        setTheme(newTheme);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };


    const getDataDetailUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');

            const response = await axios.get(`http://localhost:2000/user/detail/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            const responseData = response.data; // Assuming the response contains the user details

            // Update the state with the fetched data
            setUserData({
                username: responseData.username,
                rank: responseData.rank,
                xp: responseData.xp,
                hp: responseData.hp,
                coin: responseData.coin
            });

            console.log('response', response)
        } catch (error) {
            console.error('Error fetching data:', error);
            // navigate('/login', { state: { from: location }, replace: true });

        }
    };


    useEffect(() => {
        getDataDetailUser();
    }, []);


    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Setting'} />
            </div>

            <div className="mx-10 mt-5 mb-5">

                <div className="collapse collapse-arrow bg-neutral">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        <div className="grid grid-cols-4">
                            <div className="col-span-3">
                                <p>Detail Account</p>
                            </div>
                            <div className="justify-self-end ">

                            </div>
                        </div>

                    </div>
                    <div className="collapse-content grid place-items-center  ">
                        <div className="mt-3">
                            <kbd className="kbd mx-2 text-sm w-60">Username: {userData.username}</kbd>

                        </div>
                        <div className="mt-3">
                            <kbd className="kbd mx-2 text-sm w-60">Rank: {userData.rank}   {userData.rank === 'Platinum' ? <GiRank2 color="#3ba8ba" fontSize="20px" /> :
                                userData.rank === 2 ? <GiRank2 color="#a46ced" fontSize="20px" /> :
                                    userData.rank === 3 ? <GiRank2 color="#eccc55" fontSize="20px" /> :
                                        null} </kbd>
                        </div>
                        <div className="mt-3">
                            <kbd className="kbd mx-2 text-sm w-60">Xp: {userData.xp}</kbd>
                        </div>
                        <div className="mt-3">
                            <kbd className="kbd mx-2 text-sm w-60">Hp: {userData.hp}</kbd>
                        </div>
                        <div className="mt-3">
                            <kbd className="kbd mx-2 text-sm w-60">Krakatau Coin: {userData.coin}</kbd>
                        </div>
                    </div>
                </div>
                {/* <GiRank2
                    color="#3ba8ba"
                    fontSize="30px"
                />

                <GiRank2
                    color="#a46ced"
                    fontSize="30px"
                />

                <GiRank2
                    color="#eccc55
                    "
                    fontSize="30px"
                /> */}
                <div className="collapse collapse-arrow bg-neutral mt-3">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        Statistic
                    </div>
                    <div className="collapse-content grid place-items-center  ">
                        <div className="mt-3 ">
                            <kbd className="kbd mx-2 text-sm w-60">Total Minute Workout: PRX</kbd>
                        </div>
                        <div className="mt-3">
                            <kbd className="kbd mx-2 text-sm w-60">Most Sport Played: PRX</kbd>
                        </div>
                        <div className="mt-3">
                            <kbd className="kbd mx-2 text-sm w-60">Type Sport: PRX</kbd>
                        </div>
                    </div>

                </div>
                <div className="collapse collapse-arrow bg-neutral mt-3">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        Achievement
                    </div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-3">
                            <button className="btn btn-active btn-sm btn-success me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Reservation Noob</button>
                            <button className="btn btn-active btn-error btn-sm me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Reservation Pro</button>
                            <button className="btn btn-active btn-error btn-sm me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Reservation Expert</button>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                            <button className="btn btn-active btn-sm btn-success me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Badminton Beginner</button>
                            <button className="btn btn-active btn-error btn-sm me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Badminton Intermediate</button>
                            <button className="btn btn-active btn-error btn-sm me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Badminton Expert</button>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                            <button className="btn btn-active btn-sm btn-success me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Futsal Beginner</button>
                            <button className="btn btn-active btn-error btn-sm me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Futsal Intermediate</button>
                            <button className="btn btn-active btn-error btn-sm me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Futsal Expert</button>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                            <button className="btn btn-active btn-sm btn-success me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Basketball Beginner</button>
                            <button className="btn btn-active btn-error btn-sm me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Basketball Intermediate</button>
                            <button className="btn btn-active btn-error btn-sm me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Basketball Expert</button>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                            <button className="btn btn-active btn-sm btn-success me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Gym Beginner</button>
                            <button className="btn btn-active btn-error btn-sm me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Gym Intermediate</button>
                            <button className="btn btn-active btn-error btn-sm me-2 text-xs" onClick={() => document.getElementById('my_modal_2').showModal()}>Gym Expert</button>
                        </div>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Status: ✅</h3>
                                <p className="py-4">order lapapngan 10x</p>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-neutral mt-3">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        Memberships
                    </div>
                    <div className="collapse-content">
                        <div className="grid grid-rows-3 ">
                            <div className="card bg-accent shadow-xl text-accent-content">
                                <div className="card-body">
                                    <h2 className="card-title">Member Gym</h2>
                                    <p>start date end date</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Active</button>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-accent shadow-xl mt-2 text-accent-content">
                                <div className="card-body">
                                    <h2 className="card-title">Member Badminton</h2>
                                    <p>start date end date</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Active</button>
                                    </div>
                                </div>
                            </div>

                            <div className="card bg-accent shadow-xl mt-2 text-accent-content">
                                <div className="card-body">
                                    <h2 className="card-title">Member Renang</h2>
                                    <p>start date end date</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Non Active</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-neutral mt-3">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        Shop
                    </div>
                    <div className="collapse-content">
                        <button className="btn btn-primary me-3" onClick={() => document.getElementById('my_modal_3').showModal()}>Avatar</button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Pick ur avatar!</h3>
                                <div className="grid grid-cols-4 gap-4 justify-items-center mt-3">
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 mt-3 justify-items-center">
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer ">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 mt-3 justify-items-center">
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_2').showModal()}>Theme</button>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Pick ur theme!</h3>
                                <div className="bg-slate-50 border-4 rounded-full flex justify-center hover:border-black cursor-pointer" onClick={() => handleClick("light")}>☀️</div>
                                <div className="bg-slate-900 border-4 rounded-full flex justify-center hover:border-black cursor-pointer" onClick={() => handleClick("dark")}>🐦‍⬛</div>
                                <div className="bg-green-950 border-4 rounded-full flex justify-center hover:border-black cursor-pointer" onClick={() => handleClick("forest")}>🌳</div>
                                <div className="bg-yellow-600 border-4 rounded-full flex justify-center mt-1 hover:border-black cursor-pointer" onClick={() => handleClick("cyberpunk")}>🤖</div>
                                <div className="bg-pink-600 border-4 rounded-full flex justify-center mt-1 hover:border-black cursor-pointer" onClick={() => handleClick("dracula")}>🧛‍♂️</div>
                                <div className="bg-lime-950 border-4 rounded-full flex justify-center mt-1 hover:border-black cursor-pointer" onClick={() => handleClick("lemonade")}>🐉</div>
                                <div className="bg-indigo-950 border-4 rounded-full flex justify-center mt-1 hover:border-black cursor-pointer" onClick={() => handleClick("synthwave")}>🌑</div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-neutral mt-3 mb-40">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        Setting
                    </div>
                    <div className="collapse-content">
                        <button className="btn btn-primary me-3" onClick={handleLogout}>Log Out</button>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn btn-primary me-3" onClick={() => document.getElementById('my_modal_3').showModal()}>Avatar</button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Pick ur avatar!</h3>
                                <div className="grid grid-cols-4 gap-4 justify-items-center mt-3">
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 mt-3 justify-items-center">
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer ">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 mt-3 justify-items-center">
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_2').showModal()}>Theme</button>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Pick ur theme!</h3>
                                <div className="bg-slate-50 border-4 rounded-full flex justify-center hover:border-black cursor-pointer" onClick={() => handleClick("light")}>☀️</div>
                                <div className="bg-slate-900 border-4 rounded-full flex justify-center hover:border-black cursor-pointer" onClick={() => handleClick("dark")}>🐦‍⬛</div>
                                <div className="bg-green-950 border-4 rounded-full flex justify-center hover:border-black cursor-pointer" onClick={() => handleClick("forest")}>🌳</div>
                                <div className="bg-yellow-600 border-4 rounded-full flex justify-center mt-1 hover:border-black cursor-pointer" onClick={() => handleClick("cyberpunk")}>🤖</div>
                                <div className="bg-pink-600 border-4 rounded-full flex justify-center mt-1 hover:border-black cursor-pointer" onClick={() => handleClick("dracula")}>🧛‍♂️</div>
                                <div className="bg-lime-950 border-4 rounded-full flex justify-center mt-1 hover:border-black cursor-pointer" onClick={() => handleClick("lemonade")}>🐉</div>
                                <div className="bg-indigo-950 border-4 rounded-full flex justify-center mt-1 hover:border-black cursor-pointer" onClick={() => handleClick("synthwave")}>🌑</div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>

                    </div>
                </div>

            </div >

            <Navbar />
        </>
    );
}