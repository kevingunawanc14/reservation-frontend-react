import Navbar from "../../components/navbar";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import { GiRank2 } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { BiSolidShieldAlt2 } from "react-icons/bi";
import { LuSwords } from "react-icons/lu";
import Avatar1 from '../../assets/avatar/avatar1.webp';
import { LuSword } from "react-icons/lu";




export default function Leaderboard() {

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/price/1`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHeader(data[0].header);
                setFontFamily(
                    {
                        headerPrice: data[0].fontTypeHeader,
                        descriptionPrice: data[0].fontTypeBenefit,
                    }
                );
                setPrice({
                    price1:
                    {
                        title: data[0].newPrice,
                        description: data[0].newDesc.split(",")
                    },
                    price2: {
                        title: data[1].newPrice,
                        description: data[1].newDesc.split(",")
                    },
                    price3: {
                        title: data[2].newPrice,
                        description: data[2].newDesc.split(",")
                    },
                });
                // console.log('1', price);
                // setPriceDescription([])
                // console.log('1', data);
            } catch (error) {
                console.log(error)
            }

        };

        fetchUserData();

    }, [])

    const columns = [
        {
            field: 'Rank',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center',
            align: 'center',
            sortable: false
        },
        {
            field: 'Rating',
            flex: 1,
            width: 200,
            sortable: false
        },
        {
            field: <LuSwords fontSize="20px" />
            ,
            flex: 1,
            minWidth: 50,
            headerAlign: 'center',
            align: 'center',
            sortable: false
        },
    ];

    // const style = { border: "20px" }

    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Leaderboard'} />
            </div>

            <div className="mx-10 mt-5 mb-20">
                <DataGrid
                    initialState={{
                        pagination: { paginationModel: { pageSize: 9 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    columns={columns}
                    rows={[
                        { id: 1, Rank: 'Gold', Rating: '', 'Total Reservation': 1 },
                    ]}
                    disableColumnMenu
                />

                <GiRank2
                    color="#3ba8ba"
                    fontSize="30px"
                />

                <GiRank2
                    color="#a46ced"
                    fontSize="30px"
                />

                <GiRank2
                    color="#9c2444"
                    fontSize="30px"
                />

                <div className="flex justify-center ">
                    <div className="grid grid-rows-2 grid-flow-col ">
                        <div className="avatar justify-self-center ">
                            <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                <img src={Avatar1} />
                            </div>
                        </div>
                        <div className="text-center">username ?</div>


                    </div>
                    <div className="grid grid-rows-2 grid-flow-col ">
                        <div className="place-self-center">
                            <FaHeart color="red" fontSize="20px" />
                        </div>
                        <div className="text-center font-bold">123</div>
                    </div>
                    <div className="grid grid-rows-2 grid-flow-col ">
                        <div className="place-self-center">
                            <BiSolidShieldAlt2 color="#c2cccd" fontSize="22px" className="" />
                        </div>
                        <div className="text-center font-bold">10</div>

                    </div>

                </div>

                <div>
                    <button className="btn btn-primary">
                        <LuSword fontSize="20px" />
                    </button>

                </div>

                {/* <p>1<FaHeart color="red" />
                </p>
                <p>1 <BiSolidShieldAlt2 color="#c2cccd" />
                </p>
                <p>username ?</p> */}



            </div>






            <Navbar />
        </>
    );
}