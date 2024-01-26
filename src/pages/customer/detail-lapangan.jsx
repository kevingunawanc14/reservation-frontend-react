import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect, useState } from 'react';

export default function DetailLapangan() {


    useEffect(() => {
        document.getElementById("my-checkbox").indeterminate = true
    }, []);

    return (
        <>
            <h1 className="m-4 text-2xl font-bold text-black text-center">Lapangan Basket Gedung 1</h1>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
            </LocalizationProvider>
            <div className="grid grid-cols-3">
                <div className='grid grid-cols-3'>
                    <p className='col-span-2'>6.00-7.00</p>
                    <input type="checkbox" className="checkbox checkbox-success checkbox-xs" />
                </div>
                <div className='grid grid-cols-3'>
                    <p className='col-span-2'>7.00-8.00</p>
                    <input type="checkbox" className="checkbox checkbox-success" />
                </div>
                <div className='grid grid-cols-3'>
                    <p className='col-span-2'>9.00-10.00</p>
                    <input type="checkbox" className="checkbox checkbox-error" id="my-checkbox" disabled />
                </div>
            </div>
            <div className="grid grid-cols-3">
                <div className='grid grid-cols-3'>
                    <p className='col-span-2'>10.00-11.00</p>
                    <input type="checkbox" className="checkbox" />
                </div>
                <div className='grid grid-cols-3'>
                    <p className='col-span-2'>11.00-12.00</p>
                    <input type="checkbox" className="checkbox" />
                </div>
                <div className='grid grid-cols-3'>
                    <p className='col-span-2'>13.00-14.00</p>
                    <input type="checkbox" className="checkbox" />
                </div>
            </div>
            <div className="grid grid-cols-3">
                <div className='grid grid-cols-3'>
                    <p className='col-span-2'>14.00-15.00</p>
                    <input type="checkbox" className="checkbox" />
                </div>
                <div className='grid grid-cols-3'>
                    <p className='col-span-2'>15.00-16.00</p>
                    <input type="checkbox" className="checkbox" />
                </div>
                <div className='grid grid-cols-3'>
                    <p className='col-span-2'>17.00-18.00</p>
                    <input type="checkbox" className="checkbox" />
                </div>
            </div>
            <div className="grid grid-cols-3">
                <div className='grid grid-cols-3'>
                    <p className='col-span-2'>18.00-19.00</p>
                    <input type="checkbox" className="checkbox" />
                </div>
                <div className='grid grid-cols-3'>
                    <p className='col-span-2'>19.00-20.00</p>
                    <input type="checkbox" className="checkbox" />
                </div>
                <div className='grid grid-cols-3'>
                    <p className='col-span-2'>21.00-22.00</p>
                    <input type="checkbox" className="checkbox" />
                </div>
            </div>



            <p>order summary</p>
            <p>0 jam lapangan basket...</p>
            <p>dana tanam pohon</p>
            <p>payment details</p>
            <p>select dropdown pembayaran tunai,qr</p>
            <p>gift</p>
        </>
    );
}