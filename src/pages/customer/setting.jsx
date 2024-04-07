import Navbar from "../../components/navbar";
import Header from '../../components/header.jsx';
import Avatar1 from '../../assets/avatar/avatar1.webp';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GiRank2 } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineColorLens } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { BiStore } from "react-icons/bi";
import { TbSettings } from "react-icons/tb";
import { FaRegAddressCard } from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { LiaChartBarSolid } from "react-icons/lia";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegMap } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";

// icon avatar
import { GiAbstract042 } from "react-icons/gi";
import { GiAbstract046 } from "react-icons/gi";
import { GiAbstract047 } from "react-icons/gi";
import { GiAbstract048 } from "react-icons/gi";
import { GiAbstract049 } from "react-icons/gi";
import { GiAce } from "react-icons/gi";
import { GiAchillesHeel } from "react-icons/gi";
import { GiAmericanFootballPlayer } from "react-icons/gi";
import { GiAndroidMask } from "react-icons/gi";
import { GiAnimalSkull } from "react-icons/gi";
import { GiAntarctica } from "react-icons/gi";
import { GiBatteredAxe } from "react-icons/gi";
import { GiBattleAxe } from "react-icons/gi";
import { GiBearFace } from "react-icons/gi";
import { GiBiceps } from "react-icons/gi";
import { GiBison } from "react-icons/gi";
import { GiBrute } from "react-icons/gi";
import { GiDoubleDragon } from "react-icons/gi";
import { GiMuscleFat } from "react-icons/gi";
import { GiMuscleUp } from "react-icons/gi";
import { GiTigerHead } from "react-icons/gi";


