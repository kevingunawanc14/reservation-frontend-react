import Navbar from "../../components/navbar";
import { useState, useEffect } from 'react'
import useRefreshToken from "../../hooks/useRefreshToken";

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
                <p className='text-2xl font-mono'>Journal</p>
            </div>
            <div className="mx-10 mt-5">
                {journals.map(journal => (
                    <div key={journal.id} className="card card-side bg-base-100 shadow-xl mt-5">
                        <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{journal.createdAt}</h2>
                            <p>Playing Basketball</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">+ {journal.healthPoint} pts</button>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">+12 pts</button>
                        </div>
                    </div>
                </div>
                {/* gambar spiderman di ganti sesuai jenis sport */}
            </div >


            <Navbar />

        </>
    );
}