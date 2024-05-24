import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from '../../api/axios';
import { BsCash } from "react-icons/bs";
import { BsQrCode } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RiCopperCoinLine } from "react-icons/ri";
import qris from '../../assets/QRIS_KRAKATAU.png';
import { useForm } from "react-hook-form";
import { LuSword } from "react-icons/lu";
import { IoShieldOutline } from "react-icons/io5";
import { BsTrophy } from "react-icons/bs";
import { LuHeartPulse } from "react-icons/lu";
import { FaWalking } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { GiRank2 } from "react-icons/gi";


export default function DetailLapangan() {

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const currentUrl = window.location.href;
    const idProduct = currentUrl.split('/').pop()
    const navigate = useNavigate();

    const [valueCalendar, setValueCalendar] = useState(dayjs())
    const [scheduleData, setScheduleData] = useState(null)

    const [namaProduct, setNamaProduct] = useState(null)
    const [productPrice, setProductPrice] = useState(0);

    const [arrOfOrderSummary, setArrOfOrderSummary] = useState([]);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            paymentMethod: "cash",
            breathStatus: "normal"
        }
    });
    const [breathStatus, setBreathStatus] = useState(null);
    const theme = document.documentElement.getAttribute("data-theme");

    const [loadingStatus, setLoadingStatus] = useState(null);

    const handleRadioBreathStatus = (status) => {
        setBreathStatus(status);
    };

    const hours = [
        '6.00-7.00', '7.00-8.00', '8.00-9.00',
        '9.00-10.00', '10.00-11.00', '11.00-12.00',
        '12.00-13.00', '13.00-14.00', '14.00-15.00',
        '15.00-16.00', '16.00-17.00', '17.00-18.00',
        '18.00-19.00', '19.00-20.00', '20.00-21.00',
        '21.00-22.00', '22.00-23.00', '23.00-24.00'
    ];

    const [hoursWithStatus, setHoursWithStatus] = useState([
        'free', 'free', 'free',
        'free', 'free', 'free',
        'free', 'free', 'free',
        'free', 'free', 'free',
        'free', 'free', 'free',
        'free', 'free', 'free'
    ]);

    const getDataDetailUser = async () => {
        try {

            const response = await axios.get(`/user/detail/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const responseData = response.data;

            document.querySelector('html').setAttribute('data-theme', responseData.activeTheme.toLocaleLowerCase());

        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login');
        }
    };

    const getProductDetail = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`/detail/${idProduct}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            setNamaProduct(response.data.nameDetail);
            const number = parseInt(response.data.priceInt);
            setProductPrice(number);

        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }

    const resetHoursWithStatus = () => {
        const updatedHoursWithStatus = hoursWithStatus.map(() => 'free');
        setHoursWithStatus(updatedHoursWithStatus);
    };

    const renderButtons = (hoursWithStatus, setHoursWithStatus, arrOfReserved) => {
        const updatedStatus = [...hoursWithStatus];

        arrOfReserved.forEach(reservation => {
            const index = hours.indexOf(reservation.hour);
            if (index !== -1) {
                updatedStatus[index] = 'reserved';
            }
        });

        // Render buttons based on the updated status
        return hours.map((hour, index) => {
            let button = null;
            if (updatedStatus[index] === 'free') {
                button = <button className="btn btn-xs btn-success" onClick={() => {
                    const newStatus = [...updatedStatus];
                    newStatus[index] = 'info';
                    setHoursWithStatus(newStatus);
                    addToOrderSummary(hour);
                }}>{hour}</button>;
            } else if (updatedStatus[index] === 'reserved') {
                button = <button className="btn btn-xs btn-error" onClick={() => document.getElementById('my_modal_2').showModal()}>{hour}</button>;
            } else if (updatedStatus[index] === 'info') {
                button = <button className="btn btn-xs btn-info" onClick={() => {
                    const newStatus = [...updatedStatus];
                    newStatus[index] = 'free';
                    setHoursWithStatus(newStatus);
                    removeFromOrderSummary(hour);
                }}>{hour}</button>;
            } else if (updatedStatus[index] === 'passed') {
                button = <button className="btn btn-xs btn-disabled">{hour}</button>;
            }

            return (
                <div className="grid" key={hour}>
                    {button}
                </div>
            );
        });
    };

    function addToOrderSummary(hour) {
        setArrOfOrderSummary(prevState => [...prevState, hour]);
    }

    function removeFromOrderSummary(hour) {
        const index = hours.indexOf(hour)

        const newStatus = [...hoursWithStatus];
        newStatus[index] = 'free';
        setHoursWithStatus(newStatus);

        setArrOfOrderSummary(prevState => prevState.filter(item => item !== hour));

    }

    function formatNumberWithDot(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handleBack = () => {
        navigate(-1);
    };

    const shouldDisableDate = (date) => {

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const selectedDate = new Date(date);

        if (selectedDate < yesterday) {
            return true;
        }

        if (selectedDate > new Date(today.getTime() + 13 * 24 * 60 * 60 * 1000)) {
            return true;
        }

        return false;
    };

    const getDataOrder = async () => {
        try {

            const response = await axios.get('/order/reserved', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const filteredArray = response.data.filter(item => {
                const itemDate = dayjs(item.date);
                return itemDate.isSame(valueCalendar, 'day') && item.idProduct === parseInt(idProduct);  // Check if day matches today
            });
            setScheduleData(filteredArray)
            resetHoursWithStatus();
            setArrOfOrderSummary([]);

            const currentTime = new Date().getHours();

            if (currentTime >= 6 && currentTime < 24 && dayjs().$D === valueCalendar.$D) {
                const updatedStatus = hoursWithStatus.map((status, index) => {
                    if (index < currentTime - 6) {
                        return 'passed';
                    } else {
                        return status;
                    }
                });
                setHoursWithStatus(updatedStatus);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');

        }
    };

    const [showQr, setShowQr] = useState(false);

    const handleRadioClickPayment = (value) => {
        if (value === 'QRIS') {
            setShowQr(true);
        } else {
            setShowQr(false);
        }
    };

    const handleOrder = async () => {
        // console.log('watch("filePaymentProve")', watch("filePaymentProve"))
        // console.log('watch("filePaymentProve")', watch("filePaymentProve")[0])
        // console.log('watch("filePaymentProve")', watch("filePaymentProve")[0].size)
        // console.log('watch("filePaymentProve")', watch("filePaymentProve")[0].type)
        // console.log('watch("filePaymentProve")', watch("filePaymentProve")[0].name)
        // console.log('watch("filePaymentProve")', watch("filePaymentProve")[0].size)
        // Create FormData and append file and data
        const formData = new FormData();

        if (watch("paymentMethod") === 'qris') {
            const allowedExtensions = ['jpg', 'jpeg', 'png'];
            const fileExtension = watch("filePaymentProve")[0].name.split('.').pop().toLowerCase();
            console.log('fileExtension', fileExtension)
            if (!allowedExtensions.includes(fileExtension)) {
                return alert('Invalid file type. Please select a JPG, JPEG, or PNG file.');
            }

            const maxFileSize = 1024 * 1024 * 5;
            console.log('maxFileSize', maxFileSize)

            if (watch("filePaymentProve")[0].size > maxFileSize) {
                return alert('File size exceeds limit (5 MB). Please select a smaller file.');
            }

            formData.append('filePaymentProve', watch("filePaymentProve")[0]);

        }

        const dataToSend = {
            idProduct: idProduct,
            username: username,
            price: productPrice,
            date: valueCalendar.format('YYYY-MM-DD'),
            detailDate: valueCalendar.format('YYYY-MM-DD HH:mm:ss'),
            hour: arrOfOrderSummary,
            paymentStatus:
                watch("paymentMethod") === 'cash' ? 'Belum dibayar' :
                    watch("paymentMethod") === 'krakataucoin' ? 'Lunas' :
                        watch("paymentMethod") === 'qris' ? 'Sedang diverifikasi' :
                            undefined,
            paymentMethod: watch("paymentMethod"),
            totalPrice: (productPrice * arrOfOrderSummary.length),
            typeBreath: watch("breathStatus"),
            minuteBreath: (arrOfOrderSummary.length * 60),
            totalXp: Math.floor(productPrice * arrOfOrderSummary.length / 10000),
            totalHp: watch("breathStatus") === 'normal' ? Math.floor((Math.random() * 5) + 5) : watch("breathStatus") === 'medium' ? Math.floor((Math.random() * 10) + 10) : watch("breathStatus") === 'high' ? Math.floor((Math.random() * 10) + 20) : undefined,
            totalAttack: 1,
            totalDefense: 1,
            connectHistory: crypto.randomUUID(),
            cancelId: crypto.randomUUID(),
        };


        // Append each key-value pair from dataToSend to formData
        Object.keys(dataToSend).forEach(key => {
            formData.append(key, dataToSend[key]);
        });
        console.log('dataToSend.hour', dataToSend.hour);
        // Log the FormData content
        for (let pair of formData.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }
        try {
            setLoadingStatus(true)

            const response = await axios.post('/order', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('response', response);
            console.log('response.data', response.data);
            setLoadingStatus(false)

                localStorage.setItem('lastPage', 'order');  // Set lastPage to 'order'

            navigate('/payment');

        } catch (error) {
            console.error('Error fetching data:', error);
            console.error('Error fetching data:', error.response.data.status);
            if (error.response.data.status === 'fail') {
                alert(error.response.data.message)
            } else {
                localStorage.removeItem('token');
                navigate('/login');
            }


        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getDataOrder();
        getProductDetail();
        getDataDetailUser();
    }, [valueCalendar]);

    return (
        <>
            <div className="mx-10 mt-5">
                <div className="grid grid-cols-6 gap-4">
                    <div className='justify-self-center self-center'>
                        <button className="btn btn-primary btn-sm " onClick={handleBack}> <IoArrowBackOutline fontSize="20px" /></button>

                    </div>
                    <div className='col-span-5  '>
                        <Header
                            title={namaProduct}
                            className={'text-xl font-semibold'}
                        />
                    </div>
                </div>

            </div>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={valueCalendar}
                    onChange={(newValue) => setValueCalendar(newValue)}
                    shouldDisableDate={shouldDisableDate}
                    sx={{
                        "& .MuiButtonBase-root": {
                            color: theme === 'light'
                                || theme === 'autumn'
                                || theme === 'lemonade'
                                || theme === 'winter' ? 'black' : 'white',
                        },
                        "& .MuiButtonBase-root.Mui-disabled": {
                            color: theme === 'light'
                                || theme === 'autumn'
                                || theme === 'lemonade'
                                || theme === 'winter' ? '' : '#94a3b8',
                        },
                        "& .MuiTypography-root": {
                            color: theme === 'light'
                                || theme === 'autumn'
                                || theme === 'lemonade'
                                || theme === 'winter' ? '' : '#64748b',
                        }
                    }}
                />
            </LocalizationProvider>

            <div className="mx-5 mt-[-10px]">
                <div className="grid grid-cols-3 gap-4">
                    {scheduleData ?
                        renderButtons(hoursWithStatus, setHoursWithStatus, scheduleData) :
                        <>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">6.00-7.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">7.00-8.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">8.00-9.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">9.00-10.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">10.00-11.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">11.00-12.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">12.00-13.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">13.00-14.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">14.00-15.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">15.00-16.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">16.00-17.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">17.00-18.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">18.00-19.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">19.00-20.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">20.00-21.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">21.00-22.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">22.00-23.00</button>
                            </div>
                            <div className="grid">
                                <button className="btn btn-xs btn-disabled skeleton">23.00-24.00</button>
                            </div>
                        </>
                    }

                </div>
            </div>

            <div className="">
                <Header
                    title={'Order Summary'}
                    className={'text-center mt-5 text-xl font-semibold bg-primary-content py-2'}
                />
                <div className='mx-5'>
                    {arrOfOrderSummary.length === 0 ? (
                        <p className='text-center font-semibold mt-3'>Pick the time you want easily</p>
                    ) : (
                        arrOfOrderSummary.map((hour, index) => (
                            <div key={index}>
                                <div className="grid grid-cols-6 gap-4 mt-5 justify-items-center">
                                    <div className='col-span-3'>
                                        <p className='font-semibold'>{hour}</p>
                                    </div>
                                    <div className='col-span-2'>
                                        <p>{productPrice}</p>
                                    </div>
                                    <div className='col-span-1'>
                                        <button className="btn btn-error btn-circle btn-sm " onClick={() => removeFromOrderSummary(hour)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="divider"></div>

                            </div>
                        ))

                    )}


                    {arrOfOrderSummary.length > 0 && (
                        <>
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div className='justify-self-start'>
                                    Subtotal
                                </div>
                                <div className='justify-self-end'>
                                    <p className=''>Rp{formatNumberWithDot((productPrice * arrOfOrderSummary.length))}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className='justify-self-start'>
                                    Total
                                </div>
                                <div className='justify-self-end'>
                                    <p className='font-bold'>Rp{formatNumberWithDot((productPrice * arrOfOrderSummary.length))}</p>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>

            <div className="">
                <Header
                    title={'Payment Details'}
                    className={'text-center mt-5 text-xl font-semibold bg-primary-content py-2'}
                />
                <div className='mx-5'>
                    <div className="form-control">
                        <div className="grid grid-cols-8">
                            <div className='self-center'>
                                <BsCash
                                    fontSize="20px"
                                />
                            </div>
                            <div className='col-span-7'>
                                <label className="label cursor-pointer">
                                    <span className="label-text">Cash</span>
                                    <input
                                        {...register("paymentMethod")}
                                        value="cash"
                                        type="radio"
                                        className="radio radio-primary"
                                        onClick={() => handleRadioClickPayment('Cash')}
                                    />
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className="grid grid-cols-8">
                        <div className='self-center'>
                            <BsQrCode
                                fontSize="20px"
                            />
                        </div>
                        <div className='col-span-7'>
                            <label className="label cursor-pointer">
                                <span className="label-text">QRIS</span>
                                <input
                                    {...register("paymentMethod")}
                                    value="qris"
                                    type="radio"
                                    className="radio radio-primary"
                                    onClick={() => handleRadioClickPayment('QRIS')}
                                />
                            </label>
                        </div>
                    </div>
                    {showQr && (
                        <div className=''>
                            <div className="collapse collapse-arrow border border-base-300 bg-neutral justify-self-center ">
                                <input type="checkbox" />
                                <div className="collapse-title text-xl font-medium text-neutral-content">
                                    Show QRIS
                                </div>
                                <div className="collapse-content grid ">
                                    <div className='justify-self-center '>
                                        <img src={qris} alt="" className=' ' />
                                        <input
                                            {...register("filePaymentProve", { required: true })}
                                            type="file"
                                            className="file-input file-input-bordered w-full mt-3"
                                        />

                                    </div>

                                </div>

                            </div>
                        </div>

                    )}
                </div>

            </div>


            <div className="flex justify-center  mx-5 mt-5">
                {watch("paymentMethod") === 'cash' ? (
                    <button className={`btn btn-primary btn-block ${arrOfOrderSummary.length > 0 ? '' : 'btn-disabled'} ${loadingStatus ? 'btn-disabled skeleton' : ''}`} onClick={handleOrder}>
                        {loadingStatus ? 'Processing' : 'Place Order'}
                    </button>

                ) : (
                    <button className={`btn btn-primary btn-block ${arrOfOrderSummary.length > 0 && watch('filePaymentProve')?.length > 0 ? '' : 'btn-disabled'} ${loadingStatus ? 'btn-disabled skeleton' : ''}`} onClick={handleOrder} > {loadingStatus ? 'Processing' : 'Place Order'}</button>

                )}
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
                                <p className='col-span-2' ><FaPerson className={`${breathStatus === 'normal' ? 'animate-pulse' : ''}`} />Normal Breath <span className='text-xs font-thin'>(5 - 10 HP)</span></p>
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

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Already Booked</h3>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </>
    );
}

