import Navbar from "../../components/navbar";
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import { GiRank2 } from "react-icons/gi";
import { FaHeart } from "react-icons/fa";
import { BiSolidShieldAlt2 } from "react-icons/bi";
import { LuSwords } from "react-icons/lu";
import { LuSword } from "react-icons/lu";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarColumnsButton,
    GridToolbarExport,
} from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from '../../api/axios';
import { GiTigerHead } from "react-icons/gi";
import AvatarIcon from '../../components/avatar';
import { FaQuestion } from "react-icons/fa6";
import Alert from '@mui/material/Alert';
import { LiaGiftsSolid } from "react-icons/lia";
import { AiFillFire } from "react-icons/ai";
import { AiOutlineCrown } from "react-icons/ai";
import { IoShirtOutline } from "react-icons/io5";
import dayjs from 'dayjs';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarColumnsButton />

        </GridToolbarContainer>
    );
}




export default function Leaderboard() {

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const theme = document.documentElement.getAttribute("data-theme");

    const [tableData, setTableData] = useState(null)
    const [attackUsername, setAttackUsername] = useState(null);

    const [attackStatus, setAttackStatus] = useState(null);

    const [userData, setUserData] = useState(null);

    const [loadingStatus, setLoadingStatus] = useState(null);


    const fetchData = async () => {
        try {

            const response = await axios.get('/user/ranked', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTableData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    };

    const getDataDetailUser = async () => {
        try {

            const response = await axios.get(`/user/detail/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            const responseData = response.data; // Assuming the response contains the user details

            console.log(responseData)

            // Update the state with the fetched data
            setUserData({
                username: responseData.username,
                rank: responseData.rank,
                xp: responseData.experiencePoint,
                hp: responseData.healthPoint,
                coin: responseData.krakatauCoin,
                activeAvatar: responseData.activeAvatar,
                activeTheme: responseData.activeTheme,
                attackAttempt: responseData.attackPoint
            });

            document.querySelector('html').setAttribute('data-theme', responseData.activeTheme.toLocaleLowerCase());


            console.log('response', response)

        } catch (error) {
            console.error('Error fetching data:', error);
            localStorage.removeItem('token');
            navigate('/login');;

        }
    };

    const handleAttackModal = async (username) => {
        document.getElementById('attackModal').showModal();
        setAttackUsername(username);
    }

    const handleAttackUser = async (username) => {
        console.log('username', username)
        let dataToSend = {}
        try {
            setLoadingStatus(true)

            const response = await axios.post(`/attack/${username}`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setLoadingStatus(false)
            document.getElementById('attackModal').close()

            console.log('response', response);
            fetchData();
            getDataDetailUser();
            setAttackStatus('success');
            setTimeout(() => {
                setAttackStatus(null);
            }, 2000);

        } catch (error) {
            setAttackStatus('error');
            setTimeout(() => {
                setAttackStatus(null);
            }, 2000);
            localStorage.removeItem('token');
            navigate('/login');

        }
    };

    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        fetchData();
        getDataDetailUser();

        const endOfMonth = dayjs().endOf('month');

        console.log('endofmonth', endOfMonth)

        const diff = endOfMonth.diff(dayjs());

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const countdownString = `${days} day ${hours} h`;
        console.log('countdownString', countdownString)

        setCountdown(countdownString);
    }, []);



    const columns = [
        {
            field: 'mostHealthPoint',
            headerName: 'Rank',
            flex: 0.5,
            renderCell: (params) => (
                <div className="">
                    {params.row.healthPoint <= 100 ?
                        <div className="grid grid-cols-3 ">
                            <p className="flex items-center">{params.row.mostHealthPoint}</p>
                            <GiRank2 color="#eccc55" fontSize="30px" />
                            {params.row.mostHealthPoint <= 3 &&
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>

                                    <AiFillFire color="#f97316" />

                                </span>
                            }
                        </div> :
                        params.row.healthPoint > 100 && params.row.healthPoint <= 200 ?
                            <div className="grid grid-cols-3">
                                <p className="flex items-center">{params.row.mostHealthPoint}</p>
                                <GiRank2 color="#3ba8ba" fontSize="30px" />
                                {params.row.mostHealthPoint <= 3 &&
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>

                                        <AiFillFire color="#f97316" />

                                    </span>
                                }
                            </div> :
                            params.row.healthPoint > 200 ?
                                <div className="grid grid-cols-3">
                                    <p className="flex items-center">{params.row.mostHealthPoint}</p>
                                    <GiRank2 color="#a46ced" fontSize="30px" />
                                    {params.row.mostHealthPoint <= 3 &&
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>

                                            <AiFillFire color="#f97316" />

                                        </span>
                                    }
                                </div> :
                                null}
                </div>
            ),
        },
        {
            field: 'username',
            headerName: 'Rating',
            renderCell: (params) => (
                <div className="grid grid-cols-4 place-items-center w-full">
                    <div className=" ">
                        <div className={`bg-neutral rounded-full grid grid-cols-1 content-center ${params.row.mostHealthPoint <= 3 ? 'hover:animate-bounce cursor-pointer' : ''} `}>
                            <div className="justify-self-center">
                                <AvatarIcon avatar={params.row.activeAvatar} fontSize={"32px"} className={`text-neutral-content p-1 ${params.row.mostHealthPoint <= 3 ? 'hover:animate-spin cursor-pointer' : ''}`} />
                            </div>
                        </div>
                    </div>
                    <div className=" ">
                        <div className="">
                            <FaHeart color="red" fontSize="20px" />
                        </div>
                        <div className="text-center font-bold">{params.row.healthPoint}</div>
                    </div>
                    <div className=" ">
                        <div className="">
                            <BiSolidShieldAlt2 color="#22d3ee" fontSize="22px" className="" />
                        </div>
                        <div className="text-center font-bold">{params.row.defensePoint}</div>
                    </div>
                    <div className="tooltip tooltip-left z-40 cursor-pointer" data-tip={params.row.username}>
                        <p className="font-semibold text-xs text-nowrap sm:w-full w-10 truncate "> {params.row.username}</p>
                    </div>

                </div>
            ),
            flex: 1,
            sortable: false,
        },
        {
            field: 'Action',
            renderHeader: () => <AiOutlineCrown fontSize="20px" />,
            renderCell: (params) => (
                <div className="flex justify-around ">
                    <div>
                        <button
                            className={`btn btn-error btn-sm sm:btn ${params.row.username === username || userData.attackAttempt < 1 ? 'btn-disabled' : ''}`}
                            onClick={() => handleAttackModal(params.row.username)}>
                            <LuSword fontSize="20px" className="hover:animate-bounce" />
                        </button>
                    </div>
                    {params.row.mostHealthPoint <= 3 && (
                        <div className="mx-3 tooltip tooltip-right" data-tip="Receive Gift"  >
                            <button
                                className={`btn btn-success btn-sm sm:btn`}
                            >
                                <div>
                                    <LiaGiftsSolid fontSize="25px" />

                                </div>
                            </button>
                        </div>
                    )}


                </div >
            ),
            flex: 0.5,
            sortable: false,
        },
    ];

    return (
        <>
            <div className="mx-10 mt-5">
                <div className="grid grid-cols-3 gap-4">
                    <Header title={'Leaderboard'} />
                </div>
                <div>
                    <div className="flex justify-end">
                        {attackStatus === 'success' && (
                            <Alert severity="success" onClose={() => setAttackStatus(null)}>Success to attack user</Alert>
                        )}
                        {attackStatus === 'error' && (
                            <Alert severity="error" onClose={() => setAttackStatus(null)}>Failed to attack user</Alert>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-10 mt-5 mb-5">
                <div className="grid grid-cols-3 gap-4">
                    <div className="m-4">
                        <button className="btn btn-circle btn-outline btn-sm hover:animate-bounce " onClick={() => document.getElementById('my_modal_5').showModal()}>
                            <FaQuestion />
                        </button>
                    </div>
                    <div className="mt-4">
                        {userData && (
                            <>
                                <p className="font-medium text-sm">Attack remaining ⚔️ {userData.attackAttempt} </p>
                            </>
                        )}

                    </div>
                    <div className="mt-4">
                        <p className="font-medium text-sm ">The Top 3 Users receive a gift (shirt or hat or glass)</p>
                        <p className="font-medium text-sm">Challanges ends in {countdown}</p>

                    </div>
                </div>

                {tableData && userData ? (
                    <>
                        <DataGrid
                            rows={tableData}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 8,
                                    },
                                },
                            }}
                            pageSizeOptions={[8]}
                            disableRowSelectionOnClick
                            disableColumnMenu
                            slots={{ toolbar: CustomToolbar }}
                            sx={{
                                "& .MuiDataGrid-columnHeaders": {
                                    color: theme === 'light'
                                        || theme === 'autumn'
                                        || theme === 'lemonade'
                                        || theme === 'nord'
                                        || theme === 'valentine'
                                        || theme === 'winter' ? '' : '#94a3b8',
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    color: theme === 'light'
                                        || theme === 'autumn'
                                        || theme === 'lemonade'
                                        || theme === 'nord'
                                        || theme === 'valentine'
                                        || theme === 'winter' ? '' : '#f1f5f9',
                                },
                                "& .MuiToolbar-root": {
                                    color: theme === 'light'
                                        || theme === 'autumn'
                                        || theme === 'lemonade'
                                        || theme === 'nord'
                                        || theme === 'valentine'
                                        || theme === 'winter' ? '' : '#94a3b8',
                                },
                                "& .MuiButtonBase-root.Mui-disabled": {
                                    color: theme === 'light'
                                        || theme === 'autumn'
                                        || theme === 'lemonade'
                                        || theme === 'nord'
                                        || theme === 'winter' ? '' : '#94a3b8',
                                },
                            }}
                        />
                    </>
                ) : (
                    <div className="flex justify-center items-center h-screen  ">
                        <div>
                            <span className="loading loading-dots loading-lg"></span>
                        </div>
                    </div>

                )}




            </div>



            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="font-medium text-justify">This is leaderboard page</p>
                    <ul className="list-disc mx-4">
                        <li>Rank order by most health point</li>
                        <li>You can reduce other user health point by attack</li>
                        <li>Per attack will reduce 1 user health point</li>
                    </ul>
                    {/* <div className='grid grid-rows-3 mt-3'>
                        <div className='grid grid-cols-5'>
                            <div className='col-span-1'>
                                <GiRank2 color="#eccc55" fontSize="25px" />

                            </div>
                            <div className='col-span-2'>
                                <p style={{ color: "#eccc55" }} className='font-bold'>Gold</p>

                            </div>
                            <div className='col-span-2 text-start flex items-center'>
                                <p className='text-base font-thin'>0 - 100 XP</p>

                            </div>
                        </div>
                        <div className='grid grid-cols-5'>
                            <div className='col-span-1' >
                                <GiRank2 color="#3ba8ba" fontSize="25px" />

                            </div>
                            <div className='col-span-2'  >
                                <p style={{ color: "#3ba8ba" }} className='font-bold'>Platinum</p>

                            </div>
                            <div className='col-span-2 text-start flex items-center'>
                                <p className='text-base font-thin'>101 - 200 XP</p>

                            </div>
                        </div>
                        <div className='grid grid-cols-5'>
                            <div className='col-span-1' >
                                <GiRank2 color="#a46ced" fontSize="25px" />

                            </div>
                            <div className='col-span-2' >
                                <p style={{ color: "#a46ced" }} className='font-bold'>Diamond</p>

                            </div>
                            <div className='col-span-2 text-start flex items-center' >
                                <p className='text-base font-thin'>201 - 1000 XP</p>

                            </div>
                        </div>
                    </div> */}

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="attackModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Attack Now?</h3>
                    <div className="modal-action">
                        <button onClick={() => handleAttackUser(attackUsername)} className={`btn btn-error mx-1 ${loadingStatus ? 'btn-disabled skeleton' : ''}`}>Attack</button>
                        <button className="btn btn-primary" onClick={() => document.getElementById('attackModal').close()}>Cancel</button>
                    </div>
                </div>
            </dialog>


            <Navbar />
        </>
    );
}