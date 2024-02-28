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
                {/* {journals.map(journal => (
                    <div key={journal.id} className="card card-side bg-primary shadow-xl mt-5">
                        <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{journal.createdAt}</h2>
                            <p>Playing Basketball</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">+ {journal.healthPoint} pts</button>
                            </div>
                        </div>
                    </div>
                ))} */}
                <div className="card bg-neutral shadow-xl">
                    <figure ><img src="https://img.craiyon.com/2024-02-28/u6ApNHAZRw2nrm9c796Aaw.webp" className="w-full h-52" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Shoes!
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Fashion</div>
                            <div className="badge badge-outline">Products</div>
                        </div>
                    </div>
                </div>
                <div className="card bg-neutral shadow-xl">
                    <figure ><img src="https://img.craiyon.com/2024-02-28/u6ApNHAZRw2nrm9c796Aaw.webp" className="w-full" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            Shoes!
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Fashion</div>
                            <div className="badge badge-outline">Products</div>
                        </div>
                    </div>
                </div>
                {/* <div className="card shadow-xl image-full">
                    <figure><img src="https://img.craiyon.com/2024-02-28/u6ApNHAZRw2nrm9c796Aaw.webp" className="w-full" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">sport ?</h2>
                        <p>date ?</p>
                        <p>time ?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">+? pts</button>
                        </div>
                    </div>
                </div> */}

                {/* <div className="card card-side  bg-neutral shadow-xl">
                    <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">sport ?  </h2>
                        <p>2/28/2024</p>
                        <p className="text-center">20.00 </p>
                        <p className="text-center">-</p>
                        <p className="text-center">22.00</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">+? pts</button>
                        </div>
                    </div>
                </div> */}
                {/* gambar spiderman di ganti sesuai jenis sport */}
            </div >


            <Navbar />

        </>
    );
}