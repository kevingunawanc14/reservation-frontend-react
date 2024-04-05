import Navbar from "../../components/navbar";
import { useState, useEffect } from 'react'
import Header from '../../components/header.jsx';
import { GiRank2 } from "react-icons/gi";
import { FaHandHoldingHeart } from "react-icons/fa";
import { LuSword } from "react-icons/lu";
import { IoShieldOutline } from "react-icons/io5";

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
                    <figure><img src={null} className="w-full sm:hidden" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-neutral-content underline ">Basketball 🏀</h2>
                        <p className="text-neutral-content">4/4/2024</p>
                        <ul className="text-neutral-content list-disc">
                            {/* <li>6.00 - 7.00</li>
                            <li>7.00 - 8.00</li>
                            <li>8.00 - 9.00</li>
                            <li>9.00 - 10.00</li>
                            <li>10.00 - 11.00</li>
                            <li>11.00 - 12.00</li>
                            <li>12.00 - 13.00</li>
                            <li>13.00 - 14.00</li>
                            <li>14.00 - 15.00</li>
                            <li>15.00 - 16.00</li>
                            <li>16.00 - 17.00</li>
                            <li>17.00 - 18.00</li>
                            <li>18.00 - 19.00</li>
                            <li>19.00 - 20.00</li>
                            <li>20.00 - 21.00</li>
                            <li>21.00 - 22.00</li>
                            <li>22.00 - 23.00</li>
                            <li>23.00 - 24.00</li> */}
                        </ul>

                        <div className="">
                            <div className="grid grid-cols-2 gap-2">
                                <button className="btn btn-primary"> <GiRank2 fontSize={"20px"} />
                                    +10</button>
                                <button className="btn btn-accent"><FaHandHoldingHeart fontSize={"20px"} />
                                    +10</button>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-2">
                                <button className="btn btn-secondary"><LuSword />+10</button>
                                <button className="btn btn-secondary"><IoShieldOutline />
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