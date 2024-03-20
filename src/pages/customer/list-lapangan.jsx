import { useNavigate } from 'react-router-dom';
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { LiaHeartbeatSolid } from "react-icons/lia";
import { IoTrophyOutline } from "react-icons/io5";
import Header from '../../components/header.jsx';
import Navbar from '../../components/navbar.jsx';
import { useState, useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate.jsx';
import badminton from '../../assets/badminton.webp';
import basket from '../../assets/basketball.webp';
import futsal from '../../assets/futsal.webp';
import { IoMdLock } from "react-icons/io";


export default function ListGor() {

    const axiosPrivate = useAxiosPrivate();

    const currentUrl = window.location.href;

    const navigate = useNavigate();

    const [courtData, setCourtData] = useState([])

    const [courtImage, setCourtImage] = useState(null)

    const [courtName, setCourtName] = useState(null)

    const [lapangan, setLapangan] = useState('Lapangan')

    const getImageSrc = () => {
        console.log(currentUrl.split('/').pop());
        if (currentUrl.split('/').pop() == 'badminton') {
            setCourtImage(badminton)
        } else if (currentUrl.split('/').pop() == 'basket') {
            setCourtImage(basket)
        } else if (currentUrl.split('/').pop() == 'futsal') {
            setCourtImage(futsal)
        }

    };

    const handleDetailLapangan = () => {
        navigate(`/lapangan/${'x'}/detail/${1}`);
    };

    const fetchData = async () => {
        try {
            const response = await axiosPrivate.get('/courts')
            const filteredArray = response.data.filter(item => item.name.toLowerCase().includes(currentUrl.split('/').pop()));
            setCourtData(filteredArray)
            console.log(filteredArray);
        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

        }
    };

    useEffect(() => {
        getImageSrc();
        setCourtName(currentUrl.split('/').pop().charAt(0).toUpperCase() + currentUrl.split('/').pop().slice(1));
        if (currentUrl.split('/').pop() === 'renang') {
            setLapangan('Kolam')
        } else if (currentUrl.split('/').pop() === 'membership' || currentUrl.split('/').pop() === 'gym') {
            setLapangan('')
        }
        fetchData();
    }, []);


    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'List ' + lapangan + " " + courtName} />
            </div>

            <div className="mx-10 mt-5 mb-5">
                {courtData.map(item => (
                    <div key={item.id} className="card lg:card-side bg-neutral shadow-xl mt-5">
                        <figure><img src={courtImage} alt="" className="w-full h-[30vh]" /></figure>
                        <div className="card-body">
                            <h2 className="card-title text-neutral-content">Gor {item.gor}</h2>
                            <p className='text-neutral-content'>{item.name} </p>
                            {item.name === '½ lapangan basket' ? (
                                <p className='text-neutral-content'>Rp. {item.price} / Orang</p>
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
                                <button className="btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-150 " onClick={handleDetailLapangan}>Detail</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>





        </>
    );
}