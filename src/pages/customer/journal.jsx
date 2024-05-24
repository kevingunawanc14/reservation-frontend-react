import Navbar from "../../components/navbar";
import { useState, useEffect } from 'react'
import Header from '../../components/header.jsx';
import { GiRank2 } from "react-icons/gi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { LuSword } from "react-icons/lu";
import { IoShieldOutline } from "react-icons/io5";
import { GiRun } from "react-icons/gi";
import { GiWalk } from "react-icons/gi";
import { GiSprint } from "react-icons/gi";
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';


export default function Journal() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [arrJournals, setArrJournals] = useState(null);
    const username = localStorage.getItem('username');

    const [totalPoint, setTotalPoint] = useState(0);
    const [jenisPoint, setJenisPoint] = useState('');

    const getDataDetailUser = async () => {
        try {
            const token = localStorage.getItem('token');

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


    const getDataJournal = async () => {
        try {

            const response = await axios.get(`/journal/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            setArrJournals(response.data)


        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }

    const handleDetailPoint = (totalPoint, jenisPoint) => {
        document.getElementById('my_modal_5').showModal()
        setTotalPoint(totalPoint);
        setJenisPoint(jenisPoint);
    }

    useEffect(() => {
        getDataJournal()
        getDataDetailUser()
    }, []);

    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Journal'} />
            </div>
            <div className="mx-10 mt-5 mb-10">
                {arrJournals ? (
                    <>
                        {arrJournals.length === 0 ? (
                            <p>No journal yet...</p>
                        ) : (
                            <div className=" ">
                                {arrJournals.map((payment, index) => (
                                    <div key={index}>
                                        <div className="card shadow-xl image-full bg-neutral">
                                            <div className="card-body">
                                                <div className="grid grid-cols-2 ">
                                                    <div>
                                                        {payment.typeBreath ?
                                                            (payment.typeBreath.charAt(0).toUpperCase() + payment.typeBreath.slice(1)) :
                                                            ''} breath in {payment.minuteBreath} min
                                                        <p className="font-bold">
                                                            {payment.productName.includes("Badminton") ? "Badminton" :
                                                                payment.productName.includes("Basket") ? "Basketball" :
                                                                    payment.productName.includes("Futsal") ? "Futsal" : "Unknown"}
                                                        </p>
                                                        <p className="text-neutral-content">{payment.date}</p>
                                                    </div>
                                                    <div className="place-self-center">
                                                        <div className="col-span-2 sm:col-span-1 place-self-c ">
                                                            <div className="rounded-full bg-neutral-content  p-1 w-10">
                                                                {payment.typeBreath === "normal" ? (
                                                                    <GiWalk fontSize={"30px"} className="text-neutral" />
                                                                ) : payment.typeBreath === "medium" ? (
                                                                    <GiRun fontSize={"30px"} className="text-neutral" />
                                                                ) : payment.typeBreath === "high" ? (
                                                                    <GiSprint fontSize={"30px"} className="text-neutral" />
                                                                ) : null}
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <button className="btn btn-primary btn-sm cursor-pointer" onClick={() => handleDetailPoint(payment.totalXp, 'Experience Point')}> <GiRank2 fontSize={"20px"} />
                                                            +{payment.totalXp}</button>
                                                        <button className="btn btn-accent btn-sm cursor-pointer" onClick={() => handleDetailPoint(payment.totalHp, 'Health Point')}><FaHandHoldingHeart fontSize={"20px"} />
                                                            + {payment.totalHp}</button>

                                                    </div>

                                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                                        <button className="btn btn-secondary  btn-sm cursor-pointer" onClick={() => handleDetailPoint(payment.totalAttack, 'Attack Attempt')}><LuSword />
                                                            +{payment.totalAttack}</button>
                                                        <button className="btn btn-secondary  btn-sm cursor-pointer" onClick={() => handleDetailPoint(payment.totalDefense, 'Shield Point')}><IoShieldOutline />
                                                            +{payment.totalDefense}</button>
                                                    </div>



                                                </div>
                                            </div>
                                        </div>
                                        <div className="divider"></div>
                                    </div>
                                ))}


                            </div >
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



            <Navbar />

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-primary-content">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4 font-medium">You grab +{totalPoint} {jenisPoint}</p>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </>
    );
}