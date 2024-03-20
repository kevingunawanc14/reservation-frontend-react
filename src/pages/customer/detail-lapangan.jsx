import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import Navbar from '../../components/navbar.jsx';

export default function DetailLapangan() {


    // useEffect(() => {
    //     document.getElementsByClassName("my-checkbox").indeterminate = true
    // }, []);


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

    return (
        <>
            <Header
                title={'Lapangan Basket Gedung 1'}
                className={'text-center mt-5'}
            />
            {/* <h1 className="m-4 text-2xl font-bold text-black text-center">Lapangan Basket Gedung 1</h1> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    shouldDisableDate={shouldDisableDate}
                />
            </LocalizationProvider>

            <div className="mx-5 mt-[-15px]">
                <div className="grid grid-cols-3 gap-4">
                    <div className='grid'>
                        <button className="btn btn-xs btn-success">6.00-7.00</button>
                    </div>
                    <div className='grid'>
                        <button className="btn btn-xs btn-error">7.00-8.00</button>
                    </div>
                    <div className='grid'>
                        <button className="btn btn-xs">9.00-10.00</button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                    <div className='grid'>
                        <button className="btn btn-xs">10.00-11.00</button>
                    </div>
                    <div className='grid'>
                        <button className="btn btn-xs">11.00-12.00</button>
                    </div>
                    <div className='grid'>
                        <button className="btn btn-xs">12.00-13.00</button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                    <div className='grid'>
                        <button className="btn btn-xs">13.00-14.00</button>
                    </div>
                    <div className='grid'>
                        <button className="btn btn-xs">14.00-15.00</button>
                    </div>
                    <div className='grid'>
                        <button className="btn btn-xs">15.00-16.00</button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                    <div className='grid'>
                        <button className="btn btn-xs">16.00-17.00</button>
                    </div>
                    <div className='grid'>
                        <button className="btn btn-xs">17.00-18.00</button>
                    </div>
                    <div className='grid'>
                        <button className="btn btn-xs">18.00-19.00</button>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-3">
                    <div className='grid'>
                        <button className="btn btn-xs">19.00-20.00</button>
                    </div>
                    <div className='grid'>
                        <button className="btn btn-xs">20.00-21.00</button>
                    </div>
                    <div className='grid'>
                        <button className="btn btn-xs">21.00-22.00</button>
                    </div>
                </div>
            </div>

            <div className="mx-5">
                <Header
                    title={'Order Summary'}
                    className={'text-center mt-5'}
                />
                <div>
                    <p>? jam lapangan ?</p>
                    <p>Rp. ?</p>
                </div>
            </div>

            <div className="mx-5">
                <Header
                    title={'Payment Details'}
                    className={'text-center mt-5'}
                />
                <div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Tunai</span>
                            <input type="radio" name="radio-10" className="radio checked:bg-red-500" checked />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">QRIS</span>
                            <input type="radio" name="radio-10" className="radio checked:bg-blue-500" checked />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Point</span>
                            <input type="radio" name="radio-10" className="radio checked:bg-blue-500" checked />
                        </label>
                    </div>
                </div>

            </div>

            <div className="mx-5">
                <Header
                    title={'Promo'}
                    className={'text-center mt-5'}
                />
                <div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Red pill</span>
                            <input type="radio" name="radio-10" className="radio checked:bg-red-500" disabled />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer">
                            <span className="label-text">Blue pill</span>
                            <input type="radio" name="radio-10" className="radio checked:bg-blue-500" disabled />
                        </label>
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