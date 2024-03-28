import Navbar from "../../components/navbar";
import { useState, useEffect } from 'react'
import useRefreshToken from "../../hooks/useRefreshToken";
import Dummy from '../../assets/dummyImage.png';
import Avatar1 from '../../assets/avatar/avatar1.webp';
import Header from '../../components/header.jsx';

export default function Journal() {

    const [journals, setJournals] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:2000/journals");
            const data = await response.json();
            setJournals(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Journal'} />
            </div>
            <div className="mx-10 mt-5">
                <div className="card shadow-xl image-full bg-neutral">
                    <figure><img src={Dummy} className="w-full sm:hidden" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-neutral-content">sport ?</h2>
                        <p className="text-neutral-content">date ?</p>
                        <p className="text-neutral-content">time ?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">+ ? pts</button>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>

            </div >



            <Navbar />

        </>
    );
}