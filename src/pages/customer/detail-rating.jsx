import Navbar from "../../components/navbar";
import Header from '../../components/header';
import AvatarIcon from '../../components/avatar';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { GiMuscleUp } from "react-icons/gi";
import { GiCat } from "react-icons/gi";
import { GiOni } from "react-icons/gi";
import { GiBearFace } from "react-icons/gi";
import { GiBearHead } from "react-icons/gi";
import { GiBrute } from "react-icons/gi";
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function Rate() {
    const navigate = useNavigate();
    const currentUrl = window.location.href;
    const idProduct = currentUrl.split('/').pop()
    const [arrRating, setArrRating] = useState([]);

    const handleBack = () => {
        const detailPath = localStorage.getItem('detailPath');
        if (detailPath) {
            navigate(`${detailPath}`);
        } else {
            navigate('/');
        }
    };

    const getRating = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:2000/ratings/${idProduct}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            console.log(response);
            setArrRating(response.data);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getRating();
    }, []);

    return (
        <>
            <div className="mx-10 mt-5">
                <div className="grid grid-cols-6 gap-4">
                    <div className='justify-self-center self-center'>
                        <button className="btn btn-primary btn-sm " onClick={handleBack}> <IoArrowBackOutline fontSize="20px" /></button>

                    </div>
                    <div className='col-span-5  '>
                        <Header
                            title={'Rating and Reviews'}
                            className={'text-xl font-semibold'}
                        />
                    </div>
                </div>

            </div>
            <div className="mx-10 mt-5 mb-10">

                {arrRating.map(item => (
                    <div key={item.id}>
                        <div className="grid grid-cols-5">
                            <div className="">
                                <div className="rounded-full bg-neutral p-2">
                                    <AvatarIcon avatar={'muscle'}  fontSize={"30px"} className="text-neutral-content w-full h-12" />
                                    {/* <GiBrute fontSize={"30px"} className="text-neutral-content w-full h-12" /> */}
                                </div>
                            </div>
                            <div className="flex justify-center sm:justify-start sm:ms-3 self-center">
                                <p className="text-center font-bold">{item.username}</p>
                            </div>
                        </div>
                        <div className="rating mt-3">
                            {[...Array(5)].map((_, index) => (
                                <input
                                    key={index}
                                    type="radio"
                                    name={`rating-${item.id}`}
                                    className={`mask mask-star-2 bg-orange-400 ${index < item.rating ? 'rated-star' : ''}`}
                                    checked={item.rating - 1 == index}
                                />
                            ))}
                        </div>
                        <div>
                            <p>{item.description}</p>
                        </div>
                        <div className="divider"></div>
                    </div>
                ))}




            </div>

        </>
    );
}