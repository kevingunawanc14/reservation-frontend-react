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

export default function Rate() {
    const navigate = useNavigate();

    const handleBack = () => {
        const detailPath = localStorage.getItem('detailPath');
        if (detailPath) {
            navigate(`${detailPath}`);
        } else {
            navigate('/');
        }
    };

    return (
        <>
            <div className="mx-10 mt-5">
                <div className="grid grid-cols-6 gap-4">
                    <div className='justify-self-center self-center'>
                        <button className="btn btn-primary btn-sm " onClick={handleBack}> <IoArrowBackOutline fontSize="20px" /></button>

                    </div>
                    <div className='col-span-5  '>
                        <Header
                            title={`Let's rate your order`}
                            className={'text-xl font-semibold'}
                        />
                    </div>
                </div>

            </div>
            <div className="mx-10 mt-5 mb-10">

                <div>
                    <div >
                        <p>gambar bulat</p>
                    </div>
                    <div>
                        <p>let srate</p>
                    </div>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat laborum modi odit inventore pariatur atque quis deserunt corrupti, architecto fugit eveniet suscipit nesciunt a soluta tenetur hic magni cupiditate officiis?</p>
                    </div>
                    <div>
                        <div className="rating mt-3">
                            <input type="radio" name="rating-2" className="rating-hidden" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                        </div>
                    </div>
                    <div>
                        <p>input comment</p>
                    </div>


                </div>




            </div>
            {/* <div className="grid grid-rows-4 grid-flow-col gap-4 justify-items-center">
                    <div>image lingkaran</div>
                    <div>text nilai yuk</div>
                    <div>text  kualitas lapangan</div>
                    <div>rating bintang dari mui material</div>
                </div> */}
        </>
    );
}