import Header from '../../components/header';
import AvatarIcon from '../../components/avatar';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from '../../api/axios';

export default function Rate() {

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const navigate = useNavigate();
    const currentUrl = window.location.href;
    const idProduct = currentUrl.split('/').pop()
    const [arrRating, setArrRating] = useState(null);
    const [ratingsData, setRatingsData] = useState(null);

    const handleBack = () => {
        navigate(-1);
    };

    const getRating = async () => {
        try {

            const response = await axios.get(`/ratings/${idProduct}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setArrRating(response.data.ratings);
            setRatingsData({ totalRating: response.data.totalRating, averageRating: response.data.averageRating, countPerStar: response.data.count });


        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }

    const getDataDetailUser = async () => {
        try {

            const response = await axios.get(`/user/detail/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const responseData = response.data;

            document.querySelector('html').setAttribute('data-theme', responseData.activeTheme.toLocaleLowerCase());

        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');

        }
    };

    useEffect(() => {
        getRating();
        getDataDetailUser();
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
                {ratingsData ? (
                    <div className="flex justify-center">
                        <div className='grid grid-cols-5'>
                            <div className="flex justify-center ">
                                <div>
                                    {ratingsData.averageRating &&
                                        <>
                                            <p className='text-3xl font-bold text-center'>{ratingsData.averageRating}</p>

                                            <div className="rating  mt-2 w-12 ms-1">
                                                {[...Array(10)].map((_, index) => {
                                                    console.log('ratingsData.averageRating', ratingsData.averageRating)
                                                    const halfClass = index % 2 === 0 ? 'mask-half-1' : 'mask-half-2';

                                                    let isChecked = -1;
                                                    if (ratingsData.averageRating == 1) {
                                                        isChecked = 1;
                                                    } else if (ratingsData.averageRating > 1 && ratingsData.averageRating < 2) {
                                                        isChecked = 2;
                                                    } else if (ratingsData.averageRating == 2) {
                                                        isChecked = 3;
                                                    } else if (ratingsData.averageRating > 2 && ratingsData.averageRating < 3) {
                                                        isChecked = 4;
                                                    } else if (ratingsData.averageRating == 3) {
                                                        isChecked = 5;
                                                    } else if (ratingsData.averageRating > 3 && ratingsData.averageRating < 4) {
                                                        isChecked = 6;
                                                    } else if (ratingsData.averageRating == 4) {
                                                        isChecked = 7;
                                                    } else if (ratingsData.averageRating > 4 && ratingsData.averageRating < 5) {
                                                        isChecked = 8;
                                                    } else if (ratingsData.averageRating == 5) {
                                                        isChecked = 9;
                                                    }

                                                    console.log('isChecked', isChecked)

                                                    return (
                                                        <input
                                                            key={index}
                                                            type="radio"
                                                            className={`bg-orange-400 mask mask-star-2 ${halfClass}`}
                                                            defaultChecked={index == isChecked}
                                                            disabled
                                                        />
                                                    );
                                                })}
                                            </div>

                                            <p className='text-xs text-center '>{ratingsData.totalRating} ratings</p>

                                        </>

                                    }

                                </div>
                            </div>
                            <div className="divider divider-horizontal"></div>
                            <div className="col-span-3">
                                <div className="grid grid-rows-5  ">
                                    {ratingsData.countPerStar && (
                                        <>
                                            <div className='grid grid-cols-10 '>
                                                <p className='text-xs'>5</p>
                                                <progress className="progress progress-warning w-36  col-span-9  place-self-center " value={ratingsData.countPerStar[5]} max={ratingsData.totalRating}></progress>
                                            </div>
                                            <div className='grid grid-cols-10'>
                                                <p className='text-xs'>4</p>
                                                <progress className="progress progress-warning w-36  col-span-9 place-self-center " value={ratingsData.countPerStar[4]} max={ratingsData.totalRating}></progress>
                                            </div>
                                            <div className='grid grid-cols-10'>
                                                <p className='text-xs'>3</p>
                                                <progress className="progress progress-warning w-36  col-span-9 place-self-center " value={ratingsData.countPerStar[3]} max={ratingsData.totalRating}></progress>
                                            </div>
                                            <div className='grid grid-cols-10'>
                                                <p className='text-xs'>2</p>
                                                <progress className="progress progress-warning w-36  col-span-9 place-self-center " value={ratingsData.countPerStar[2]} max={ratingsData.totalRating}></progress>
                                            </div>
                                            <div className='grid grid-cols-10'>
                                                <p className='text-xs'>1</p>
                                                <progress className="progress progress-warning w-36  col-span-9 place-self-center " value={ratingsData.countPerStar[1]} max={ratingsData.totalRating}></progress>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-screen  ">
                        <div>
                            <p className="text-base font-mono">Loading...</p>
                        </div>
                    </div>
                )}


                <div>
                    <p className='text-lg font-semibold mt-2'>Customer Reviews</p>
                </div>
                {arrRating ? (
                    arrRating.map(item => (
                        <div key={item.id}>
                            <div className="grid grid-cols-5 sm:grid-cols-12 mt-5">
                                <div className="">
                                    <div className="rounded-full bg-neutral p-2 ">
                                        <AvatarIcon avatar={item.activeAvatar} fontSize={"30px"} className="text-neutral-content w-full h-12" />
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
                                        className={`mask mask-star-2 bg-orange-400 cursor-default`}
                                        defaultChecked={item.rating - 1 == index}
                                        disabled
                                    />
                                ))}
                            </div>
                            <div>
                                <p>{item.description}</p>
                            </div>
                            <div className="divider"></div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center h-screen  ">
                        <div>
                            <p className="text-base font-mono">Loading...</p>
                        </div>
                    </div>
                )}




            </div >

        </>
    );
}