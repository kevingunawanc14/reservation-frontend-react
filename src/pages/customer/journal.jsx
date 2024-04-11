import Navbar from "../../components/navbar";
import { useState, useEffect } from 'react'
import Header from '../../components/header.jsx';
import { GiRank2 } from "react-icons/gi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { LuSword } from "react-icons/lu";
import { IoShieldOutline } from "react-icons/io5";
import { GiRun } from "react-icons/gi";

export default function Journal() {

    const [journals, setJournals] = useState([])

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

    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Journal'} />
            </div>
            <div className="mx-10 mt-5">
                <div className="card shadow-xl image-full bg-neutral">
                    {/* <figure><img src={null} className="w-full sm:hidden" alt="Shoes" /></figure> */}
                    <div className="card-body">
                        {/* <h2 className="card-title text-neutral-content  ">Basketball 🏀</h2> */}
                        <div className="grid grid-cols-2 ">
                            <div>
                                <p className="">Medium breath in 33 min</p>
                                <p className="font-bold">Basketball</p>
                                <p className="text-neutral-content">4/4/2024</p>
                            </div>
                            <div className="place-self-center">
                                <div className="col-span-2 sm:col-span-1 place-self-c ">
                                    <div className="rounded-full bg-neutral-content  p-1 w-10">
                                        <GiRun fontSize={"30px"} className="text-neutral" />

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="">
                            <div className="grid grid-cols-2 gap-2">
                                <button className="btn btn-primary btn btn-sm"> <GiRank2 fontSize={"20px"} />
                                    +10</button>
                                <button className="btn btn-accent btn btn-sm"><FaHandHoldingHeart fontSize={"20px"} />
                                    +10</button>

                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <button className="btn btn-secondary btn btn-sm"><LuSword />+10</button>
                                <button className="btn btn-secondary btn btn-sm"><IoShieldOutline />
                                    +10</button>
                            </div>



                        </div>
                    </div>
                </div>
                <div className="divider"></div>

            </div >



            <Navbar />

        </>
    );
}