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

export default function DetailLapangan() {

    const [valueCalendar, setValueCalendar] = useState(dayjs())
    const [scheduleData, setScheduleData] = useState(null)
    const [namaProduct, setNamaProduct] = useState(null)
    const currentUrl = window.location.href;
    const idProduct = currentUrl.split('/').pop()
    const navigate = useNavigate();

    const hours = [
        '6.00-7.00', '7.00-8.00', '8.00-9.00',
        '9.00-10.00', '10.00-11.00', '11.00-12.00',
        '12.00-13.00', '13.00-14.00', '14.00-15.00',
        '15.00-16.00', '16.00-17.00', '17.00-18.00',
        '18.00-19.00', '19.00-20.00', '20.00-21.00',
        '21.00-22.00', '22.00-23.00', '23.00-24.00'
    ];

    const renderButtons = () => {
        return hours.map(hour => {
            const isReserved = scheduleData.some(data => data.hour === hour);

            const buttonClass = isReserved ? 'btn btn-xs btn-error' : 'btn btn-xs btn-success';
            return (
                <div className="grid" key={hour}>
                    <button className={buttonClass}>{hour}</button>
                </div>
            );
        });
    };


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
                console.log('item.idProduct', item.idProduct);
                console.log('idProduct', idProduct);
                return itemDate.isSame(valueCalendar, 'day') && item.idProduct === parseInt(idProduct);  // Check if day matches today
            });
            console.log('filteredArray', filteredArray);

            setScheduleData(filteredArray)
        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

        }
    };

    useEffect(() => {
        if (idProduct == 3) {
            setNamaProduct('Lapangan Badminton 1')
        }
        getDataOrder();
    }, [valueCalendar]);

    console.log('valueCalendar', valueCalendar);


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
                        {scheduleData && renderButtons()}
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
                    <div className="grid grid-cols-6 gap-4 mt-5 justify-items-center">
                        <div className='col-span-3'>
                            <p className='font-semibold'>18.00 - 19.00</p>

                        </div>
                        <div className='col-span-2'>
                            <p>35.000</p>
                        </div>
                        <div className='col-span-1'>
                            <button className="btn btn-error btn-circle btn-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className="divider"></div>




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
                                    <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked />
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
                                <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked />
                            </label>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow border border-base-300 bg-base-200">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                            Show QRIS
                        </div>
                        <div className="collapse-content">
                            <img src={pool} alt="" />
                            <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                        </div>
                    </div>
                    <div className="grid grid-cols-8">
                        <div className='self-center'>
                            <RiCopperCoinLine
                                fontSize="20px"
                            />
                        </div>
                        <div className='col-span-7'>
                            <label className="label cursor-pointer">
                                <span className="label-text">Krakatau Coin</span>
                                <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked />
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
                                <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked />
                            </label>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow border border-base-300 bg-base-200">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                            Rewards
                        </div>
                        <div className="collapse-content">
                            <p>mapping list rewards</p>
                        </div>
                    </div>
                </div>

            </div>


            <div className="flex justify-center mb-20 mx-5 mt-5">
                <button className="btn btn-primary btn-block">Place Order</button>
            </div>


            <Navbar />

        </>
    );
}

{/* <p>dynamic ... jam lapangan basket</p>
<p>dana tanam pohon</p>
<p>payment details</p>
<p>select dropdown pembayaran tunai,qr</p>
<p>gift</p>
<p>see grab for inspiration</p> */}