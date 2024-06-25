import { useEffect, useState } from 'react';
import Header from '../../components/header.jsx';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from '../../api/axios';
import { BsCash } from "react-icons/bs";
import { BsQrCode } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { LuSword } from "react-icons/lu";
import { IoShieldOutline } from "react-icons/io5";
import { BsTrophy } from "react-icons/bs";
import { LuHeartPulse } from "react-icons/lu";
import { FaWalking } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { GiRank2 } from "react-icons/gi";
import { TbUpload } from "react-icons/tb";
import { IoIosAlert } from "react-icons/io";
import qris from '../../assets/QRIS_KRAKATAU.png';
import { IoPeopleOutline } from "react-icons/io5";


export default function DetailFasilitas() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const currentUrl = window.location.href;
    const idProduct = currentUrl.split('/').pop()
    const navigate = useNavigate();

    const [valueCalendar, setValueCalendar] = useState(dayjs())
    const [breathStatus, setBreathStatus] = useState('normal');

    const [namaProduct, setNamaProduct] = useState(null)
    const [productPrice, setProductPrice] = useState(0);

    const [arrOfOrderSummary, setArrOfOrderSummary] = useState([]);

    const { register, handleSubmit, setValue, watch, formState: { errors }, resetField } = useForm({
        defaultValues: {
            paymentMethod: "cash",
            breathStatus: "normal"
        }
    });

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

        }
    };

    const [loadingStatus, setLoadingStatus] = useState(null);


    const handleRadioBreathStatus = (status) => {
        setBreathStatus(status);
    };

    function formatNumberWithDot(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


    const handleBack = () => {
        navigate(-1);
    };

    const [showQr, setShowQr] = useState(false);

    const handleRadioClickPayment = (value) => {
        if (value === 'QRIS') {
            setShowQr(true);
        } else {
            setShowQr(false);
            resetField("filePaymentProve")
        }
    };


    const handleOrder = async () => {

        const formData = new FormData();

        if (['16', '17', '20'].includes(idProduct)) {
            formData.append('jumlahOrang', watch("jumlahOrang"));
        }

        if (watch("paymentMethod") === 'qris') {
            formData.append('filePaymentProve', watch("filePaymentProve")[0]);
        }

        if (watch("subscriptionType") === 'membership') {
            formData.append('foto', watch("foto")[0]);
        }


        const dataToSend = {
            idProduct: idProduct,
            username: username,
            price: productPrice,
            date: `${arrOfOrderSummary[0].startDate} - ${arrOfOrderSummary[0].endDate}`,
            detailDate: valueCalendar.format('YYYY-MM-DD HH:mm:ss'),
            hour: null,
            paymentStatus:
                watch("paymentMethod") === 'cash' ? 'Belum dibayar' :
                    watch("paymentMethod") === 'krakataucoin' ? 'Lunas' :
                        watch("paymentMethod") === 'qris' ? 'Sedang diverifikasi' :
                            undefined,
            paymentMethod: watch("paymentMethod"),
            note: "",
            totalPrice: ['16', '17', '20'].includes(idProduct) ? (productPrice * arrOfOrderSummary.length * watch("jumlahOrang")) : (productPrice * arrOfOrderSummary.length),
            typeBreath: watch("breathStatus"),
            minuteBreath: (arrOfOrderSummary.length * 60),
            totalXp: Math.floor(productPrice * arrOfOrderSummary.length / 10000),
            totalHp: watch("breathStatus") === 'normal' ? Math.floor((Math.random() * 5) + 5) : watch("breathStatus") === 'medium' ? Math.floor((Math.random() * 10) + 10) : watch("breathStatus") === 'high' ? Math.floor((Math.random() * 10) + 20) : undefined,
            totalAttack: 1,
            totalDefense: 1,
            connectHistory: crypto.randomUUID(),
            cancelId: crypto.randomUUID(),
            productName: namaProduct,
            createdAtDate: dayjs().format('YYYY-MM-DD'),
            createdAtDateFull: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            subscriptionType: watch("subscriptionType")
        };

        Object.keys(dataToSend).forEach(key => {
            formData.append(key, dataToSend[key]);
        });
        console.log('dataToSend.hour', dataToSend.hour);
        for (let pair of formData.entries()) {
            console.log(pair[0] + ':', pair[1]);
        }

        try {
            setLoadingStatus(true)

            // const formDataNotification = {
            //     _subject: "New Order!",
            //     Product: namaProduct,
            //     Note: watch("subscriptionType"),
            // };

            // const responseNotification = await axios.post('https://formsubmit.co/ajax/sisteminformasikevin@gmail.com', formDataNotification);

            // console.log('responseNotification', responseNotification);

            const response = await axios.post('/order', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            setLoadingStatus(false)


            localStorage.setItem('lastPage', 'order');


            navigate('/payment');
        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');

        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);

        if (idProduct == 20) {
            setNamaProduct('Gym')
            setValue("productType", 'gym');
            setValue("subscriptionType", 'daily');
            const newOrderSummary = {
                price: 25000,
                startDate: `${dayjs().format('YYYY-MM-DD')}`,
                endDate: `${dayjs().format('YYYY-MM-DD')}`,
                name: 'Detail Gym'
            };
            setProductPrice(25000)
            setArrOfOrderSummary(prevState => [...prevState, newOrderSummary]);

        } else if (idProduct == 21) {
            setNamaProduct('Membership Gym')
            setValue("productType", 'gym');
            setValue("subscriptionType", 'membership');
            const newOrderSummary = {
                price: 170000,
                startDate: `${dayjs().format('YYYY-MM-DD')}`,
                endDate: `${dayjs().add(1, 'month').format('YYYY-MM-DD')}`,
                name: 'Gym'
            };
            setProductPrice(170000)
            setArrOfOrderSummary(prevState => [...prevState, newOrderSummary]);
        } else if (idProduct == 16) {
            setNamaProduct('Kolam Renang Anak')
            setValue("productType", 'poolKid');
            setValue("subscriptionType", 'daily');
            const newOrderSummary = {
                price: 25000,
                startDate: `${dayjs().format('YYYY-MM-DD')}`,
                endDate: `${dayjs().format('YYYY-MM-DD')}`,
                name: 'Gym'
            };
            setProductPrice(25000)
            setArrOfOrderSummary(prevState => [...prevState, newOrderSummary]);

        } else if (idProduct == 17) {
            setNamaProduct('Kolam Renang Dewasa')
            setValue("productType", 'poolAdult');
            setValue("subscriptionType", 'daily');
            const newOrderSummary = {
                price: 35000,
                startDate: `${dayjs().format('YYYY-MM-DD')}`,
                endDate: `${dayjs().format('YYYY-MM-DD')}`,
                name: 'Gym'
            };
            setProductPrice(35000)

            setArrOfOrderSummary(prevState => [...prevState, newOrderSummary]);

        } else if (idProduct == 18) {
            setNamaProduct('Membership Renang Dewasa')
            setValue("productType", 'poolAdult');
            setValue("subscriptionType", 'membership');
            const newOrderSummary = {
                price: 220000,
                startDate: `${dayjs().format('YYYY-MM-DD')}`,
                endDate: `${dayjs().add(1, 'month').format('YYYY-MM-DD')}`,
                name: 'Gym'
            };
            setProductPrice(220000)

            setArrOfOrderSummary(prevState => [...prevState, newOrderSummary]);

        } else if (idProduct == 19) {
            setNamaProduct('Membership Renang Anak')
            setValue("productType", 'poolKid');
            setValue("subscriptionType", 'membership');
            const newOrderSummary = {
                price: 180000,
                startDate: `${dayjs().format('YYYY-MM-DD')}`,
                endDate: `${dayjs().add(1, 'month').format('YYYY-MM-DD')}`,
                name: 'Gym'
            };
            setProductPrice(180000)

            setArrOfOrderSummary(prevState => [...prevState, newOrderSummary]);

        }

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

            <div className='my-10'>
                <div className='grid grid-rows-2 gap-4'>
                    <div className='flex justify-center sm:mx-0 mx-5'>
                        <select
                            className="select select-bordered w-full max-w-xs " disabled
                            {...register("productType")} >
                            <option disabled >What kind of product ?</option>
                            <option value={'gym'}>Gym</option>
                            <option value={'poolKid'}>Kolam Renang Anak</option>
                            <option value={'poolAdult'}>Kolam Renang Dewasa</option>

                        </select>
                    </div>
                    <div className='flex justify-center sm:mx-0 mx-5'>
                        <select
                            className="select select-bordered w-full max-w-xs" disabled
                            {...register("subscriptionType")} >
                            <option disabled >Type</option>
                            <option value={'daily'}>Daily</option>
                            <option value={'membership'}>Membership / Monthly</option>
                        </select>
                    </div>

                </div>


            </div>

            <div className="">
                <Header
                    title={'Order Summary'}
                    className={'text-center mt-5 text-xl font-semibold py-2 bg-primary text-primary-content'}
                />

                <div className='mx-5'>
                    {arrOfOrderSummary.length === 0 ? (
                        <span className="loading loading-dots loading-lg"></span>
                    ) : (
                        arrOfOrderSummary.map((orderSummary, index) => (
                            <div key={index}>
                                <div className="grid grid-cols-6 gap-4 mt-5 justify-items-center">
                                    <div className='col-span-4'>
                                        <p className='font-semibold '>Start date : {orderSummary.startDate}</p>
                                        <p className='font-semibold '>End date <span className='invisible'>x</span>: {orderSummary.endDate}</p>
                                    </div>
                                    <div className='col-span-2 flex items-center'>
                                        <p>{orderSummary.price}</p>
                                    </div>

                                </div>
                                <div className="divider"></div>

                            </div>
                        ))

                    )}
                    {arrOfOrderSummary.length > 0 && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div className='justify-self-start'>
                                    Total
                                </div>
                                <div className='justify-self-end'>
                                    {['16', '17', '20'].includes(idProduct) ? (
                                        <>
                                            <p className='font-bold'>
                                                Rp{formatNumberWithDot((productPrice * arrOfOrderSummary.length *
                                                    (watch('jumlahOrang') > 0 && watch('jumlahOrang') <= 10 ? watch('jumlahOrang') : 0)))}
                                            </p>


                                        </>
                                    ) : (
                                        <p className='font-bold'>
                                            Rp{formatNumberWithDot((productPrice * arrOfOrderSummary.length))}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>

            <div className="">
                <Header
                    title={'Payment Details'}
                    className={'text-center mt-5 text-xl font-semibold py-2 bg-primary text-primary-content'}
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
                            <div className="collapse collapse-arrow border border-base-300 bg-neutral justify-self-center collapse-open ">
                                <input type="checkbox" />
                                <div className="collapse-content grid ">
                                    <div className='justify-self-center '>
                                        <img src={qris} alt="" className=' ' />
                                        <div className="grid grid-cols-12 ">
                                            <input
                                                {...register("filePaymentProve", { required: true })}
                                                type="file"
                                                className="file-input file-input-bordered w-full mt-3 col-span-11"
                                            />

                                            {!watch('filePaymentProve')?.length > 0 && (
                                                <div className='animate-bounce place-self-center mt-3 ms-3'>
                                                    <IoIosAlert color='red' size={25} />
                                                </div>
                                            )}


                                        </div>
                                        {watch('filePaymentProve')?.length > 0 && (
                                            <>
                                                {!['jpg', 'jpeg', 'png'].includes(watch("filePaymentProve")[0].name.split('.').pop().toLowerCase()) && (
                                                    <p className="text-red-500 text-sm text-center">Invalid file type. Please select a JPG, JPEG, or PNG file</p>
                                                )}
                                                {watch("filePaymentProve")[0].size > 1024 * 1024 * 5 && (
                                                    <p className="text-red-500 text-sm text-center">File size exceeds limit (5 MB). Please select a smaller file</p>
                                                )}
                                            </>
                                        )}

                                    </div>

                                </div>

                            </div>
                        </div>

                    )}
                    {['16', '17', '20'].includes(idProduct) && (
                        <>
                            <div className="grid grid-cols-9">
                                <div className='self-center'>
                                    <IoPeopleOutline
                                        fontSize="20px"
                                    />
                                </div>
                                <div className='col-span-7'>
                                    <label className="label cursor-pointer">
                                        <input
                                            {...register("jumlahOrang", { required: "This field is required" })}
                                            type="number"
                                            className="input input-bordered w-full"
                                            placeholder="jumlah orang ?"
                                        />
                                    </label>

                                </div>

                                {watch('jumlahOrang') == '' && (
                                    <div className='animate-bounce place-self-center mt-3 ms-3'> <IoIosAlert color='red' size={25} /></div>
                                )}

                            </div>

                            {watch('jumlahOrang') != '' && watch('jumlahOrang') < 1 && <p className="text-red-500 text-sm text-center">{'Minimum number of people 1'}</p>}
                            {watch('jumlahOrang') > 10 && <p className="text-red-500 text-sm text-center">{'Maximal number of people 10'}</p>}
                        </>
                    )}
                </div>

            </div>



            {watch("subscriptionType") === 'membership' && (
                <>
                    <div className="">
                        <Header
                            title={'Foto KTP / Selfie '}
                            className={'text-center mt-5 text-xl font-semibold py-2 bg-primary text-primary-content'}
                        />
                        <div className='mx-5'>
                            <div className="form-control">
                                <div className="grid grid-cols-9">
                                    <div className='self-center'>
                                        <TbUpload
                                            fontSize="20px"
                                        />

                                    </div>
                                    <div className='col-span-7'>
                                        <label className="label cursor-pointer">
                                            <input
                                                {...register("foto")}
                                                type="file"
                                                className="file-input file-input-bordered w-full mt-3 col-span-11"
                                            />
                                        </label>
                                    </div>
                                    {!watch('foto')?.length > 0 && (
                                        <div className='animate-bounce place-self-center mt-3 ms-3'> <IoIosAlert color='red' size={25} /></div>
                                    )}

                                </div>
                                {watch('foto')?.length > 0 && (
                                    <>
                                        {!['jpg', 'jpeg', 'png'].includes(watch("foto")[0].name.split('.').pop().toLowerCase()) && (
                                            <p className="text-red-500 text-sm text-center">Invalid file type. Please select a JPG, JPEG, or PNG file</p>
                                        )}
                                        {watch("foto")[0].size > 1024 * 1024 * 5 && (
                                            <p className="text-red-500 text-sm text-center">File size exceeds limit (5 MB). Please select a smaller file</p>
                                        )}
                                    </>
                                )}

                            </div>
                        </div>

                    </div>
                </>
            )}

            <div className="flex justify-center  mx-5 mt-5">
                {watch("subscriptionType") === 'membership' ? (
                    watch("paymentMethod") === 'cash' && watch('foto')?.length > 0
                        && ['jpg', 'jpeg', 'png'].includes(watch("foto")[0].name.split('.').pop().toLowerCase()) && watch("foto")[0].size < 1024 * 1024 * 5
                        ? (
                            <button className={`btn btn-primary btn-block ${arrOfOrderSummary.length > 0 ? '' : 'btn-disabled'} ${loadingStatus ? 'btn-disabled skeleton' : ''}`} onClick={handleOrder}> {loadingStatus ? 'Processing' : 'Place Order'}</button>

                        ) : (
                            <button className={`btn btn-primary btn-block ${arrOfOrderSummary.length > 0 && watch('filePaymentProve')?.length > 0 && watch('foto')?.length > 0
                                && ['jpg', 'jpeg', 'png'].includes(watch("filePaymentProve")[0].name.split('.').pop().toLowerCase()) && watch("filePaymentProve")[0].size < 1024 * 1024 * 5
                                && ['jpg', 'jpeg', 'png'].includes(watch("foto")[0].name.split('.').pop().toLowerCase()) && watch("foto")[0].size < 1024 * 1024 * 5
                                ?
                                '' : 'btn-disabled'} ${loadingStatus ? 'btn-disabled skeleton' : ''}`} onClick={handleOrder} > {loadingStatus ? 'Processing' : 'Place Order'}</button>

                        )

                ) : (
                    watch("paymentMethod") === 'cash' && watch('jumlahOrang') != '' && watch('jumlahOrang') > 0 && watch('jumlahOrang') <= 10 ? (
                        <button className={`btn btn-primary btn-block ${arrOfOrderSummary.length > 0 ? '' : 'btn-disabled'} ${loadingStatus ? 'btn-disabled skeleton' : ''}`} onClick={handleOrder}> {loadingStatus ? 'Processing' : 'Place Order'}</button>

                    ) : (
                        <button className={`btn btn-primary btn-block ${arrOfOrderSummary.length > 0 && watch('filePaymentProve')?.length > 0
                            && ['jpg', 'jpeg', 'png'].includes(watch("filePaymentProve")[0].name.split('.').pop().toLowerCase()) && watch("filePaymentProve")[0].size < 1024 * 1024 * 5 && watch('jumlahOrang') != '' && watch('jumlahOrang') > 0 && watch('jumlahOrang') <= 10
                            ? '' : 'btn-disabled'} ${loadingStatus ? 'btn-disabled skeleton' : ''}`} onClick={handleOrder} > {loadingStatus ? 'Processing' : 'Place Order'}</button>

                    )
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

        </>
    );
}

