import Navbar from "../../components/navbar";
import Header from '../../components/header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Alert from '@mui/material/Alert';
import { BsQrCode } from "react-icons/bs";

export default function Payment() {

    const navigate = useNavigate();
    const [arrPayment, setArrPayment] = useState([]);
    const [orderStatus, setOrderStatus] = useState(null);
    const handleDetailRating = (id) => {
        const path = `/product/give-rating/${1}`;
        localStorage.setItem('detailPath', `/payment`);
        navigate(path);
    };


    const getDataPayment = async () => {
        try {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');

            const response = await axios.get(`http://localhost:2000/payment/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            console.log('response', response);
            setArrPayment(response.data)
            console.log('arrPayment', arrPayment);


        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        const fromOrder = localStorage.getItem('fromOrder');
        console.log('fromOrder', fromOrder)
        if (fromOrder === 'true') {
            setOrderStatus('success');
            setTimeout(() => {
                setOrderStatus(null);
            }, 2000);
            localStorage.setItem('fromOrder', 'false');
        }

        console.log('fromOrder', fromOrder)


        getDataPayment()
    }, []);

    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Recently Transaction'} />
            </div>
            <div className="flex justify-center mt-2">
                {orderStatus === 'success' && (
                    <Alert severity="success" onClose={() => setOrderStatus(null)}>Order Successfully Added</Alert>
                )}
            </div>

            <div className="mx-10 mt-5 mb-10">
                {arrPayment.map((payment, index) => (
                    <div key={index}>
                        <div className="card mb-3 flex justify-center shadow-xl bg-neutral">
                            <div className="card-body">
                                <p className="text-neutral-content">{payment.productName}</p>
                                <div className="grid grid-cols-12">
                                    <div className="col-span-5">
                                        <p className="text-neutral-content">Rp. {payment.totalPrice}</p>

                                    </div>
                                    <div className="flex items-center justify-end tooltip tooltip-info tooltip-right" data-tip="Paid by QRIS" >
                                        <BsQrCode
                                            fontSize="19px"
                                            className="text-neutral-content"
                                        />

                                    </div>

                                </div>
                                <p className="text-neutral-content">Start date : {payment.date.split(' - ')[0]}</p>
                                <p className="text-neutral-content">End date <span className='invisible'>x</span>: {payment.date.split(' - ')[1]}</p>
                                {/* <span className="badge badge-accent">Detail</span> */}
                                <div className="card-actions justify-end">
                                    <button className="btn btn-primary " onClick={() => handleDetailRating(1)}>Rate</button>
                                    <button className="btn btn-primary ">Belum Dibayar</button>
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                    </div>
                ))}

            </div>

            <Navbar />
        </>
    );
}