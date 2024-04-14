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
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";

import AvatarIcon from '../../components/avatar';

export default function DetailAccount() {

    const username = localStorage.getItem('username');
    const [avatarItem, setAvatarItem] = useState([]);
    const [themeItem, setThemeItem] = useState([]);
    const [avatarOwnedItem, setAvatarOwnedItem] = useState([]);
    const [checkXp, setCheckXp] = useState(false);


    const [userData, setUserData] = useState({
        username: '',
        rank: '',
        xp: '',
        hp: '',
        coin: '',
        totalMinuteWorkout: '0'
    });

    const [avatarDetail, setAvatarDetail] = useState({
        title: '',
        xp: '',
    });

    const AvatarItemData = [
        { id: 1, icon: "GiMuscleFat", title: "Muscle Fat", xp: 100, status: 'non-active' },
        { id: 2, icon: "GiMuscleUp", title: "Muscle Up", xp: 150, status: 'non-active' },
        { id: 3, icon: "GiTigerHead", title: "Tiger Head", xp: 200, status: 'non-active' },
        { id: 4, icon: "GiAbstract042", title: "Abstract 042", xp: 120, status: 'non-active' },
        { id: 5, icon: "GiAbstract047", title: "Abstract 047", xp: 140, status: 'non-active' },
        { id: 6, icon: "GiAbstract048", title: "Abstract 048", xp: 110, status: 'non-active' },
        { id: 7, icon: "GiAbstract049", title: "Abstract 049", xp: 160, status: 'non-active' },
        { id: 8, icon: "GiAce", title: "Ace", xp: 170, status: 'non-active' },
        { id: 9, icon: "GiAchillesHeel", title: "Achilles Heel", xp: 180, status: 'non-active' },
        { id: 10, icon: "GiAmericanFootballPlayer", title: "American Football", xp: 190, status: 'non-active' },
        { id: 11, icon: "GiAndroidMask", title: "Android Mask", xp: 210, status: 'non-active' },
        { id: 12, icon: "GiAnimalSkull", title: "Animal Skull", xp: 220, status: 'non-active' },
        { id: 13, icon: "GiAntarctica", title: "Antarctica", xp: 230, status: 'non-active' },
        { id: 14, icon: "GiBatteredAxe", title: "Battered Axe", xp: 240, status: 'non-active' },
        { id: 15, icon: "GiBattleAxe", title: "Battle Axe", xp: 250, status: 'non-active' },
        { id: 16, icon: "GiBearFace", title: "Bear Face", xp: 260, status: 'non-active' },
        { id: 17, icon: "GiBiceps", title: "Biceps", xp: 270, status: 'non-active' },
        { id: 18, icon: "GiBison", title: "Bison", xp: 280, status: 'non-active' },
        { id: 19, icon: "GiBrute", title: "Brute", xp: 290, status: 'non-active' },
        { id: 20, icon: "GiDoubleDragon", title: "Double Dragon", xp: 300, status: 'non-active' }
    ];

    const ThemeItemData = [
        { id: 1, icon: "☀️", title: "Light", status: 'non-active' },
        { id: 2, icon: "🍂", title: "Autumn", status: 'non-active' },
        { id: 3, icon: "🍋", title: "Lemonade", status: 'non-active' },
        { id: 4, icon: "🏂", title: "Winter", status: 'non-active' },
        { id: 5, icon: "🌑", title: "Dark", status: 'non-active' },
        { id: 6, icon: "🎃", title: "Halloween", status: 'non-active' },
        { id: 7, icon: "🌲", title: "Forest", status: 'non-active' },
        { id: 8, icon: "☕", title: "Coffee", status: 'non-active' },
        { id: 9, icon: "🦇", title: "Dracula", status: 'non-active' },
    ];


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
                avatar: responseData.activeAvatar
            });

            console.log('response', response)

        } catch (error) {
            console.error('Error fetching data:', error);
            // navigate('/login', { state: { from: location }, replace: true });

        }
    };

    const getDataAvatarUser = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:2000/user/detail/avatar/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            setAvatarItem(AvatarItemData)
            setAvatarOwnedItem(response.data)

        } catch (error) {
            console.error('Error fetching data:', error);
            // navigate('/login', { state: { from: location }, replace: true });
        }
    };

    const getDataThemeUser = async () => {
        try {
            // const token = localStorage.getItem('token');

            // const response = await axios.get(`http://localhost:2000/user/detail/avatar/${username}`, {
            //     headers: {
            //         Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
            //     }
            // });

            setThemeItem(ThemeItemData)
            // setAvatarOwnedItem(response.data)

        } catch (error) {
            console.error('Error fetching data:', error);
            // navigate('/login', { state: { from: location }, replace: true });
        }
    };

    const handleDetailAvatar = async (id) => {
        try {
            const avatarData = AvatarItemData.find(item => item.id === id);
            console.log(avatarData);

            // Check if the avatar data is found
            if (avatarData) {
                // Show modal with avatar details
                document.getElementById('buyAvatarConfirmation').showModal();

                // Set avatar detail in state
                setAvatarDetail({
                    title: avatarData.title,
                    xp: avatarData.xp,
                });
            } else {
                console.error('Avatar data not found for id:', id);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            // navigate('/login', { state: { from: location }, replace: true });
        }
    };

    const handleBuyAvatar = async (avatar, price) => {
        const dataToSend = {
            avatar: avatar,
            username: username,
        };


        try {
            if (userData.xp < price) {
                setCheckXp(true);
            }
            // console.log('dataToSend', dataToSend);
            const token = localStorage.getItem('token');

            // const response = await axios.post('http://localhost:2000/rating', dataToSend, {
            //     headers: {
            //         Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
            //     }
            // });


        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {

        const filteredItems = avatarItem.map(item => {
            if (avatarOwnedItem.some(ownedItem => ownedItem.avatar === item.icon)) {
                return { ...item, status: 'active' };
            }
            return item;
        });

        setAvatarItem(filteredItems);
    }, [avatarOwnedItem]);

    useEffect(() => {
        getDataDetailUser();
        getDataAvatarUser();
        getDataThemeUser();
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
                                <button className="btn btn-block  ">Username:  {userData.username}
                                    <span className="bg-neutral rounded-full">
                                        <AvatarIcon avatar={userData.avatar} fontSize={"32px"} className="text-neutral-content p-0.5" />
                                    </span>
                                </button>
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
                                            <GiRank2 color="#eccc55" fontSize="30px" />
                                        </div> :
                                        userData.hp > 100 && userData.hp <= 200 ?
                                            <div className="bg-white rounded">
                                                <GiRank2 color="#3ba8ba" fontSize="30px" />
                                            </div> :
                                            userData.hp > 200 ? <div className="bg-white rounded">
                                                <GiRank2 color="#a46ced" fontSize="30px" />
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
                                <button className="btn btn-primary min-w-full" onClick={() => document.getElementById('shopAvatarModal').showModal()}>Avatar    <MdOutlineShoppingCart className="" />
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
                                <button className="btn btn-primary min-w-full" onClick={() => document.getElementById('avatarModal').showModal()}>
                                    Avatar
                                    <span className="bg-neutral rounded-full">
                                        <AvatarIcon avatar={userData.avatar} fontSize={"32px"} className="text-neutral-content p-1" />
                                    </span>
                                </button>
                            </div>
                            <div>
                                <button
                                    className="btn btn-primary min-w-full"
                                    onClick={() => document.getElementById('themeModal').showModal()}>Theme
                                    <div className="text-2xl bg-neutral rounded-full">
                                        ☀️
                                    </div>
                                </button>
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
                </div >

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
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Avatar Store</h3>
                    <div className="grid grid-cols-4 gap-2 mt-3">
                        {avatarItem.map((item, index) => (
                            <div
                                key={index}
                                className={`${item.status === 'non-active' ? 'cursor-pointer' : ''}`}
                                onClick={() => {
                                    if (item.status === 'non-active') {
                                        handleDetailAvatar(item.id)
                                    }
                                }}>
                                <div className="bg-neutral rounded-t-lg grid grid-rows-1 place-items-center h-20">
                                    <div className="">
                                        <div>
                                            <AvatarIcon avatar={item.icon} fontSize={"32px"} className="text-neutral-content" />
                                        </div>
                                    </div>
                                </div>
                                <div className="border">
                                    <p className="text-xs font-semibold">{item.title}</p>
                                    <div className="grid grid-cols-2">
                                        <div className="">
                                            {item.status === 'active' ? (
                                                <IoIosCheckmarkCircle color="green" />
                                            ) : (
                                                <IoIosCloseCircle color="red" />
                                            )}
                                        </div>
                                        <div className="flex justify-end place-self-center">
                                            <p className="text-base"><span className="font-bold">XP</span> {item.xp}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
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
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg ">Change Theme</h3>
                    <div className="grid grid-cols-3 gap-2 mt-3">
                        {themeItem.map((item, index) => (
                            <div
                                key={index}
                                className={`${item.status === 'non-active' ? 'cursor-pointer' : ''}`}
                                onClick={() => {
                                    if (item.status === 'non-active') {
                                        handleDetailAvatar(item.id)
                                    }
                                }}>
                                <div className="bg-neutral-content rounded-t-lg grid grid-rows-1 place-items-center h-20">
                                    <div className="">
                                        <div className="text-5xl">
                                            {item.icon}
                                        </div>
                                    </div>
                                </div>
                                <div className="border ">
                                    <p className={`text-sm font-semibold ${item.title === 'Light' ? 'text-primary' : ''}`}>{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="buyAvatarConfirmation" className="modal modal-bottom sm:modal-middle ">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Buy Avatar {avatarDetail.title} </h3>
                    <div className="grid grid-cols-2 gap-1 mt-3">
                        <button
                            className="btn btn-primary"
                            onClick={() => handleBuyAvatar(avatarDetail.title, avatarDetail.xp)}

                        >XP {avatarDetail.xp} Points</button>
                        <button
                            className="btn"
                            onClick={() => {
                                document.getElementById('buyAvatarConfirmation').close();
                                setCheckXp(false)
                            }}>
                            Cancel
                        </button>
                    </div>
                    {checkXp && <p className="text-error mt-2">{`You don't have enough xp`}</p>}

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >

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