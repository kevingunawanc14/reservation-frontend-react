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


export default function ListGor() {

    const axiosPrivate = useAxiosPrivate();

    const currentUrl = window.location.href;

    const navigate = useNavigate();

    const [courtImage, setCourtImage] = useState(null)

    const [courtName, setCourtName] = useState(null)

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
            const response = await axiosPrivate.get('/users')
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

        }
    };

    useEffect(() => {
        getImageSrc();
        setCourtName(currentUrl.split('/').pop().charAt(0).toUpperCase() + currentUrl.split('/').pop().slice(1));
        fetchData();
    }, []);


    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'List Lapangan ' + courtName} />
            </div>

            <div className="mx-10 mt-5 mb-5">
                <div className="card lg:card-side bg-neutral shadow-xl">
                    <figure><img src={courtImage} alt="" className="w-full" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-neutral-content">Gor nomor ?</h2>
                        <p className='text-neutral-content'>Lapangan nama ? nomor ?</p>
                        <div className="rating">
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
                        <p className='text-neutral-content'>Rp. harga ? / Jam</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-150 text-neutral-content" onClick={handleDetailLapangan}>Detail</button>
                        </div>
                    </div>
                </div>
            </div>





        </>
    );
}