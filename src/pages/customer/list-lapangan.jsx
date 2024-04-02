import { useNavigate } from 'react-router-dom';
import Header from '../../components/header.jsx';
import { useState, useEffect } from 'react'
import { IoMdLock } from "react-icons/io";
import axios from 'axios';
import { IoArrowBackOutline } from "react-icons/io5";


export default function ListGor() {

    const currentUrl = window.location.href;

    const navigate = useNavigate();

    const [courtData, setCourtData] = useState([])

    const [courtName, setCourtName] = useState(null)

    const [lapangan, setLapangan] = useState('Lapangan')

    const handleDetailLapangan = (id) => {
        const path = `/product/${courtName.toLowerCase()}/${id}`;
        localStorage.setItem('detailPath', `/product/${courtName.toLowerCase()}`);
        navigate(path);
    };

    const handleBack = () => {
        navigate('/');
    };

    const getDataProduct = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:2000/product', {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });
            const filteredArray = response.data.filter(item => item.name.toLowerCase().includes(currentUrl.split('/').pop()));
            setCourtData(filteredArray)
        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

        }
    };

    useEffect(() => {
        setCourtName(currentUrl.split('/').pop().charAt(0).toUpperCase() + currentUrl.split('/').pop().slice(1));
        if (currentUrl.split('/').pop() === 'renang') {
            setLapangan('Kolam')
        } else if (currentUrl.split('/').pop() === 'membership' || currentUrl.split('/').pop() === 'gym') {
            setLapangan('')
        }
        getDataProduct();
    }, []);


    return (
        <>
            <div className="mx-10 mt-5">
                <div className="grid grid-cols-6 gap-4">
                    <div className='justify-self-center self-center'>
                        <button className="btn btn-primary btn-sm " onClick={handleBack}> <IoArrowBackOutline fontSize="20px" /></button>
                    </div>
                    <div className='col-span-5 self-center '>
                        <Header title={'List ' + lapangan + " " + courtName} />

                    </div>
                </div>

            </div>

            <div className="mx-10 mt-5 mb-5">
                {courtData.map(item => (
                    <div key={item.id} className="card lg:card-side bg-neutral shadow-xl mt-5">
                        {item.name.includes('Membership') ? (
                            item.name.includes('Membership Renang') ? (
                                <figure><img src={item.imagePath} alt="" className="w-full h-[30vh] lg:h-fit" /></figure>
                            ) : (
                                <figure><img src={item.imagePath} alt="" className="w-full h-[30vh] lg:h-fit" /></figure>
                            )
                        ) : (
                            <figure><img src={item.imagePath} alt="" className="w-full h-[30vh] lg:h-fit" /></figure>
                        )}
                        <div className="card-body">
                            {item.gor !== 0 && <h2 className="card-title text-neutral-content">Gor {item.gor}</h2>}
                            <p className='text-neutral-content'>{item.name} </p>
                            {item.name === '½ lapangan basket' ? (
                                <p className='text-neutral-content'>Rp. {item.price} / Orang</p>
                            ) : item.name.includes('Membership') ? (
                                <p className='text-neutral-content'>Rp. {item.price} / Bulan</p>
                            ) : (
                                <p className='text-neutral-content'>Rp. {item.price} / Jam</p>
                            )}
                            <div className="justify-start">
                                <div className="tooltip tooltip-right tooltip-secondary" data-tip="Reach Rank ? ">
                                    <button className="btn btn-sm btn-secondary">
                                        View Rating
                                        <div className='ms-[-4px]'>
                                            <IoMdLock />
                                        </div>
                                    </button>
                                </div>
                                {/* <button className="btn btn-primary text-neutral-content btn-sm">View Rating</button> */}
                                {/* <div className="rating flex justify-start ms-1 mt-2 hidden">
                                    <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                    <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
                                </div>
                                <p className='ms-1 mt-2 '>Reach rank ? to view rating </p> */}
                            </div>

                            <div className="card-actions justify-end">
                                <button className="btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-150 " onClick={() => handleDetailLapangan(item.id)}>Detail</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>





        </>
    );
}