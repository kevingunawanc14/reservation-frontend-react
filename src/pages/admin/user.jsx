import Navbar from '../../components/navbar_admin.jsx';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import Header from '../../components/header';
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
} from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import axios from '../../api/axios';

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
        </GridToolbarContainer>
    );
}

export default function ActiveOrder() {

    const token = localStorage.getItem('token');

    const [tableData, setTableData] = useState(null)
    const [challangeData, setChallangeData] = useState(null)
    const [deleteStatus, setDeleteStatus] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('response', response);
            setTableData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.message === 'Request failed with status code 401') {
                navigate('/unauthorized')
            } else {
                navigate('/login');
            }

        }
    };

    const handleDeleteProduct = async (id) => {

        try {
            setLoadingStatus(true)
            await axios.delete(`/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchData();
            setDeleteStatus('success');
            setTimeout(() => {
                setDeleteStatus(null);
            }, 2000);

            setLoadingStatus(false)

        } catch (error) {
            setDeleteStatus('error');
            setTimeout(() => {
                setDeleteStatus(null);
            }, 2000);

        }
    };

    const handleUpdateChallenge = async (data) => {
        console.log('data', data)
        try {
            setLoadingStatus(true)

            const dataToSend = {
                username: data.username,
                phoneNumber: data.phoneNumber,
                biayaPendaftaranMembershipGym: data.membershipGym,
                biayaPendaftaranMembershipBadminton: data.membershipBadminton,
            };

            const response = await axios.post(`/user/${data.id}/update`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(response);
            setLoadingStatus(false)
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

            const response = await axios.get(`/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setChallangeData(response)


        } catch (error) {
            console.log('error:', error);
        }
    }

    const handleDeleteModal = async (id) => {
        document.getElementById('deleteModal').showModal();
        setDeleteId(id);
    }

    const form1 = useForm({
        defaultValues: {
            id: '',
            username: '',
            password: '',
            phoneNumber: '',
        },
    });

    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, setValue: setValue1, formState: { errors: errors1 } } = form1;

    const handleCloseModal = async () => {
        document.getElementById('detailChallange').close();
    }

    useEffect(() => {
        if (challangeData) {
            console.log('challangeData', challangeData)
            setValue1("username", challangeData.data.username)
            setValue1("phoneNumber", challangeData.data.phoneNumber)
            setValue1("membershipGym", challangeData.data.biayaPendaftaranMembershipGym)
            setValue1("membershipBadminton", challangeData.data.biayaPendaftaranMembershipBadminton)
            setValue1("id", challangeData.data.id)

            document.getElementById('detailChallange').showModal()

        }
    }, [challangeData]);


    useEffect(() => {
        fetchData();
    }, []);



    const columns = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 0.5,
        },
        {
            field: 'username',
            headerName: 'Username',
            flex: 1,
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            flex: 1,
        },
        // {
        //     field: 'biayaPendaftaranMembershipGym',
        //     headerName: 'Biaya Pendaftaran Membership Gym',
        //     renderCell: (params) => (
        //         <div>
        //             {params.row.biayaPendaftaranMembershipGym === false ? (
        //                 <p>Non Aktif</p>
        //             ) : (
        //                 <p>Aktif</p>
        //             )}
        //         </div>
        //     ),
        //     flex: 1,
        // },
        // {
        //     field: 'biayaPendaftaranMembershipBadminton',
        //     headerName: 'Biaya Pendaftaran Membership Badminton',
        //     renderCell: (params) => (
        //         <div>
        //             {params.row.biayaPendaftaranMembershipBadminton === false ? (
        //                 <p>Non Aktif</p>
        //             ) : (
        //                 <p>Aktif</p>
        //             )}
        //         </div>
        //     ),
        //     flex: 1,
        // },
        {
            field: 'Action',
            headerName: 'Action',
            renderCell: (params) => (
                <div className="flex justify-around">
                    <button className="btn btn-primary mx-1" onClick={() => handleDetailChallenge(params.row.id)}>
                        <MdOutlineEdit fontSize="1.5em" color='white' />
                    </button>

                    <button className="btn btn-error" onClick={() => handleDeleteModal(params.row.id)}>
                        <MdDeleteOutline fontSize="1.5em" color='white' />
                    </button>


                </div >
            ),
            flex: 1,
            sortable: false,
        },
    ];

    return (
        <>
            <div className="mx-10 mt-5">

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Header title={'User'} />
                    </div>
                    <div>
                        <div className="flex justify-end">
                            {deleteStatus === 'success' && (
                                <Alert severity="success" onClose={() => setDeleteStatus(null)}>User deleted successfully</Alert>
                            )}
                            {deleteStatus === 'error' && (
                                <Alert severity="error" onClose={() => setDeleteStatus(null)}>Failed to delete user</Alert>
                            )}
                            {updateStatus === 'success' && (
                                <Alert severity="success" onClose={() => setUpdateStatus(null)}>User updated successfully</Alert>
                            )}
                            {updateStatus === 'error' && (
                                <Alert severity="error" onClose={() => setUpdateStatus(null)}>Failed to update user</Alert>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            {tableData ? (
                <>
                    <div className="mx-10 mt-5 mb-20">
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
                            slots={{ toolbar: CustomToolbar }}
                        />
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center h-screen  ">
                    <div>
                        <p className="text-base font-mono">Loading...</p>
                    </div>
                </div>
            )}

            <dialog id="detailChallange" className="modal">
                <div className="modal-box">

                    <h3 className="font-bold text-lg">Update User</h3>

                    {challangeData && (
                        <form className="" onSubmit={handleSubmit1(handleUpdateChallenge)}>

                            <div className="label">
                                <span className="label-text">Username</span>
                            </div>
                            <input
                                className="textarea textarea-bordered w-full"
                                {...register1("username",
                                    { required: 'Username harus diisi' }
                                )}
                                disabled
                            />

                            {errors1.username && <p className="text-error mt-2">{errors1.username.message}</p>}

                            <div className="label">
                                <span className="label-text">Phone Number</span>
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register1("phoneNumber",
                                    { required: 'Phone number harus diisi' }
                                )}
                            />
                            {errors1.phoneNumber && <p className="text-error mt-2">{errors1.phoneNumber.message}</p>}

                            <div className="label">
                                <span className="label-text">Biaya Pendaftaran Membership Gym</span>
                            </div>

                            <select
                                className="select select-bordered w-full"
                                {...register1("membershipGym")} >
                                <option disabled >What kind of status ?</option>
                                <option value={true}>Aktif</option>
                                <option value={false}>Non aktif</option>
                            </select>

                            {errors1.membershipGym && <p className="text-error mt-2">{errors1.membershipGym.message}</p>}

                            <div className="label">
                                <span className="label-text">Biaya Pendaftaran Membership Badminton</span>
                            </div>

                            <select
                                className="select select-bordered w-full"
                                {...register1("membershipBadminton")} >
                                <option disabled >What kind of status ?</option>
                                <option value={true}>Aktif</option>
                                <option value={false}>Non aktif</option>
                            </select>

                            {errors1.membershipBadminton && <p className="text-error mt-2">{errors1.membershipBadminton.message}</p>}

                            <div className="modal-action">
                                <button
                                    className={`btn btn-accent mx-1  ${loadingStatus ? 'btn-disabled skeleton' : ''}`}
                                    type='submit'
                                >Update</button>
                                <button className="btn btn-primary" type='button' onClick={handleCloseModal}>Cancel</button>

                            </div>

                        </form>
                    )}

                </div>
            </dialog >

            <dialog id="deleteModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure?</h3>
                    <p className="py-4">This action cannot be undone</p>
                    <div className="modal-action">
                        <form method="dialog" >
                            <button onClick={() => handleDeleteProduct(deleteId)} className={`btn btn-error mx-1  ${loadingStatus ? 'btn-disabled skeleton' : ''}`}>Delete</button>
                            <button className="btn btn-primary">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <Navbar />
        </>
    );
}

