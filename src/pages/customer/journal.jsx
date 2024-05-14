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
            <div className="mx-10 mt-5 mb-10">
                {arrJournals.length === 0 ? (
                    <p>No journal yet...</p>
                ) : (
                    arrJournals.map((payment, index) => (
                        <div key={index}>
                            {/* Your existing JSX code for rendering each journal */}
                        </div>
                    ))
                )}
            </div>



            <Navbar />

        </>
    );
}