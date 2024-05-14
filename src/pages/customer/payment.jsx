import Navbar from "../../components/navbar";
import Header from '../../components/header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import Alert from '@mui/material/Alert';
import { BsQrCode } from "react-icons/bs";
import { FaSackDollar } from "react-icons/fa6";
import { CiCoins1 } from "react-icons/ci";
import { RiCopperCoinLine } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";

export default function Payment() {

    const navigate = useNavigate();
    const [arrPayment, setArrPayment] = useState([]);
    const [orderStatus, setOrderStatus] = useState(null);
    const [detailOrder, setDetailOrder] = useState(null)
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const handleDetailRating = (idPayment, idProduct) => {
        const path = `/product/give-rating/${idPayment}/${idProduct}`;
        localStorage.setItem('detailPath', `/payment`);
        navigate(path);
    };


    const getDataPayment = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:2000/payment/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            console.log('response', response);
            console.log('response', response.data);

            setArrPayment(response.data)


        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDetailJamOrder = async (id) => {
        try {
            const response = await axios.get(`http://localhost:2000/order/detail/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log('response', response);
            setDetailOrder(response.data)



        } catch (error) {
            console.log('error:', error);
        }
    }

    useEffect(() => {
        if (detailOrder) {
            document.getElementById('detailJamOrderModal').showModal();
            console.log(detailOrder.length > 1)
            console.log(detailOrder[0].hour)


        }
    }, [detailOrder]);

    useEffect(() => {
        const fromOrder = localStorage.getItem('fromOrder');
        if (fromOrder === 'true') {
            setOrderStatus('success');
            setTimeout(() => {
                setOrderStatus(null);
            }, 2000);
            localStorage.setItem('fromOrder', 'false');
        }



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
                {arrPayment.length === 0 ? (
                    <p>No payment yet...</p>
                ) : (
                    arrPayment.map((payment, index) => (
                        <div key={index}>
                            <div className="card mb-3 flex justify-center shadow-xl bg-neutral">
                                <div className="card-body">
                                    <p className="text-neutral-content">{payment.productName}</p>
                                    <div className="grid grid-cols-2">
                                        <div className="grid content-center">
                                            <p className="text-neutral-content font-bold">Rp. {payment.totalPrice}</p>
                                        </div>
                                        <div className="grid content-center">
                                            <div className="rounded-lg bg-neutral-content tooltip-info p-1 w-10 tooltip tooltip-right text-neutral cursor-pointer" data-tip={payment.paymentMethod === "krakataucoin" ? "Paid by krakatau coin" : ("Paid by " + payment.paymentMethod)}>
                                                {payment.paymentMethod === 'qris' && (
                                                    <BsQrCode fontSize="19px" className="text-neutral w-full" />
                                                )}
                                                {payment.paymentMethod === 'cash' && (
                                                    <FaSackDollar fontSize="19px" className="text-neutral w-full" />
                                                )}
                                                {payment.paymentMethod === 'krakataucoin' && (
                                                    <RiCopperCoinLine fontSize="19px" className="text-neutral w-full" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-neutral-content">{payment.date.split(' - ')[0]}</p>
                                    <div className="grid grid-cols-1">
                                        <button className="btn btn-info btn-sm " onClick={() => handleDetailJamOrder(payment.connectHistory)}>
                                            Detail
                                            <TbListDetails fontSize="20px" className="text-neutral" />
                                        </button>
                                    </div>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary  " onClick={() => handleDetailRating(payment.id, payment.idProduct)}>Rate</button>
                                        <button className="btn btn-primary btn-wide">{payment.paymentStatus}</button>
                                    </div>
                                </div>
                            </div>
                            <div className="divider"></div>
                        </div>
                    ))
                )}

            </div>

            <dialog id="detailJamOrderModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Detail Order</h3>
                    {detailOrder && (
                        <>
                            <div>
                                {/* Check if the date string contains a hyphen */}
                                {detailOrder[0].date.split('-').length > 3 ? (
                                    // If it contains a hyphen, display start and end dates separately
                                    <>
                                        <p className='text-lg'>Start date: <span className="font-semibold">{detailOrder[0].date.split(' - ')[0]}</span></p>
                                        <p className='text-lg'>End date:  <span className="font-semibold">{detailOrder[0].date.split(' - ')[1]}</span></p>
                                    </>
                                ) : (
                                    // If it doesn't contain a hyphen, display the date as is
                                    <p className='text-lg'>Tanggal : {detailOrder[0].date}</p>
                                )}
                            </div>
                            {detailOrder[0].hour && (
                                <>
                                    <p className='text-lg'>Jam: </p>
                                    {detailOrder.map((item, index) => (
                                        <div key={index}>
                                            <div className="grid grid-cols-2 sm:grid-cols-4">
                                                <div>
                                                    <p className='text-lg font-semibold'>
                                                        {item.hour}

                                                    </p>
                                                </div>
                                                <div>
                                                    {(() => {
                                                        const hour = parseFloat(item.hour.split("-")[0]);
                                                        if (hour >= 6 && hour < 15) {
                                                            return <span>🏙️</span>;
                                                        } else if (hour >= 15 && hour < 17) {
                                                            return <span>🌇</span>;
                                                        } else {
                                                            return <span>🌆</span>;
                                                        }
                                                    })()}
                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </>
                            )}

                        </>
                    )}

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <Navbar />
        </>
    );
}