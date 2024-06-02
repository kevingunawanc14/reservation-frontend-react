import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";

export default function Rate() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

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

    const navigate = useNavigate();
    const currentUrl = window.location.href;
    const idProduct = currentUrl.split('/').pop()
    const idPayment = currentUrl.split('/').slice(-2, -1)[0];
    const [loadingStatus, setLoadingStatus] = useState(null);


    const form1 = useForm({
        defaultValues: {
            description: '',
            option: 5,
        },
    });
    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, setValue: setValue1, formState: { errors: errors1 } } = form1;

    const handleBack = () => {
        navigate(-1)
    };

    const [productDetails, setProductDetails] = useState(null)

    const [ratingDetail, setRatingDetails] = useState(null)

    const getProductDetail = async () => {
        try {


            const response = await axios.get(`/detail/${idProduct}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const { imagePath, nameDetail, ...otherData } = response.data;
            setProductDetails({
                nameDetail,
                imagePath,
                ...otherData
            });




        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }

    const getRating = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`/rating/${username}/${idPayment}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });


            const status = response.data.statusGivenRating;
            const statusPayment = response.data.statusPayment;

            console.log('response data', response.data)
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
                    statusPayment
                });
            }



        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token');
            navigate('/login');
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


        try {
            setLoadingStatus(true)
            const response = await axios.post('/rating', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            setLoadingStatus(false)

            localStorage.setItem('lastPage', 'rating');  // Set lastPage to 'order'

            navigate('/payment');

        } catch (error) {
            console.error('Error:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    }

    useEffect(() => {
        getDataDetailUser();
        getProductDetail();
        getRating();
    }, []);

    useEffect(() => {
        if (ratingDetail) {
            setValue1('description', ratingDetail.description);
        }

    }, [ratingDetail]);


    return (
        <>
            <div className="mx-10 mt-5">
                <div className="grid grid-cols-6 gap-4">
                    <div className='justify-self-center self-center'>
                        <button className="btn btn-primary btn-sm " onClick={handleBack}> <IoArrowBackOutline fontSize="20px" /></button>

                    </div>
                    <div className='col-span-5  '>

                    </div>
                </div>

            </div>
            <div className="h-screen grid content-center mx-10 mt-[-50px]">
                <div>
                    {productDetails && ratingDetail ? (
                        <>
                            <div>
                                <div className="flex justify-center ">
                                    <img src={productDetails.imagePath} alt="" className="rounded-full w-72 sm:w-72" />
                                </div>
                            </div>
                            <div>
                                <p className="text-center font-bold text-xl mt-8">Let's rate your order</p>
                            </div>
                            <div>
                                <p className="text-center mt-3">How did you like the facility of from the {productDetails.nameDetail}?</p>
                            </div>
                            {ratingDetail.status || ratingDetail.statusPayment !== 'Lunas' ? (
                                <>
                                    <div className="flex justify-center mt-5">
                                        <div className="rating mt-3">
                                            <input
                                                type="radio"
                                                name="rating-2"
                                                className="mask mask-star-2 bg-orange-400 cursor-default"
                                                defaultValue={1}
                                                checked={ratingDetail.rating === 1}
                                                disabled
                                            />
                                            <input
                                                type="radio"
                                                name="rating-2"
                                                className="mask mask-star-2 bg-orange-400 cursor-default"
                                                defaultValue={2}
                                                checked={ratingDetail.rating === 2}
                                                disabled

                                            />
                                            <input
                                                type="radio"
                                                name="rating-2"
                                                className="mask mask-star-2 bg-orange-400 cursor-default"
                                                defaultValue={3}
                                                checked={ratingDetail.rating === 3}
                                                disabled

                                            />
                                            <input
                                                type="radio"
                                                name="rating-2"
                                                className="mask mask-star-2 bg-orange-400 cursor-default"
                                                defaultValue={4}
                                                checked={ratingDetail.rating === 4}
                                                disabled

                                            />
                                            <input
                                                type="radio"
                                                name="rating-2"
                                                className="mask mask-star-2 bg-orange-400 cursor-default"
                                                defaultValue={5}
                                                checked={ratingDetail.rating === 5}
                                                disabled

                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <textarea
                                            className="textarea textarea-bordered w-full h-28 sm:h-44 mt-5"
                                            disabled={ratingDetail.status || ratingDetail.statusPayment !== 'Lunas'}
                                            {...register1("description", {
                                                required: 'Review harus disi',
                                                minLength: { value: 5, message: 'Minimal review harus 5 kata' }
                                            })}
                                        />

                                    </div>
                                    <div>
                                        <button
                                            className={'btn btn-primary btn-block mt-5'}
                                            disabled={ratingDetail.status || ratingDetail.statusPayment !== 'Lunas'}
                                        > {ratingDetail.status
                                            ? 'Already Give Rating'
                                            : (ratingDetail.statusPayment !== 'Lunas'
                                                ? 'Status pembayaran belum lunas'
                                                : 'Submit')}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <form className="" onSubmit={handleSubmit1(handleReview)}>
                                    <div className="flex justify-center mt-5">
                                        <div className="rating mt-3">
                                            {/* <input type="radio" name="rating-2" className="rating-hidden" /> */}
                                            <input
                                                type="radio"
                                                name="rating-2"
                                                className="mask mask-star-2 bg-orange-400"
                                                {...register1("option")}
                                                defaultValue={1}

                                            />
                                            <input
                                                type="radio"
                                                name="rating-2"
                                                className="mask mask-star-2 bg-orange-400"
                                                {...register1("option")}
                                                defaultValue={2}


                                            />
                                            <input
                                                type="radio"
                                                name="rating-2"
                                                className="mask mask-star-2 bg-orange-400"
                                                {...register1("option")}
                                                defaultValue={3}

                                            />
                                            <input
                                                type="radio"
                                                name="rating-2"
                                                className="mask mask-star-2 bg-orange-400"
                                                {...register1("option")}
                                                defaultValue={4}


                                            />
                                            <input
                                                type="radio"
                                                name="rating-2"
                                                className="mask mask-star-2 bg-orange-400"
                                                {...register1("option")}
                                                defaultValue={5}

                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <textarea
                                            className="textarea textarea-bordered w-full h-28 sm:h-44 mt-5"
                                            {...register1("description", {
                                                required: 'Review harus disi',
                                                minLength: { value: 4, message: 'Minimal review harus 4 kata' }
                                            })}
                                            disabled={ratingDetail.status || ratingDetail.statusPayment !== 'Lunas'}
                                        />

                                        {errors1.description && <p className="text-error text-center ">{errors1.description.message}</p>}
                                    </div>
                                    <div>
                                        <button
                                            className={`btn btn-primary btn-block mt-5 ${loadingStatus ? 'btn-disabled skeleton' : ''}`}
                                            type="submit"
                                            disabled={ratingDetail.status || ratingDetail.statusPayment !== 'Lunas'}
                                        > {ratingDetail.status
                                            ? 'Already Give Rating'
                                            : (ratingDetail.statusPayment !== 'Lunas'
                                                ? 'Status pembayaran belum lunas'
                                                : 'Submit')}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </>
                    ) : (
                        <div className="flex justify-center items-center h-screen  ">
                            <div>
                                <p className="text-base font-mono">Loading...</p>
                            </div>
                        </div>
                    )}




                </div>
            </div >
        </>
    );
}