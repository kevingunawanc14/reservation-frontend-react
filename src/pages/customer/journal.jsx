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

import axios from 'axios';

export default function Journal() {

    const [arrJournals, setArrJournals] = useState([]);
    const username = localStorage.getItem('username');

    const getData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:2000/user', {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            console.log('responsex', response);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getDataJournal = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:2000/journal/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            console.log('response', response);
            console.log('response', response.data);

            setArrJournals(response.data)


        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getDataJournal()
    }, []);

    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Journal'} />
            </div>
            <div className="mx-10 mt-5 mb-10 ">
                {arrJournals.map((payment, index) => (
                    <div key={index}>
                        <div className="card shadow-xl image-full bg-neutral">
                            {/* <figure><img src={null} className="w-full sm:hidden" alt="Shoes" /></figure> */}
                            <div className="card-body">
                                {/* <h2 className="card-title text-neutral-content  ">Basketball 🏀</h2> */}
                                <div className="grid grid-cols-2 ">
                                    <div>
                                        <p className="">{payment.typeBreath}  in {payment.minuteBreath} min</p>
                                        <p className="font-bold">
                                            {payment.productName.includes("Badminton") ? "Badminton" :
                                                payment.productName.includes("Basketball") ? "Basketball" :
                                                    payment.productName.includes("Futsal") ? "Futsal" : "Unknown"}
                                        </p>
                                        <p className="text-neutral-content">{payment.date}</p>
                                    </div>
                                    <div className="place-self-center">
                                        <div className="col-span-2 sm:col-span-1 place-self-c ">
                                            <div className="rounded-full bg-neutral-content  p-1 w-10">
                                                {payment.typeBreath === "Normal Breath" ? (
                                                    <GiWalk fontSize={"30px"} className="text-neutral" />
                                                ) : payment.typeBreath === "Medium Breath" ? (
                                                    <GiRun fontSize={"30px"} className="text-neutral" />
                                                ) : payment.typeBreath === "Hard Breath" ? (
                                                    <GiSprint fontSize={"30px"} className="text-neutral" />
                                                ) : null}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="">
                                    <div className="grid grid-cols-2 gap-2">
                                        <button className="btn btn-primary btn-sm cursor-default"> <GiRank2 fontSize={"20px"} />
                                            +{payment.totalXp}</button>
                                        <button className="btn btn-accent btn-sm cursor-default"><FaHandHoldingHeart fontSize={"20px"} />
                                            + {payment.totalHp}</button>

                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        <button className="btn btn-secondary  btn-sm cursor-default"><LuSword />
                                            +{payment.totalAttack}</button>
                                        <button className="btn btn-secondary  btn-sm cursor-default"><IoShieldOutline />
                                            +{payment.totalDefense}</button>
                                    </div>



                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                    </div>
                ))}


            </div >



            <Navbar />

        </>
    );
}