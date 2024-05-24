import Navbar from "../../components/navbar";
import Header from '../../components/header';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import { BsQrCode } from "react-icons/bs";
import { FaSackDollar } from "react-icons/fa6";
import { RiCopperCoinLine } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";

export default function Payment() {

    const navigate = useNavigate();
    const [arrPayment, setArrPayment] = useState(null);
    const [pageBefore, setPageBefore] = useState(null);
    const [detailOrder, setDetailOrder] = useState(null)
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const handleDetailRating = (idPayment, idProduct) => {
        const path = `/product/give-rating/${idPayment}/${idProduct}`;
        navigate(path);
    };

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
            localStorage.removeItem('token');
            navigate('/login');


        }
    };

    const getDataPayment = async () => {
        try {

            const response = await axios.get(`/payment/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setArrPayment(response.data)

        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }

    const handleDetailJamOrder = async (id) => {
        try {
            const response = await axios.get(`/order/detail/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log('response', response);
            setDetailOrder(response.data)



        } catch (error) {
            console.log('error:', error);
            if (error.response.data.status === 'fail') {
                alert(error.response.data.message)
            } else {
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
    }

    useEffect(() => {
        if (detailOrder) {
            document.getElementById('detailJamOrderModal').showModal();
        }
    }, [detailOrder]);

    useEffect(() => {
        window.scrollTo(0, 0);

        const lastPage = localStorage.getItem('lastPage');
        if (lastPage) {
            setPageBefore(lastPage);
            localStorage.removeItem('lastPage');
        }

        setTimeout(() => {
            setPageBefore(null);
        }, 2000);

        getDataPayment()
        getDataDetailUser()
    }, []);

    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Recently Transaction'} />
            </div>
            <div className="flex justify-center mt-2">
                {pageBefore === 'order' && (
                    <Alert severity="success" onClose={() => setPageBefore(null)}>Order Successfully Added</Alert>
                )}
                {pageBefore === 'rating' && (
                    <Alert severity="success" onClose={() => setPageBefore(null)}>Rating Successfully Added</Alert>
                )}
            </div>

            <div className="mx-10 mt-5 mb-10">
                {arrPayment ? (
                    <>
                        {arrPayment.length === 0 ? (
                            <p>No payment yet...</p>
                        ) : (
                            arrPayment.map((payment, index) => (
                                <div key={index}>
                                    <div className="card mb-3 flex justify-center shadow-xl bg-neutral">
                                        <div className="card-body">
                                            <p className="text-neutral-content">{payment.fullProductName}</p>
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
                                            <div className={`grid grid-cols-1  ${payment.paymentStatus === 'Batal' && 'hidden'}`}>
                                                <button className="btn btn-info btn-sm " onClick={() => handleDetailJamOrder(payment.connectHistory)}>
                                                    Detail
                                                    <TbListDetails fontSize="20px" className="text-neutral" />
                                                </button>
                                            </div>
                                            {payment.paymentStatus === 'Lunas' ? (
                                                <div className="grid grid-cols-5  ">
                                                    <button className="btn btn-primary me-2 col-span-2 " onClick={() => handleDetailRating(payment.id, payment.idProduct)}>Rate</button>
                                                    <button className={`btn col-span-3 cursor-default
                                      ${payment.paymentStatus === 'Belum dibayar' || payment.paymentStatus === 'Batal' ? 'btn-error' :
                                                            payment.paymentStatus === 'Sedang diverifikasi' ? 'btn-warning' :
                                                                payment.paymentStatus === 'Lunas' ? 'btn-success' : 'btn-primary'}`}>{payment.paymentStatus}</button>

                                                </div>
                                            ) : (
                                                <div className="grid grid-cols-1  ">
                                                    <button className={`btn col-span-3 cursor-default
                                    ${payment.paymentStatus === 'Belum dibayar' || payment.paymentStatus === 'Batal' ? 'btn-error' :
                                                            payment.paymentStatus === 'Sedang diverifikasi' ? 'btn-warning' :
                                                                payment.paymentStatus === 'Lunas' ? 'btn-success' : 'btn-primary'}`}>{payment.paymentStatus}</button>

                                                </div>
                                            )}

                                        </div>
                                    </div>
                                    <div className="divider"></div>
                                </div>
                            ))
                        )}
                    </>
                ) : (
                    <div className="flex justify-center items-center h-screen  ">
                        <div>
                            <p className="text-base font-mono">Loading...</p>
                        </div>
                    </div>
                )}

            </div>

            <dialog id="detailJamOrderModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Detail Order</h3>
                    {detailOrder && (
                        <>
                            <div>
                                {detailOrder[0].date.split('-').length > 3 ? (
                                    <>
                                        <p className='text-lg'>Start date: <span className="font-semibold">{detailOrder[0].date.split(' - ')[0]}</span></p>
                                        <p className='text-lg'>End date:  <span className="font-semibold">{detailOrder[0].date.split(' - ')[1]}</span></p>
                                    </>
                                ) : (
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