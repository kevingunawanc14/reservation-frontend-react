import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import Navbar from '../../components/navbar.jsx';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import { BsCash } from "react-icons/bs";
import { BsQrCode } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RiCopperCoinLine } from "react-icons/ri";
import pool from '../../assets/pool.webp';
import { useForm } from "react-hook-form";

export default function DetailLapangan() {

    const [valueCalendar, setValueCalendar] = useState(dayjs())
    const [scheduleData, setScheduleData] = useState(null)
    const [namaProduct, setNamaProduct] = useState(null)
    const currentUrl = window.location.href;
    const idProduct = currentUrl.split('/').pop()
    const navigate = useNavigate();
    const [arrOfOrderSummary, setArrOfOrderSummary] = useState([]);
    const [statusAllowPlaceOrder, setStatusAllowPlaceOrder] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [productPrice, setProductPrice] = useState(35000);
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            paymentMethod: "cash",
        }
    });

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

    const resetHoursWithStatus = () => {
        const updatedHoursWithStatus = hoursWithStatus.map(() => 'free');
        setHoursWithStatus(updatedHoursWithStatus);
    };

    const renderButtons = (hoursWithStatus, setHoursWithStatus, arrOfReserved) => {
        // Create a copy of hoursWithStatus to update
        const updatedStatus = [...hoursWithStatus];
        console.log('updatedStatus', updatedStatus);

        // Update the status for reserved hours
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
                    addToOrderSummary(hour); // Call the function to add hour to arrOfOrderSummary
                }}>{hour}</button>;
            } else if (updatedStatus[index] === 'reserved') {
                button = <button className="btn btn-xs btn-error" onClick={() => document.getElementById('my_modal_2').showModal()}>{hour}</button>;
            } else if (updatedStatus[index] === 'info') {
                button = <button className="btn btn-xs btn-info" onClick={() => {
                    const newStatus = [...updatedStatus];
                    newStatus[index] = 'free';
                    setHoursWithStatus(newStatus);
                    removeFromOrderSummary(hour); // Call the function to remove hour from arrOfOrderSummary
                }}>{hour}</button>;
            }

            return (
                <div className="grid" key={hour}>
                    {button}
                </div>
            );
        });
    };

    function addToOrderSummary(hour) {
        // Assuming arrOfOrderSummary is a state variable
        setArrOfOrderSummary(prevState => [...prevState, hour]);

    }

    function removeFromOrderSummary(hour) {
        const index = hours.indexOf(hour)

        // Update hoursWithStatus[index] to 'success'
        const newStatus = [...hoursWithStatus];
        newStatus[index] = 'free';
        setHoursWithStatus(newStatus);

        // Remove hour from arrOfOrderSummary
        setArrOfOrderSummary(prevState => prevState.filter(item => item !== hour));

    }

    function formatNumberWithDot(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const handleBack = () => {
        const detailPath = localStorage.getItem('detailPath');
        if (detailPath) {
            navigate(`${detailPath}`);
        } else {
            navigate('/');
        }
    };

    const shouldDisableDate = (date) => {

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const selectedDate = new Date(date);

        // Disable dates before yesterday
        if (selectedDate < yesterday) {
            return true;
        }

        // Disable dates two weeks after today
        if (selectedDate > new Date(today.getTime() + 13 * 24 * 60 * 60 * 1000)) {
            return true;
        }

        // Enable other dates
        return false;
    };

    const getDataOrder = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:2000/order', {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            const filteredArray = response.data.filter(item => {
                const itemDate = dayjs(item.createdAt);  // Convert item.createdAt to dayjs object
                return itemDate.isSame(valueCalendar, 'day') && item.idProduct === parseInt(idProduct);  // Check if day matches today
            });

            setScheduleData(filteredArray)
            resetHoursWithStatus();
            setArrOfOrderSummary([]);
        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

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

    const [showRewards, setShowRewards] = useState(false);

    const handleRadioClickRewards = (value) => {
        if (!value) {
            setShowRewards(true);
        } else {
            setShowRewards(false);
        }

        console.log('value', value);
    };

    const handleOrder = async () => {
        console.log('handle Order');
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:2000/order', {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });


        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

        }
    }

    useEffect(() => {
        if (idProduct == 3) {
            setNamaProduct('Lapangan Badminton 1')
        }
        // console.log('valueCalendar', valueCalendar);
        // console.log('scheduleData', scheduleData);
        getDataOrder();
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
                />
            </LocalizationProvider>

            <div className="mx-5 mt-[-10px]">
                <div className="mx-5 mt-[-10px]">
                    <div className="grid grid-cols-3 gap-4">
                        {scheduleData && renderButtons(hoursWithStatus, setHoursWithStatus, scheduleData)}
                    </div>
                </div>
            </div>

            {/* <div className='mx-5'>
                <div className="divider"></div>
            </div> */}

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
                                        <p>35.000</p> {/* Assuming this value is static */}
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
                                    <p className=''>Rp{formatNumberWithDot(productPrice * arrOfOrderSummary.length)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className='justify-self-start'>
                                    Total
                                </div>
                                <div className='justify-self-end'>
                                    <p className='font-bold'>Rp{formatNumberWithDot((productPrice * arrOfOrderSummary.length) - 1000)}</p>
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
                        <div className="collapse collapse-arrow border border-base-300 bg-neutral">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium text-neutral-content">
                                Show QRIS
                            </div>
                            <div className="collapse-content">
                                <img src={pool} alt="" className='w-full' />
                                <input
                                    {...register("filePaymentProve", { required: true })}
                                    type="file"
                                    className="file-input file-input-bordered w-full max-w-xs mt-3"
                                />
                            </div>
                        </div>
                    )}
                    <div className="grid grid-cols-8">
                        <div className='self-center'>
                            <RiCopperCoinLine
                                fontSize="20px"
                            />
                        </div>
                        <div className='col-span-7'>
                            <label className="label cursor-pointer">
                                <span className="label-text">67.000</span>
                                <input
                                    {...register("paymentMethod")}
                                    value="krakataucoin"
                                    type="radio"
                                    className="radio radio-primary"
                                    onClick={() => handleRadioClickPayment('Krakatau Coin')}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-8">
                        <div className='self-center'>
                            <MdOutlineLocalOffer
                                fontSize="20px"
                            />
                        </div>
                        <div className='col-span-7'>
                            <label className="label cursor-pointer">
                                <span className="label-text">Use Rewards to get discounts</span>
                                <input
                                    type="checkbox"
                                    name="radio-11"
                                    className="radio radio-primary"
                                    onClick={() => handleRadioClickRewards(showRewards)}
                                />
                            </label>
                        </div>
                    </div>
                    {showRewards && (
                        <div className="collapse collapse-arrow border border-base-300 bg-neutral">
                            <input type="checkbox" />
                            <div className="collapse-title text-xl font-medium text-neutral-content">
                                Rewards
                            </div>
                            <div className="collapse-content">
                                <p className='text-neutral-content'>You don't have any reward yet</p>
                            </div>
                        </div>
                    )}
                </div>

            </div>


            <div className="flex justify-center mb-20 mx-5 mt-5">
                {watch("paymentMethod") === 'cash' || watch("paymentMethod") === 'krakataucoin' ? (
                    <button className={`btn btn-primary btn-block ${arrOfOrderSummary.length > 0 ? '' : 'btn-disabled'}`} >Place Order</button>

                ) : (
                    <button className={`btn btn-primary btn-block ${arrOfOrderSummary.length > 0 && watch('filePaymentProve')?.length > 0 ? '' : 'btn-disabled'}`} >Place Order</button>

                )}
            </div>

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Already Booked</h3>
                    {/* <p className="py-4">Already Booked</p> */}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>


        </>
    );
}

{/* <p>dynamic ... jam lapangan basket</p>
<p>dana tanam pohon</p>
<p>payment details</p>
<p>select dropdown pembayaran tunai,qr</p>
<p>gift</p>
<p>see grab for inspiration</p> */}