import Navbar from "../../components/navbar";
import Header from '../../components/header';
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { GiMuscleUp } from "react-icons/gi";
import { GiCat } from "react-icons/gi";
import { GiOni } from "react-icons/gi";
import { GiBearFace } from "react-icons/gi";
import { GiBearHead } from "react-icons/gi";
import { GiBrute } from "react-icons/gi";
import gym from '../../assets/product/gym.jpg'; // Import the image file
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";

export default function Rate() {
    const navigate = useNavigate();
    const currentUrl = window.location.href;
    const idProduct = currentUrl.split('/').pop()
    const idPayment = currentUrl.split('/').slice(-2, -1)[0];

    const username = localStorage.getItem('username');

    const form1 = useForm({
        defaultValues: {
            description: '',
            option: 5,
        },
    });
    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, setValue: setValue1, formState: { errors: errors1 } } = form1;

    const handleBack = () => {
        const detailPath = localStorage.getItem('detailPath');
        if (detailPath) {
            navigate(`${detailPath}`);
        } else {
            navigate('/');
        }
    };

    const [productDetails, setProductDetails] = useState({
        id: '',
        nameDetail: '',
        imagePath: '',
    })

    const [ratingDetail, setRatingDetails] = useState({
        rating: '',
        description: '',
        status: '',
        x: '',
    })


    const getProductDetail = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:2000/detail/${idProduct}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            const { imagePath, nameDetail, ...otherData } = response.data;
            // Assuming response.data contains other properties as well
            setProductDetails({
                nameDetail,
                imagePath,
                ...otherData
            });


        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getRating = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:2000/rating/${username}/${idPayment}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            console.log('response', response);
            console.log('response', response.data.status);

            const status = response.data.status;
            if (status) {
                const { rating, description } = response.data.existingRating;
                setRatingDetails({
                    rating,
                    description,
                    status,
                });
            } else {
                setRatingDetails({
                    status,
                });
            }

            // Assuming response.data contains other properties as well


        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleReview = async () => {
        const dataToSend = {
            idProduct: idProduct,
            username: username,
            rating: watch1("option"),
            description: watch1("description"),
            idPayment: idPayment,

        };

        console.log('dataToSend', dataToSend);

        try {
            // console.log('dataToSend', dataToSend);
            const token = localStorage.getItem('token');

            const response = await axios.post('http://localhost:2000/rating', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            console.log('response', response);

            // localStorage.setItem('fromOrder', 'true');

            // navigate('/payment');

        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        getProductDetail();
        getRating();
    }, []);

    useEffect(() => {
        if (ratingDetail.status) {
            setValue1('description', ratingDetail.description);
        }
        console.log('ratingDetail', ratingDetail);
        console.log('ratingDetail.status', ratingDetail.status);

    }, [ratingDetail]);


    return (
        <>
            <div className="mx-10 mt-5">
                <div className="grid grid-cols-6 gap-4">
                    <div className='justify-self-center self-center'>
                        <button className="btn btn-primary btn-sm " onClick={handleBack}> <IoArrowBackOutline fontSize="20px" /></button>

                    </div>
                    <div className='col-span-5  '>
                        {/* <Header
                            title={`Let's rate your order`}
                            className={'text-xl font-semibold'}
                        /> */}
                    </div>
                </div>

            </div>
            <div className="mx-10 mt-10 mb-10">

                <div>
                    <div >
                        <div className="flex justify-center ">
                            <img src={productDetails.imagePath} alt="" className="rounded-full w-80 sm:w-96" />
                        </div>
                    </div>
                    <div>
                        <p className="text-center font-bold text-xl mt-8">Let's rate your order</p>
                    </div>
                    <div>
                        <p className="text-center mt-3">How did you like the facility of from the {productDetails.nameDetail}?</p>
                    </div>
                    <form className="" onSubmit={handleSubmit1(handleReview)}>
                        {ratingDetail.status ? (
                            <div className="flex justify-center mt-5">
                                <div className="rating mt-3">
                                    {/* <input type="radio" name="rating-2" className="rating-hidden" /> */}
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400 cursor-default"
                                        value={1}
                                        checked={ratingDetail.rating === 1}
                                        disabled
                                    />
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400 cursor-default"
                                        value={2}
                                        checked={ratingDetail.rating === 2}
                                        disabled

                                    />
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400 cursor-default"
                                        value={3}
                                        checked={ratingDetail.rating === 3}
                                        disabled

                                    />
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400 cursor-default"
                                        value={4}
                                        checked={ratingDetail.rating === 4}
                                        disabled

                                    />
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400 cursor-default"
                                        value={5}
                                        checked={ratingDetail.rating === 5}
                                        disabled

                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center mt-5">
                                <div className="rating mt-3">
                                    {/* <input type="radio" name="rating-2" className="rating-hidden" /> */}
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        {...register1("option")}
                                        value={1}

                                    />
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        {...register1("option")}
                                        value={2}


                                    />
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        {...register1("option")}
                                        value={3}

                                    />
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        {...register1("option")}
                                        value={4}


                                    />
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        {...register1("option")}
                                        value={5}

                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <textarea
                                className="textarea textarea-bordered w-full h-28 sm:h-44 mt-5"
                                {...register1("description", {
                                    required: 'Review harus disi',
                                    minLength: { value: 5, message: 'Minimal review harus 5 kata' }
                                })}
                                disabled={ratingDetail.status ? true : false}
                            />

                            {errors1.description && <p className="text-error text-center ">{errors1.description.message}</p>}
                        </div>
                        <div>
                            <button
                                className={'btn btn-primary btn-block mt-5'}
                                type="submit"
                                disabled={ratingDetail.status ? true : false}
                            >{ratingDetail.status ? 'Already Give Rating' : 'Submit'}
                            </button>
                        </div>
                    </form>



                </div>




            </div >
            {/* <div className="grid grid-rows-4 grid-flow-col gap-4 justify-items-center">
                    <div>image lingkaran</div>
                    <div>text nilai yuk</div>
                    <div>text  kualitas lapangan</div>
                    <div>rating bintang dari mui material</div>
                </div> */}
        </>
    );
}