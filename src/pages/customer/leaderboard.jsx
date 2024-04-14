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
    GridToolbarExport,
} from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from 'axios';
import { GiTigerHead } from "react-icons/gi";
import AvatarIcon from '../../components/avatar';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
        </GridToolbarContainer>
    );
}




export default function Leaderboard() {

    const [tableData, setTableData] = useState([])
    const [challangeData, setChallangeData] = useState(null)
    const [deleteStatus, setDeleteStatus] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [addStatus, setAddStatus] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [theme, setTheme] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();



    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:2000/user/ranked', {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });
            setTableData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            // navigate('/login', { state: { from: location }, replace: true });

        }
    };

    const getData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:2000/user', {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });

            console.log('responsex', response);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDeleteProduct = async (id) => {
        try {
            await axiosPrivate.delete(`/user/${id}`)
            fetchData();
            setDeleteStatus('success');
            setTimeout(() => {
                setDeleteStatus(null);
            }, 2000);

        } catch (error) {
            setDeleteStatus('error');
            setTimeout(() => {
                setDeleteStatus(null);
            }, 2000);

        }
    };

    const handleUpdateChallenge = async (data) => {
        try {
            await axiosPrivate.post(`/user/${data.id}/update`, {
                username: data.username,
                password: data.password,
                phoneNumber: data.phoneNumber
            });
            fetchData();
            setUpdateStatus('success');
            setTimeout(() => {
                setUpdateStatus(null);
            }, 2000);
            document.getElementById('detailChallange').close();
        } catch (error) {
            setUpdateStatus('error');
            setTimeout(() => {
                setUpdateStatus(null);
            }, 2000);
        }
    }

    const handleDetailChallenge = async (id) => {
        try {
            const response = await axiosPrivate.get(`/user/${id}`);
            setChallangeData(response)

        } catch (error) {
            console.log('error:', error);
        }
    }

    const handleDeleteModal = async (id) => {
        document.getElementById('deleteModal').showModal();
        setDeleteId(id);
    }

    // Create separate instances of useForm for each form
    const form1 = useForm({
        defaultValues: {
            id: '',
            username: '',
            password: '',
            phoneNumber: '',
        },
    });
    const form2 = useForm({
        defaultValues: {
            usernameAdd: '',
            passwordAdd: '',
            phoneNumberAdd: '',
        },
    });

    // Destructure register and handleSubmit functions from each form
    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, setValue: setValue1, formState: { errors: errors1 } } = form1;
    const { register: register2, handleSubmit: handleSubmit2, watch: watch2, setValue: setValue2, formState: { errors: errors2 } } = form2;


    const handleAddChallenge = async () => {
        document.getElementById('addChallange').showModal()
        setValue2("usernameAdd", '')
        setValue2("passwordAdd", '')
        setValue2("phoneNumberAdd", '')
    }

    const handleAddSubmitChallenge = async (data) => {
        try {
            await axiosPrivate.post(`/user/add`, {
                username: data.usernameAdd,
                password: data.passwordAdd,
                phoneNumber: data.phoneNumberAdd,
            });
            fetchData();
            setAddStatus('success');
            setTimeout(() => {
                setAddStatus(null);
            }, 2000);
            document.getElementById('addChallange').close();

        } catch (error) {
            setAddStatus('error');
            setTimeout(() => {
                setAddStatus(null);
            }, 2000);

        }

    }

    const handleCloseModal = async () => {
        document.getElementById('detailChallange').close();
        document.getElementById('addChallange').close();
    }

    useEffect(() => {
        if (challangeData) {
            setValue1("username", challangeData.data.username)
            setValue1("password", challangeData.data.password)
            setValue1("phoneNumber", challangeData.data.phoneNumber)
            setValue1("id", challangeData.data.id)
            document.getElementById('detailChallange').showModal()

        }
    }, [challangeData]);


    useEffect(() => {
        fetchData();

    }, []);

    const isDarkTheme = document.documentElement.getAttribute("data-theme") === 'dracula' || document.documentElement.getAttribute("data-theme") === 'dark'
    console.log('isDarkTheme', isDarkTheme)

    const columns = [
        {
            field: 'mostHealthPoint',
            headerName: 'Rank',
            flex: 0.5,
            renderCell: (params) => (
                <div className="">
                    {params.row.healthPoint <= 100 ?
                        <div className="grid grid-cols-2 ">
                            <p className="flex items-center">{params.row.mostHealthPoint}</p>
                            <GiRank2 color="#eccc55" fontSize="30px" />
                        </div> :
                        params.row.healthPoint > 100 && params.row.healthPoint <= 200 ?
                            <div className="grid grid-cols-2">
                                <p className="flex items-center">{params.row.mostHealthPoint}</p>
                                <GiRank2 color="#3ba8ba" fontSize="30px" />
                            </div> :
                            params.row.healthPoint > 200 ?
                                <div className="grid grid-cols-2">
                                    <p className="flex items-center">{params.row.mostHealthPoint}</p>
                                    <GiRank2 color="#a46ced" fontSize="30px" />
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
                        <div className="bg-neutral rounded-full grid grid-cols-1 content-center">
                            <div className="justify-self-center">
                                <AvatarIcon avatar={params.row.activeAvatar} fontSize={"32px"} className="text-neutral-content p-1" />
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
                            <BiSolidShieldAlt2 color="#c2cccd" fontSize="22px" className="" />
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
            headerName: <LuSwords fontSize="20px" />,
            renderCell: (params) => (
                <div className="flex justify-around ">
                    <div>
                        <button className="btn btn-error btn-sm sm:btn">
                            <LuSword fontSize="20px" className="hover:animate-bounce" />
                        </button>

                    </div>
                </div >
            ),
            flex: 0.5,
            sortable: false,
        },
    ];

    const rows = [
        {
            id: 1,
            username: '@MUI',
            age: 20,
        },
    ];



    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Leaderboard'} />
            </div>

            <div className="mx-10 mt-5 mb-5">
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
                        color: isDarkTheme ? 'white' : 'black', // Set the overall font color to white
                        '& .MuiDataGrid-cell': { // Target individual cells for more granular control
                            color: 'inherit', // Inherit the white color from the parent
                        },
                    }}
                />
                {/* 
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
                /> */}

                {/* <div className="flex justify-center ">
                    <div className="grid grid-rows-2 grid-flow-col ">
                        <GiRank2
                            color="#9c2444"
                            fontSize="30px"
                        />


                    </div>
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

                </div> */}

                {/* <div>
                    <button className="btn btn-primary">
                        <LuSword fontSize="20px" />
                    </button>

                </div> */}

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