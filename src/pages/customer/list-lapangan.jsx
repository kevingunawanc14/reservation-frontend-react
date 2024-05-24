import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header.jsx';
import { useState, useEffect } from 'react'
import { IoMdLock } from "react-icons/io";
import axios from '../../api/axios';
import { IoArrowBackOutline } from "react-icons/io5";
import { IoMdUnlock } from "react-icons/io";


export default function ListGor() {

    const token = localStorage.getItem('token');

    const currentUrl = window.location.href;

    const navigate = useNavigate();

    const [courtData, setCourtData] = useState(null)

    const [courtName, setCourtName] = useState(null)

    const [lapangan, setLapangan] = useState('Lapangan')

    const [userData, setUserData] = useState(null);

    const handleDetailLapangan = (id) => {
        const path = `/product/lapangan/${courtName.toLowerCase()}/${id}`;
        navigate(path);
    };

    const handleDetailFasilitas = (id) => {
        const path = `/product/fasilitas/${courtName.toLowerCase()}/${id}`;
        navigate(path);
    };

    const handleDetailRating = (id) => {
        const path = `/product/rating/${courtName.toLowerCase()}/${id}`;
        navigate(path);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const getDataProduct = async () => {
        try {

            const response = await axios.get('/product', {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });
            const filteredArray = response.data.filter(item => item.name.toLowerCase().includes(currentUrl.split('/').pop()));
            setCourtData(filteredArray)
        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');

        }
    };

    const getDataDetailUser = async () => {
        try {
            const username = localStorage.getItem('username');

            const response = await axios.get(`/user/detail/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const responseData = response.data;
            console.log('responseData', responseData)
            setUserData({
                username: responseData.username,
                rank: responseData.rank,
                xp: responseData.experiencePoint,
                hp: responseData.healthPoint,
                coin: responseData.digitalCoin
            });

            document.querySelector('html').setAttribute('data-theme', responseData.activeTheme.toLocaleLowerCase());


        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');

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
        getDataDetailUser();
    }, []);


    return (
        <>
            <div className="mx-10 mt-5">
                <div className="grid grid-cols-6 gap-4">
                    <div className='justify-self-center self-center'>
                        <button className="btn btn-primary btn-sm " onClick={handleBack}> <IoArrowBackOutline fontSize="20px" /></button>
                    </div>
                    <div className='col-span-5 self-center '>
                        <Header title={'List ' + lapangan + " " + courtName} className={'text-xl font-semibold'} />

                    </div>
                </div>

            </div>

            <div className="mx-10 mt-5 mb-5">
                {courtData && userData ? (
                    <>
                        {courtData.map(item => (
                            <div key={item.id} className="card sm:card-side shadow-xl bg-neutral mt-5">

                                <figure><img src={item.imagePath} alt="" className="w-full h-64 sm:min-w-[400px]" /></figure>

                                <div className="card-body">
                                    {item.gor !== 0 && <h2 className="card-title text-neutral-content">Gor {item.gor}</h2>}
                                    <p className='text-neutral-content'>{item.name} </p>

                                    <p className='text-neutral-content'>Rp. {item.price}</p>

                                    {userData.xp >= 100 ? (
                                        <div className="justify-start">
                                            <div className="cursor-pointer">
                                                <button
                                                    className="btn btn-sm btn-secondary"
                                                    onClick={() => handleDetailRating(item.id)}>
                                                    View Rating
                                                    <div className='ms-[-4px]'>
                                                        <IoMdUnlock />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="justify-start">
                                            <div className="tooltip tooltip-right tooltip-secondary " data-tip="Reach Rank Platinum ">
                                                <button
                                                    className="btn btn-sm btn-secondary cursor-default"

                                                >
                                                    View Rating
                                                    <div className='ms-[-4px]'>
                                                        <IoMdLock />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    )}


                                    {item.gor !== 0 ? (
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150" onClick={() => handleDetailLapangan(item.id)}>Detail</button>

                                        </div>
                                    ) : (
                                        <div className="card-actions justify-end">
                                            <button className="btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-150" onClick={() => handleDetailFasilitas(item.id)}>Detail</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className="flex justify-center items-center h-screen  ">
                        <div>
                            <p className="text-base font-mono">Loading...</p>
                        </div>
                    </div>
                )}

            </div>





        </>
    );
}