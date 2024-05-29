import Navbar from "../../components/navbar";
import Header from '../../components/header.jsx';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { GiRank2 } from "react-icons/gi";
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
import { GiAchievement } from "react-icons/gi";
import { IoIosCloseCircle } from "react-icons/io";
import { FaGifts } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import { LuSword } from "react-icons/lu";
import { IoShieldOutline } from "react-icons/io5";
import { BsTrophy } from "react-icons/bs";
import { LuHeartPulse } from "react-icons/lu";
import { FaWalking } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import AvatarIcon from '../../components/avatar';

export default function DetailAccount() {

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const AvatarItemData = [
        { id: 1, icon: "GiMuscleFat", title: "Muscle Fat", xp: 100, status: 'non-active', preview: 'non-active' },
        { id: 2, icon: "GiMuscleUp", title: "Muscle Up", xp: 110, status: 'non-active', preview: 'non-active' },
        { id: 3, icon: "GiBowman", title: "Bowman", xp: 120, status: 'non-active', preview: 'non-active' },
        { id: 4, icon: "GiBullyMinion", title: "Bully Minion", xp: 130, status: 'non-active', preview: 'non-active' },
        { id: 5, icon: "GiCardJoker", title: "Card Joker", xp: 140, status: 'non-active', preview: 'non-active' },
        { id: 6, icon: "GiDwarfFace", title: "Dwarf Face", xp: 150, status: 'non-active', preview: 'non-active' },
        { id: 7, icon: "GiEnrage", title: "Enrage", xp: 160, status: 'non-active', preview: 'non-active' },
        { id: 8, icon: "GiFireDash", title: "Fire Dash", xp: 170, status: 'non-active', preview: 'non-active' },
        { id: 9, icon: "GiFluffyCloud", title: "Fluffy Cloud", xp: 180, status: 'non-active', preview: 'non-active' },
        { id: 10, icon: "GiGiant", title: "Giant", xp: 190, status: 'non-active', preview: 'non-active' },
        { id: 11, icon: "GiGolemHead", title: "Golem Head", xp: 210, status: 'non-active', preview: 'non-active' },
        { id: 12, icon: "GiHeadshot", title: "Headshot", xp: 220, status: 'non-active', preview: 'non-active' },
        { id: 13, icon: "GiPolarBear", title: "Polar Bear", xp: 230, status: 'non-active', preview: 'non-active' },
        { id: 14, icon: "GiSickle", title: "Sickle", xp: 240, status: 'non-active', preview: 'non-active' },
        { id: 15, icon: "GiHoodedAssassin", title: "Hooded Assassin", xp: 250, status: 'non-active', preview: 'non-active' },
        { id: 16, icon: "GiUnicorn", title: "Unicorn", xp: 260, status: 'non-active', preview: 'non-active' },
        { id: 17, icon: "GiBatteredAxe", title: "Battered Axe", xp: 270, status: 'non-active', preview: 'non-active' },
        { id: 18, icon: "GiWeightLiftingUp", title: "Weight Lift", xp: 280, status: 'non-active', preview: 'non-active' },
        { id: 19, icon: "GiTornado", title: "Tornado", xp: 290, status: 'non-active', preview: 'non-active' },
        { id: 20, icon: "GiAncientSword", title: "Ancient Sword", xp: 300, status: 'non-active', preview: 'non-active' }
    ];

    const ThemeItemData = [
        { id: 1, xp: 100, icon: "☀️", title: "Light", status: 'non-active', preview: 'non-active', bodySend: "light" },
        { id: 2, xp: 110, icon: "🍂", title: "Autumn", status: 'non-active', preview: 'non-active', bodySend: "autumn" },
        { id: 3, xp: 120, icon: "🍋", title: "Lemonade", status: 'non-active', preview: 'non-active', bodySend: "lemonade" },
        { id: 4, xp: 130, icon: "🏂", title: "Winter", status: 'non-active', preview: 'non-active', bodySend: "winter" },
        { id: 5, xp: 140, icon: "🌑", title: "Dark", status: 'non-active', preview: 'non-active', bodySend: "dark" },
        { id: 6, xp: 150, icon: "🎃", title: "Halloween", status: 'non-active', preview: 'non-active', bodySend: "halloween" },
        { id: 7, xp: 160, icon: "🌲", title: "Forest", status: 'non-active', preview: 'non-active', bodySend: "forest" },
        { id: 8, xp: 170, icon: "☕", title: "Coffee", status: 'non-active', preview: 'non-active', bodySend: "coffee" },
        { id: 9, xp: 180, icon: "🦇", title: "Dracula", status: 'non-active', preview: 'non-active', bodySend: "dracula" },
        { id: 10, xp: 190, icon: "💧", title: "Aqua", status: 'non-active', preview: 'non-active', bodySend: "aqua" },
        { id: 11, xp: 200, icon: "🗻", title: "Nord", status: 'non-active', preview: 'non-active', bodySend: "nord" },
        { id: 12, xp: 210, icon: "🌇", title: "Sunset", status: 'non-active', preview: 'non-active', bodySend: "sunset" },

    ];

    const achievementData = [
        { id: 1, name: 'Reservation Beginner', description: 'Make 1 Reservation All Kind Product', status: true, count: 1 },
        { id: 2, name: 'Reservation Intermediate', description: 'Make 10 Reservation All Kind Product', status: true, count: 10 },
        { id: 3, name: 'Reservation Expert', description: 'Make 25 Reservation All Kind Product', status: true, count: 25 },
        { id: 4, name: 'Badminton Beginner', description: 'Make 1 Reservation Badminton', status: true, count: 1 },
        { id: 5, name: 'Badminton Intermediate', description: 'Make 10 Reservation Badminton', status: true, count: 10 },
        { id: 6, name: 'Badminton Expert', description: 'Make 25 Reservation Badminton', status: true, count: 25 },
        { id: 7, name: 'Futsal Beginner', description: 'Make 1 Reservation Futsal', status: true, count: 1 },
        { id: 8, name: 'Futsal Intermediate', description: 'Make 10 Reservation Futsal', status: true, count: 10 },
        { id: 9, name: 'Futsal Expert', description: 'Make 25 Reservation Futsal', status: true, count: 25 },
        { id: 10, name: 'Basketball Beginner', description: 'Make 1 Reservation Basketball', status: true, count: 1 },
        { id: 11, name: 'Basketball Intermediate', description: 'Make 10 Reservation Basketball', status: true, count: 10 },
        { id: 12, name: 'Basketball Expert', description: 'Make 25 Reservation Basketball', status: true, count: 25 },
        { id: 13, name: 'Gym Beginner', description: 'Make 1 Reservation Gym', status: true, count: 1 },
        { id: 14, name: 'Gym Intermediate', description: 'Make 10 Reservation Gym', status: true, count: 10 },
        { id: 15, name: 'Gym Expert', description: 'Make 25 Reservation Gym', status: true, count: 25 },
    ];

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            paymentMethod: "cash",
            breathStatus: "normal"
        }
    });

    const [theme, setTheme] = useState(null);
    const [avatar, setAvatar] = useState(null);


    // for shop avatar
    const [avatarOwnedItem, setAvatarOwnedItem] = useState([]);
    const [themeItem1, setThemeItem1] = useState([]);
    const [themeItemShop, setThemeItemShop] = useState(null);
    const [avatarItem, setAvatarItem] = useState(null);
    const [avatarDetail, setAvatarDetail] = useState(null);
    const [themeDetail, setThemeDetail] = useState(null);

    // for change avatar
    const [themeItem, setThemeItem] = useState(null);
    const [avatarItemSetting, setAvatarItemSetting] = useState(null);

    const [userData, setUserData] = useState(null);
    const [statisticData, setStatisticData] = useState(null);
    const [achievement, setAchievement] = useState(achievementData);
    const [achievementDetail, setAchievementDetail] = useState(null);
    const [membership, setMembership] = useState(null);
    const [checkXp, setCheckXp] = useState(false);
    const [breathStatus, setBreathStatus] = useState('normal');

    const [loadingStatus, setLoadingStatus] = useState(null);


    const getDataDetailUser = async () => {
        try {

            const response = await axios.get(`/user/detail/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const responseData = response.data;

            setUserData({
                username: responseData.username,
                rank: responseData.rank,
                xp: responseData.experiencePoint,
                hp: responseData.healthPoint,
                coin: responseData.krakatauCoin,
                activeAvatar: responseData.activeAvatar,
                activeTheme: responseData.activeTheme
            });


        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const getDataDetailStatisticAchievementMembership = async () => {
        try {

            const response = await axios.get(`/user/detail/stat/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const responseData = response.data;

            setStatisticData({
                mostPlayedSport: responseData.mostPlayedSport,
                totalMinuteWorkout: responseData.totalMinuteWorkout,
                typeSport: responseData.typeSport
            });

        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const getDataAchievement = async () => {
        try {
            const response = await axios.get(`/user/detail/achievement/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const sums = response.data

            const updatedAchievement = achievement.map(item => {
                if (item.name.includes('Reservation')) {
                    item.status = sums.sumReservation - item.count >= 0;
                } else if (item.name.includes('Badminton')) {
                    item.status = sums.sumBadminton - item.count >= 0;
                } else if (item.name.includes('Futsal')) {
                    item.status = sums.sumFutsal - item.count >= 0;
                } else if (item.name.includes('Basketball')) {
                    item.status = sums.sumBasketball - item.count >= 0;
                } else if (item.name.includes('Gym')) {
                    item.status = sums.sumGym - item.count >= 0;
                }
                return item;
            });


            setAchievement(updatedAchievement);


        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handleDetailAchievement = async (id) => {
        try {
            const achievementData = achievement.find(item => item.id === id);

            document.getElementById('achievementModal').showModal();

            setAchievementDetail({
                description: achievementData.description,
                status: achievementData.status,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const getDataMembership = async () => {
        try {

            const response = await axios.get(`/payment/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const filteredData = response.data.filter(item => {
                return (item.idProduct === 18 || item.idProduct === 19 || item.idProduct === 21) && item.paymentStatus === 'Lunas';
            });

            setMembership(filteredData);

        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }

    const getDataAvatarUser = async () => {
        try {

            const response = await axios.get(`/user/detail/avatar/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAvatarOwnedItem(response.data)

        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handleDetailAvatar = async (id) => {
        try {
            const avatarData = AvatarItemData.find(item => item.id === id);

            if (avatarData) {
                document.getElementById('buyAvatarConfirmation').showModal();

                setAvatarDetail({
                    title: avatarData.icon,
                    xp: avatarData.xp,
                    name: avatarData.title
                });
            } else {
                console.error('Avatar data not found for id:', id);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handleBuyAvatar = async (avatar, price) => {
        const dataToSend = {
            avatar: avatar,
            price: price,
        };
        console.log('userData.xp', userData.xp);
        try {
            if (userData.xp < price) {
                setCheckXp(true);
            } else {
                setLoadingStatus(true)


                const response = await axios.post('/buy-avatar', dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setLoadingStatus(false)


                document.getElementById('buyAvatarConfirmation').close();
                getDataAvatarUser()
                getDataDetailUser();

            }
        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handlePreviewAvatar = async (id) => {
        const updatedData = avatarItemSetting.map(item => {
            if (item.id === id) {
                return { ...item, preview: 'active' };
            } else {
                return { ...item, preview: 'non-active' };
            }
        });
        setAvatarItemSetting(updatedData)
    };

    const handleCancelPreviewAvatar = async () => {
        const updatedData = avatarItemSetting.map(item => {
            if (item.icon === avatar) {
                return { ...item, preview: 'active' };
            } else {
                return { ...item, preview: 'non-active' };
            }
        });
        setAvatarItemSetting(updatedData)

    };

    const handleSetAsActiveAvatar = async () => {
        const activePreviews = avatarItemSetting.filter(item => item.preview === 'active');
        const dataToSend = {
            activeAvatar: activePreviews[0].icon,
        };


        try {

            const response = await axios.post('/update-avatar', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAvatar(activePreviews[0].icon);
            setUserData({
                ...userData,
                activeAvatar: activePreviews[0].icon
            });

        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const getDataThemeUser = async () => {
        try {

            const response = await axios.get(`/user/detail/theme/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            setThemeItem1(response.data)

        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handleDetailTheme = async (id) => {
        try {
            const themeData = ThemeItemData.find(item => item.id === id);
            document.querySelector('html').setAttribute('data-theme', themeData.bodySend);

            console.log('themeData', themeData);

            if (themeData) {
                document.getElementById('buyThemeConfirmation').showModal();

                // Set avatar detail in state
                setThemeDetail({
                    title: themeData.icon,
                    xp: themeData.xp,
                    name: themeData.title,
                    bodySend: themeData.bodySend
                });
            } else {
                console.error('Theme data not found for id:', id);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handleBuyTheme = async (theme, price) => {
        const dataToSend = {
            theme: theme,
            price: price,
        };

        try {
            if (userData.xp < price) {
                setCheckXp(true);
            } else {
                setLoadingStatus(true)

                const response = await axios.post('/buy-theme', dataToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setLoadingStatus(false)

                document.getElementById('buyThemeConfirmation').close();
                document.querySelector('html').setAttribute('data-theme', userData.activeTheme.toLocaleLowerCase());

                getDataThemeUser()
                getDataDetailUser();

            }
        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handlePreviewTheme = async (id) => {
        const themeData = themeItem.find(item => item.id === id);
        document.querySelector('html').setAttribute('data-theme', themeData.title.toLowerCase());
        const updatedData = themeItem.map(item => {
            if (item.id === id) {
                return { ...item, preview: 'active' };
            } else {
                return { ...item, preview: 'non-active' };
            }
        });
        setThemeItem(updatedData)


    };

    const handleCancelPreviewTheme = async () => {
        document.querySelector('html').setAttribute('data-theme', theme);
        const updatedData = themeItem.map(item => {
            if (item.bodySend === theme) {
                return { ...item, preview: 'active' };
            } else {
                return { ...item, preview: 'non-active' };
            }
        });
        setThemeItem(updatedData)

    };

    const handleSetAsActiveTheme = async () => {
        const activePreviews = themeItem.filter(item => item.preview === 'active');

        const dataToSend = {
            activeTheme: activePreviews[0].title,
            username: username,
        };

        try {

            const response = await axios.post('/update-theme', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTheme(activePreviews[0].title);
            setUserData({
                ...userData,
                activeTheme: activePreviews[0].title
            });

        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const handleRadioBreathStatus = (status) => {
        setBreathStatus(status);
    };

    const handleNavigateJournal = (pageName) => {
        navigate(`${pageName}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        const filteredItems = ThemeItemData.map(item => {
            if (themeItem1.some(ownedItem => ownedItem.theme === item.title)) {
                return { ...item, status: 'active' };
            }
            return item;
        });
        console.log('filteredItems theme', filteredItems);
        setThemeItemShop(filteredItems);
    }, [themeItem1]);

    useEffect(() => {
        const filteredItems = AvatarItemData.map(item => {
            if (avatarOwnedItem.some(ownedItem => ownedItem.avatar === item.icon)) {
                return { ...item, status: 'active' };
            }
            return item;
        });
        console.log('filteredItems avatar', filteredItems);
        setAvatarItem(filteredItems);
    }, [avatarOwnedItem]);

    useEffect(() => {
        if (userData) {
            document.querySelector('html').setAttribute('data-theme', userData.activeTheme.toLocaleLowerCase());
            setTheme(userData.activeTheme.toLocaleLowerCase());
            setAvatar(userData.activeAvatar);


            const updatedAvatarItemData = avatarItem.map(item => {
                if (item.icon === userData.activeAvatar) {
                    return { ...item, preview: 'active' };
                } else {
                    return { ...item, preview: 'non-active' };
                }
            });

            setAvatarItemSetting(updatedAvatarItemData)


            const updatedThemeItemData = themeItemShop.map(item => {
                if (item.title === userData.activeTheme) {
                    return { ...item, preview: 'active' };
                } else {
                    return { ...item, preview: 'non-active' };
                }
            });
            setThemeItem(updatedThemeItemData)

        }

    }, [userData, avatarItem, themeItemShop]);

    useEffect(() => {
        getDataDetailUser();
        getDataDetailStatisticAchievementMembership();
        getDataAchievement();
        getDataMembership();
        getDataAvatarUser();
        getDataThemeUser();

    }, []);


    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Account'} />
            </div>

            <div className="flex justify-center mt-3 mb-3">
                <div>
                    <button className="btn btn-neutral btn-sm btn-square mx-2 hover:animate-bounce" onClick={() => document.getElementById('leaderboardModal').showModal()}>
                        <BsTrophy className=' hover:animate-pulse' fontSize="20px" />
                    </button>
                    <button className="btn btn-primary btn-sm btn-square  mx-2 hover:animate-bounce" onClick={() => document.getElementById('attackModal').showModal()}>
                        <LuSword className=' hover:animate-bounce ' fontSize="20px" />
                    </button>
                    <button className="btn btn-secondary btn-sm btn-square mx-2 hover:animate-bounce" onClick={() => document.getElementById('defenseModal').showModal()}>
                        <IoShieldOutline className=' hover:animate-bounce ' fontSize="20px" />
                    </button>
                    <button className="btn btn-secondary btn-sm btn-square mx-2 hover:animate-bounce" onClick={() => document.getElementById('hearthModal').showModal()}>
                        <LuHeartPulse className=' hover:animate-ping ' fontSize="20px" />
                    </button>
                </div>
            </div>

            <dialog id="leaderboardModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Krakatau Leaderboard System</h3>
                    <p className="py-4">Climb up to top by reservation any kind of product</p>
                    <div className='grid grid-rows-3'>
                        <div className='grid grid-cols-5'>
                            <div className='col-span-1'>
                                <GiRank2 color="#eccc55" fontSize="25px" />

                            </div>
                            <div className='col-span-2'>
                                <p style={{ color: "#eccc55" }} className='font-bold'>Gold</p>

                            </div>
                            <div className='col-span-2 text-start flex items-center'>
                                <p className='text-xs font-thin'>0 - 100 XP</p>

                            </div>
                        </div>
                        <div className='grid grid-cols-5'>
                            <div className='col-span-1' >
                                <GiRank2 color="#3ba8ba" fontSize="25px" />

                            </div>
                            <div className='col-span-2'  >
                                <p style={{ color: "#3ba8ba" }} className='font-bold'>Platinum</p>

                            </div>
                            <div className='col-span-2 text-start flex items-center'>
                                <p className='text-xs font-thin'>101 - 200 XP</p>

                            </div>
                        </div>
                        <div className='grid grid-cols-5'>
                            <div className='col-span-1' >
                                <GiRank2 color="#a46ced" fontSize="25px" />

                            </div>
                            <div className='col-span-2' >
                                <p style={{ color: "#a46ced" }} className='font-bold'>Diamond</p>

                            </div>
                            <div className='col-span-2 text-start flex items-center' >
                                <p className='text-xs font-thin'>201 - 1000 XP</p>

                            </div>
                        </div>
                    </div>
                    <p className="py-4">1 XP for every Rp 10 000 you spend</p>
                    <div className='bg-neutral p-3 rounded-lg mt-2 border-4 border-neutral-content border-double'>
                        <p className="py-4 text-neutral-content">Note : Use your XP to buy avatar or app theme</p>
                    </div>
                    <p className="py-4">Every reservation allow you to set breath status to get HP</p>
                    <p className="pb-4">Breath status mean how much energy you will use for exercise</p>
                    <div>
                        <div>
                            <div className='grid grid-cols-3'>
                                <p className='col-span-2' ><FaPerson className={`${breathStatus === 'normal' ? 'animate-pulse' : ''}`} />Normal Breath <span className='text-xs font-thin'>(10 HP)</span></p>
                                <input
                                    {...register("breathStatus")}
                                    value="normal"
                                    type="radio"
                                    className="radio checked:bg-green-500"
                                    onClick={() => handleRadioBreathStatus('normal')}
                                />
                            </div>
                            <div className='grid grid-cols-3 mt-2'>
                                <p className='col-span-2' ><FaWalking className={`${breathStatus === 'medium' ? 'animate-pulse' : ''}`} />Medium Breath <span className='text-xs font-thin'>(10 - 20 HP)</span> </p>
                                <input
                                    {...register("breathStatus")}
                                    value="medium"
                                    type="radio"
                                    className="radio checked:bg-yellow-500"
                                    onClick={() => handleRadioBreathStatus('medium')}
                                />
                            </div>
                            <div className='grid grid-cols-3 mt-2'>
                                <p className='col-span-2' ><FaRunning className={`${breathStatus === 'high' ? 'animate-pulse' : ''}`} />High Breath <span className='text-xs font-thin'>(20 - 30 HP)</span></p>
                                <input
                                    {...register("breathStatus")}
                                    value="high"
                                    type="radio"
                                    className="radio checked:bg-red-500"
                                    onClick={() => handleRadioBreathStatus('high')}
                                />
                            </div>
                        </div>



                    </div>
                    <div className='bg-neutral p-3 rounded-lg mt-2 border-4 border-neutral-content border-double'>
                        <p className="py-4 text-neutral-content">Note : XP: Experience Point</p>
                        <p className="py-4 text-neutral-content">Note : HP: Health Point</p>
                    </div>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog >

            <dialog id="attackModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Attack System</h3>
                    <p className="py-4">Every successfull and already paid reservation can get +1 attack attempt</p>
                    <div className='bg-neutral p-3 rounded-lg mt-2 border-4 border-neutral-content border-double'>
                        <p className='text-neutral-content'>Note : Attack attempt can be use on leaderboard page to reduce another user health point</p>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="defenseModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Defense System</h3>
                    <p className="py-4 ">Every successfull and already paid reservation can get +1 defend to prevent direct attack to health point</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <dialog id="hearthModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Health System</h3>
                    <p className="py-4">Every successfull and already paid reservation can get +? HP depending on the breath status you pick</p>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {userData && statisticData && achievement && membership ? (
                <>
                    <div className="mx-10 mt-5 mb-5 text-neutral-content">
                        <div className="collapse collapse-arrow bg-neutral ">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium ">
                                <div className="grid grid-cols-4">
                                    <div className="col-span-3">
                                        <p className="">Detail Account</p>
                                    </div>
                                    <div className="justify-self-end self-center">
                                        <FaRegUser />
                                    </div>
                                </div>

                            </div>
                            <div className="collapse-content">
                                <div className="grid grid-cols-1">
                                    <div className="mt-3">
                                        <button className="btn btn-block  cursor-default">Username:  {userData.username}
                                            <span className="bg-neutral rounded-full">
                                                <AvatarIcon avatar={userData.avatar} fontSize={"32px"} className="text-neutral-content p-0.5" />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1">
                                    <div className="mt-3">
                                        <button className="btn btn-block cursor-default">Rank:
                                            {userData.hp <= 100 ?
                                                <div className=" rounded">
                                                    <GiRank2 color="#eccc55" fontSize="30px" />
                                                </div> :
                                                userData.hp > 100 && userData.hp <= 200 ?
                                                    <div className=" rounded">
                                                        <GiRank2 color="#3ba8ba" fontSize="30px" />
                                                    </div> :
                                                    userData.hp > 200 ? <div className=" rounded">
                                                        <GiRank2 color="#a46ced" fontSize="30px" />
                                                    </div> :
                                                        null}</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1">
                                    <div className="mt-3">
                                        <button className="btn btn-block cursor-default">XP: {userData.xp}</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1">
                                    <div className="mt-3">
                                        <button className="btn btn-block cursor-default">HP:  {userData.hp}</button>
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
                                        <button className="btn btn-block" >Total Hour Workout:   {statisticData?.totalMinuteWorkout} hour</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1">
                                    <div className="mt-3">
                                        <button className="btn btn-block">Most Sport Played:  {statisticData?.mostPlayedSport}</button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1">
                                    <div className="mt-3">
                                        <button className="btn btn-block">Type Sport:  {statisticData?.typeSport}</button>
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
                            {achievement && (
                                <div className="collapse-content">
                                    <div className="grid grid-cols-3 mt-2">
                                        {achievement.slice(0, 3).map((achievement, index) => (
                                            <button
                                                key={index}
                                                className={`btn btn-active btn-sm overflow-hidden ${achievement.status === true ? 'btn-success ' : 'btn-error '} me-2 text-xs`
                                                }
                                                onClick={() => handleDetailAchievement(achievement.id)}
                                            >
                                                {achievement.status === true && (<span className="hidden sm:block  "><GiAchievement fontSize={'20px'} className="text-success-content" /></span>)}
                                                {achievement.name} {achievement.index}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-3 mt-2">
                                        {achievement.slice(3, 6).map((achievement, index) => (
                                            <button
                                                key={index}
                                                className={`btn btn-active btn-sm overflow-hidden ${achievement.status === true ? 'btn-success' : 'btn-error'} me-2 text-xs`}
                                                onClick={() => handleDetailAchievement(achievement.id)}
                                            >
                                                {achievement.status === true && (<span className="hidden sm:block"><GiAchievement fontSize={'20px'} /></span>)}
                                                {achievement.name} {achievement.index}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-3 mt-2">
                                        {achievement.slice(6, 9).map((achievement, index) => (
                                            <button key={index} className={`btn btn-active btn-sm overflow-hidden ${achievement.status === true ? 'btn-success' : 'btn-error'} me-2 text-xs`}
                                                onClick={() => handleDetailAchievement(achievement.id)}>
                                                {achievement.status === true && (<span className="hidden sm:block"><GiAchievement fontSize={'20px'} /></span>)}
                                                {achievement.name} {achievement.index}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-3 mt-2">
                                        {achievement.slice(9, 12).map((achievement, index) => (
                                            <button key={index} className={`btn btn-active btn-sm overflow-hidden ${achievement.status === true ? 'btn-success' : 'btn-error'} me-2 text-xs`}
                                                onClick={() => handleDetailAchievement(achievement.id)}>
                                                {achievement.status === true && (<span className="hidden sm:block"><GiAchievement fontSize={'20px'} /></span>)}
                                                {achievement.name} {achievement.index}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-3 mt-2">
                                        {achievement.slice(12, 15).map((achievement, index) => (
                                            <button key={index} className={`btn btn-active btn-sm overflow-hidden ${achievement.status === true ? 'btn-success' : 'btn-error'} me-2 text-xs`}
                                                onClick={() => handleDetailAchievement(achievement.id)}>
                                                {achievement.status === true && (<span className="hidden sm:block"><GiAchievement fontSize={'20px'} /></span>)}
                                                {achievement.name} {achievement.index}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                                <div>
                                    {membership && membership.length > 0 ? (
                                        membership.map((item, index) => (
                                            <div key={index}>
                                                <div className="card bg-accent shadow-xl text-accent-content mt-3">
                                                    <div className="card-body">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <h2 className="card-title">{item.productName}</h2>
                                                                <p>Start Date &nbsp;:  <span className="font-medium">{item.date.split(' - ')[0]} </span></p>
                                                                <p>End Date&nbsp;&nbsp;&nbsp;: <span className="font-medium">{item.date.split(' - ')[1]} </span> </p></div>
                                                            <div className="justify-self-end ">
                                                                <div className="avatar">
                                                                    <div className="w-20 rounded">
                                                                        <img src={'https://krakatausportcentrejombang.cloud/api/images/' + item.membershipKTPImagePath} />
                                                                        {/* <img src={'http://localhost:2000/api/images/' + item.membershipKTPImagePath} /> */}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="card-actions justify-end">
                                                            <button className="btn btn-primary cursor-default">Active</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No membership yet...</p>
                                    )}
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
                                        <button
                                            className="btn btn-primary min-w-full"
                                            onClick={() => document.getElementById('shopAvatarModal').showModal()}>
                                            Avatar
                                            <MdOutlineShoppingCart />
                                        </button>

                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-primary min-w-full"
                                            onClick={() => document.getElementById('shopThemeModal').showModal()}>
                                            Theme
                                            <MdOutlineShoppingCart />
                                        </button>

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow bg-neutral mt-3 mb-32">
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
                                        <button className="btn btn-primary min-w-full" onClick={() => document.getElementById('avatarModal').showModal()}>
                                            Avatar
                                            <span className="bg-neutral rounded-full">
                                                <AvatarIcon avatar={userData.activeAvatar} fontSize={"32px"} className="text-neutral-content p-1" />
                                            </span>
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            className="btn btn-primary min-w-full"
                                            onClick={() => document.getElementById('themeModal').showModal()}>Theme
                                            <div className="text-2xl bg-neutral rounded-full">
                                                {userData.activeTheme === 'Light' ? (
                                                    <span>☀️</span>
                                                ) : userData.activeTheme === 'Autumn' ? (
                                                    <span>🍂</span>
                                                ) : userData.activeTheme === 'Lemonade' ? (
                                                    <span>🍋</span>
                                                ) : userData.activeTheme === 'Winter' ? (
                                                    <span>🏂</span>
                                                ) : userData.activeTheme === 'Dark' ? (
                                                    <span>🌑</span>
                                                ) : userData.activeTheme === 'Halloween' ? (
                                                    <span>🎃</span>
                                                ) : userData.activeTheme === 'Forest' ? (
                                                    <span>🌲</span>
                                                ) : userData.activeTheme === 'Coffee' ? (
                                                    <span>☕</span>
                                                ) : userData.activeTheme === 'Dracula' ? (
                                                    <span>🦇</span>
                                                ) : userData.activeTheme === 'Aqua' ? (
                                                    <span>💧</span>
                                                ) : userData.activeTheme === 'Nord' ? (
                                                    <span>🗻</span>
                                                ) : userData.activeTheme === 'Sunset' ? (
                                                    <span>🌇</span>
                                                ) : (
                                                    <span>xxx</span>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 mt-2 gap-1">
                                    <div>
                                        <button className="btn btn-primary min-w-full " onClick={() => handleNavigateJournal('/journal')}>Journal <FaRegMap />
                                        </button>

                                    </div>
                                    <div>
                                        <button className="btn btn-primary min-w-full " onClick={handleLogout}>Log Out <IoMdLogOut /></button>

                                    </div>

                                </div>
                            </div>
                        </div >
                    </div >


                </>
            ) : (
                <div className="flex justify-center items-center h-screen  ">
                    <div>
                        <p className="text-base font-mono">Loading...</p>
                    </div>
                </div>
            )}

            <dialog id="achievementModal" className="modal">
                {achievementDetail ? (
                    <>
                        <div className="modal-box bg-neutral text-neutral-content">
                            <div className="grid grid-cols-5">
                                <div className="col-span-4  flex items-center">
                                    <p className="text-sm">{achievementDetail.description}</p>

                                </div>
                                <div className="flex justify-center">
                                    {achievementDetail.status ?
                                        <IoIosCheckmarkCircle color="green" fontSize={'30px'} />
                                        : <IoIosCloseCircle color="red" fontSize={'30px'} />
                                    }
                                </div>
                            </div>

                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>Close</button>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="modal-box bg-neutral text-neutral-content skeleton">
                        </div>
                    </>
                )}

            </dialog>

            <dialog id="shopAvatarModal" className="modal">
                <div className="modal-box bg-neutral text-neutral-content">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Avatar Store</h3>
                    <div className="grid grid-cols-4 gap-2 mt-3">
                        {avatarItem && (
                            avatarItem.map((item, index) => (
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
                                            <div>
                                                <AvatarIcon avatar={item.icon} fontSize={"50px"} className="text-neutral" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border">
                                        <p className="text-xs font-semibold truncate">{item.title}</p>
                                        <div className="grid grid-cols-2">
                                            <div className="grid content-center">
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
                            ))
                        )}
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
                <div className="modal-box bg-neutral text-neutral-content">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Theme Store</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {themeItemShop && (
                            themeItemShop.map((item, index) => (
                                <div
                                    key={index}
                                    className={`${item.status === 'non-active' ? 'cursor-pointer' : ''}`}
                                    onClick={() => {
                                        if (item.status === 'non-active') {
                                            handleDetailTheme(item.id)
                                        }
                                    }}>
                                    <div className="bg-neutral-content rounded-t-lg grid grid-rows-1 place-items-center h-20">
                                        <div className="text-5xl">
                                            <div>
                                                {item.icon}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border">
                                        <p className="text-sm font-semibold truncate">{item.title}</p>
                                        <div className="grid grid-cols-2">
                                            <div className="grid content-center">
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
                            ))
                        )}

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
                    {avatarDetail && (
                        <>
                            <h3 className="font-bold text-lg">Buy Avatar {avatarDetail.name} </h3>
                            <div className="grid grid-cols-2 gap-1 mt-3">
                                <button
                                    className={`btn btn-primary  ${loadingStatus ? 'btn-disabled skeleton' : ''}`}
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
                            {checkXp && <p className="text-error mt-2">{`You don't have enough XP`}</p>}
                        </>
                    )}
                </div>
            </dialog >

            <dialog id="buyThemeConfirmation" className="modal">
                <div className="modal-box bg-neutral text-neutral-content">
                    {themeDetail && (
                        <>
                            <h3 className="font-bold text-lg">Buy  {themeDetail.name} Theme {themeDetail.title} </h3>
                            <div className="grid grid-cols-2 gap-1 mt-3">
                                <button
                                    className={`btn btn-primary  ${loadingStatus ? 'btn-disabled skeleton' : ''}`}
                                    onClick={() => handleBuyTheme(themeDetail.name, themeDetail.xp)}

                                >XP {themeDetail.xp} Points</button>
                                <button
                                    className="btn"
                                    onClick={() => {
                                        document.getElementById('buyThemeConfirmation').close();
                                        document.querySelector('html').setAttribute('data-theme', userData.activeTheme.toLocaleLowerCase());
                                        setCheckXp(false)
                                    }}>
                                    Cancel
                                </button>
                            </div>
                            {checkXp && <p className="text-error mt-2">{`You don't have enough XP`}</p>}
                        </>
                    )}

                </div>
            </dialog>

            <dialog id="avatarModal" className="modal">
                <div className="modal-box bg-neutral text-neutral-content">
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                            onClick={handleCancelPreviewAvatar}>✕
                        </button>
                    </form>
                    <h3 className="font-bold text-lg">Change Avatar</h3>
                    <div className="grid grid-cols-4 gap-2 mt-3">
                        {avatarItemSetting && (
                            <>
                                {avatarItemSetting
                                    .filter(item => item.status === 'active')
                                    .map((item, index) => (
                                        <div
                                            key={index}
                                            className={`${item.status === 'active' ? 'cursor-pointer' : ''}`}
                                            onClick={() => {
                                                if (item.status === 'active') {
                                                    handlePreviewAvatar(item.id)
                                                }
                                            }}
                                        >
                                            <div className="bg-neutral-content rounded-t-lg grid grid-rows-1 place-items-center h-20">
                                                <div className="">
                                                    <div>
                                                        <AvatarIcon avatar={item.icon} fontSize={"50px"} className="text-neutral" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border">
                                                <p className={`text-sm font-semibold truncate ${item.preview === 'active' ? 'text-primary' : ''}`}>{item.title}</p>
                                            </div>
                                        </div>
                                    ))}
                            </>
                        )}

                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn"
                                onClick={handleCancelPreviewAvatar}
                            >Cancel</button>

                            <button
                                className="btn btn-primary mx-3 w-20"
                                onClick={handleSetAsActiveAvatar}
                            >Save</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="themeModal" className="modal ">
                <div className="modal-box bg-neutral text-neutral-content ">
                    <h3 className="font-bold text-lg ">Change Theme</h3>
                    <div className="grid grid-cols-3 gap-2 mt-3">
                        {themeItem && (
                            <>
                                {themeItem
                                    .filter(item => item.status === 'active')
                                    .map((item, index) => (
                                        <div
                                            key={index}
                                            className={`${item.status === 'active' ? 'cursor-pointer' : ''}`}
                                            onClick={() => {
                                                if (item.status === 'active') {
                                                    handlePreviewTheme(item.id)
                                                }
                                            }}
                                        >
                                            <div className="bg-neutral-content rounded-t-lg grid grid-rows-1 place-items-center h-20">
                                                <div className="">
                                                    <div className="text-5xl">
                                                        {item.icon}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border">
                                                <p className={`text-sm font-semibold truncate ${item.preview === 'active' ? 'text-primary' : ''}`}>{item.title}</p>
                                            </div>
                                        </div>
                                    ))}
                            </>
                        )}
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn"
                                onClick={handleCancelPreviewTheme}>Cancel</button>

                            <button
                                className="btn btn-primary mx-3 w-20"
                                onClick={handleSetAsActiveTheme}
                            >Save</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <Navbar />
        </>
    );
}