export default function DetailAccount() {


    const [userData, setUserData] = useState({
        username: '',
        rank: '',
        xp: '',
        hp: '',
        coin: '',
        totalMinuteWorkout: '0'
    });

    const [statusAchievement, setStatusAchievement] = useState([]);


    const [theme, setTheme] = useState();
    const navigate = useNavigate();

    const achievementData = [
        { name: 'Reservation Noob', description: 'Just getting started with making reservations.', status: true },
        { name: 'Reservation Pro', description: 'A proficient reservation maker, knows the ins and outs.', status: true },
        { name: 'Reservation Expert', description: 'Master of reservations, can handle any booking task.', status: true },
        { name: 'Badminton Beginner', description: 'New to badminton, learning the basics.', status: true },
        { name: 'Badminton Intermediate', description: 'Has progressed beyond the beginner stage, gaining proficiency.', status: true },
        { name: 'Badminton Expert', description: 'Highly skilled in badminton, capable of advanced techniques.', status: true },
        { name: 'Futsal Beginner', description: 'Novice in futsal, exploring the game.', status: true },
        { name: 'Futsal Intermediate', description: 'Moving past the beginner stage, improving skills in futsal.', status: true },
        { name: 'Futsal Expert', description: 'An expert in futsal, proficient in all aspects of the game.', status: true },
        { name: 'Basketball Beginner', description: 'Just starting out in basketball, learning the fundamentals.', status: true },
        { name: 'Basketball Intermediate', description: 'Progressing in basketball skills, beyond the beginner level.', status: true },
        { name: 'Basketball Expert', description: 'Highly skilled in basketball, able to play at an advanced level.', status: true },
        { name: 'Gym Beginner', description: 'New to the gym, beginning the fitness journey.', status: true },
        { name: 'Gym Intermediate', description: 'Progressing in fitness, gaining strength and endurance.', status: true },
        { name: 'Gym Expert', description: 'An expert in fitness, well-versed in various workouts and techniques.', status: true },
    ];



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

            console.log(responseData)

            // Update the state with the fetched data
            setUserData({
                username: responseData.username,
                rank: responseData.rank,
                xp: responseData.experiencePoint,
                hp: responseData.healthPoint,
                coin: responseData.krakatauCoin
            });

            console.log('response', response)
        } catch (error) {
            console.error('Error fetching data:', error);
            // navigate('/login', { state: { from: location }, replace: true });

        }
    };


    useEffect(() => {
        getDataDetailUser();
        setStatusAchievement(achievementData);
    }, []);


    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Account'} />
            </div>

            <div className="mx-10 mt-5 mb-5">

                <div className="collapse collapse-arrow bg-neutral">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        <div className="grid grid-cols-4">
                            <div className="col-span-3">
                                <p>Detail Account</p>
                            </div>
                            <div className="justify-self-end self-center">
                                <FaRegUser />
                            </div>
                        </div>

                    </div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-1">
                            <div className="mt-3">
                                <button className="btn btn-block  ">Username:  {userData.username} <span className=""><GiAmericanFootballPlayer fontSize={"30px"} className="text-neutral" /></span>   </button>
                                {/* <div className="flex justify-center">
                                    <div className="rounded-full bg-neutral  p-1 w-10">
                                        <GiBrute fontSize={"30px"} className="text-neutral-content" />

                                    </div>

                                </div> */}
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className="mt-3">
                                {/* #a46ced */}
                                {/* #eccc55 */}
                                {/* #3ba8ba */}
                                <button className="btn btn-block">Rank:
                                    {userData.hp <= 100 ?
                                        <div className="bg-white rounded">
                                            <GiRank2 color="#eccc55" fontSize="25px" />
                                        </div> :
                                        userData.hp > 100 && userData.hp <= 200 ?
                                            <div className="bg-white rounded">
                                                <GiRank2 color="#3ba8ba" fontSize="25px" />
                                            </div> :
                                            userData.hp > 200 ? <div className="bg-white rounded">
                                                <GiRank2 color="#a46ced" fontSize="25px" />
                                            </div> :
                                                null}</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className="mt-3">
                                <button className="btn btn-block">XP: {userData.xp}</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className="mt-3">
                                <button className="btn btn-block">HP:  {userData.hp}</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className="mt-3">
                                <button className="btn btn-block">Krakatau Coin:  {userData.coin}</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="collapse collapse-arrow bg-neutral mt-3">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        <div className="grid grid-cols-4">
                            <div className="col-span-3">
                                <p>Statistic</p>
                            </div>
                            <div className="justify-self-end self-center">
                                <LiaChartBarSolid />
                            </div>
                        </div>
                    </div>
                    <div className="collapse-content   ">
                        <div className="grid grid-cols-1">
                            <div className="mt-3">
                                <button className="btn btn-block" >Total Minute Workout:   {userData.totalMinuteWorkout}</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className="mt-3">
                                <button className="btn btn-block">Most Sport Played:  {userData.mostSportPlayed}</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1">
                            <div className="mt-3">
                                <button className="btn btn-block">Type Sport:  {userData.typeSport}</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="collapse collapse-arrow bg-neutral mt-3">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        <div className="grid grid-cols-4">
                            <div className="col-span-3">
                                <p>Achievement</p>
                            </div>
                            <div className="justify-self-end self-center">
                                <TbTargetArrow />
                            </div>
                        </div>
                    </div>
                    <div className="collapse-content">
                        {statusAchievement.map((achievement, index) => (
                            (index % 3 === 0) && (
                                <div className="grid grid-cols-3 mt-2" key={index}>
                                    {statusAchievement.slice(index, index + 3).map((achievement, subIndex) => (
                                        <button className={`btn btn-active btn-sm overflow-hidden ${achievement.status === 'Beginner' ? 'btn-success' : 'btn-error'} me-2 text-xs`} key={subIndex} onClick={() => document.getElementById('achievementModal').showModal()}>
                                            {achievement.name}
                                        </button>
                                    ))}
                                </div>
                            )
                        ))}
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-neutral mt-3">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        <div className="grid grid-cols-4">
                            <div className="col-span-3">
                                <p>Memberships</p>
                            </div>
                            <div className="justify-self-end self-center">
                                <FaRegAddressCard />
                            </div>
                        </div>
                    </div>
                    <div className="collapse-content">
                        <div className=" ">
                            <div className="card bg-accent shadow-xl text-accent-content">
                                <div className="card-body">
                                    <h2 className="card-title">Member Gym</h2>
                                    <p>start date </p>
                                    <p>end date</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">Active</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-neutral mt-3">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        <div className="grid grid-cols-4">
                            <div className="col-span-3">
                                <p>Shop</p>
                            </div>
                            <div className="justify-self-end self-center">
                                <BiStore />
                            </div>
                        </div>
                    </div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-2 gap-1 ">
                            <div>
                                <button className="btn btn-primary min-w-full" onClick={() => document.getElementById('shopAvatarModal').showModal()}>Avatar <MdOutlineShoppingCart />
                                </button>

                            </div>
                            <div>
                                <button className="btn btn-primary min-w-full" onClick={() => document.getElementById('shopThemeModal').showModal()}>Theme <MdOutlineShoppingCart />
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-neutral mt-3 mb-40">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        <div className="grid grid-cols-4">
                            <div className="col-span-3">
                                <p>Setting</p>
                            </div>
                            <div className="justify-self-end self-center">
                                <TbSettings />
                            </div>
                        </div>
                    </div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-2 gap-1 ">
                            <div>
                                {/* Open the modal using document.getElementById('ID').showModal() method */}
                                <button className="btn btn-primary min-w-full" onClick={() => document.getElementById('avatarModal').showModal()}>Avatar <span className=""><GiAmericanFootballPlayer fontSize={"30px"} className="text-neutral" /></span>
                                </button>
                            </div>
                            <div>
                                <button className="btn btn-primary min-w-full" onClick={() => document.getElementById('themeModal').showModal()}>Theme  <MdOutlineColorLens /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 mt-2 gap-1">
                            <div>
                                <button className="btn btn-primary min-w-full " onClick={null}>Journal <FaRegMap />
                                </button>

                            </div>
                            <div>
                                <button className="btn btn-primary min-w-full " onClick={handleLogout}>Log Out <IoMdLogOut /></button>

                            </div>

                        </div>
                    </div>
                </div>

            </div >

            <dialog id="achievementModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Status: ✅ or ❌</h3>
                    <p className="py-4">Order any kind of product 1 time</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="shopAvatarModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Avatar Store</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <div className=" " onClick={() => document.getElementById('buyAvatarConfirmation').showModal()}>
                            <div className="bg-neutral rounded-t-lg grid grid-rows-1 place-items-center h-20 ">
                                <div className="">
                                    <div>
                                        <GiMuscleFat fontSize={"30px"} className="text-neutral-content" />
                                    </div>
                                </div>
                            </div>
                            <div className="border">
                                <p className="text-xs">Muscle Fat</p>
                                <div className="grid grid-cols-2 ">
                                    <div className="">
                                        <IoIosCheckmarkCircle color="green" />
                                    </div>
                                    <div className="flex justify-end place-self-center">
                                        <p className="text-xs"><span className="font-bold">XP</span> 100</p>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="shopThemeModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Theme Store</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <div className=" " onClick={() => document.getElementById('buyThemeConfirmation').showModal()}>
                            <div className="bg-slate-200 rounded-t-lg grid grid-rows-1 place-items-center h-20">
                                <div className="">
                                    <div>
                                        ☀️
                                    </div>
                                </div>
                            </div>
                            <div className="border">
                                <p className="text-xs">Sunlight</p>
                                <div className="grid grid-cols-2 ">
                                    <div className="">
                                        ❌
                                    </div>
                                    <div className="flex justify-end place-self-center">
                                        <p className="text-xs"><span className="font-bold">XP</span> 100</p>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="avatarModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Change Avatar</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <div className=" " onClick={() => document.getElementById('buyThemeConfirmation').showModal()}>
                            <div className="bg-slate-200 rounded-t-lg grid grid-rows-1 place-items-center h-10">
                                <div className="">
                                    <div>
                                        ☀️
                                    </div>
                                </div>
                            </div>
                            <div className="border">
                                <p className="text-xs text-primary font-bold text-center">Sunlight</p>
                            </div>
                        </div>
                        <div className=" " onClick={() => document.getElementById('buyThemeConfirmation').showModal()}>
                            <div className="bg-slate-200 rounded-t-lg grid grid-rows-1 place-items-center h-10">
                                <div className="">
                                    <div>
                                        ☀️
                                    </div>
                                </div>
                            </div>
                            <div className="border">
                                <p className="text-xs  font-bold text-center">Sunlight</p>
                            </div>
                        </div>
                    </div>



                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="themeModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Change Theme</h3>
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

            <dialog id="buyAvatarConfirmation" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Muscle Fat</h3>
                    <div className="grid grid-cols-2 gap-1">
                        <button className="btn btn-primary">XP 100 Points</button>
                        <button className="btn">Cancel</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="buyThemeConfirmation" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Sunlight</h3>
                    <div className="grid grid-cols-2 gap-1">
                        <button className="btn btn-primary">XP 50 Points</button>
                        <button className="btn">Cancel</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="changeActiveAvatarConfirmation" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Muscle Fat</h3>
                    <div className="grid grid-cols-2 gap-1">
                        <button className="btn btn-primary">XP 100 Points</button>
                        <button className="btn">Cancel</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="changeActiveThemeConfirmation" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Sunlight</h3>
                    <div className="grid grid-cols-2 gap-1">
                        <button className="btn btn-primary">XP 50 Points</button>
                        <button className="btn">Cancel</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <Navbar />
        </>
    );
}