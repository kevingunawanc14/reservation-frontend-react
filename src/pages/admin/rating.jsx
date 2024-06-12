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
            const response = await axios.get('/rating', {
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
            await axios.delete(`/rating/${id}`, {
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

    const handleDeleteModal = async (id) => {
        document.getElementById('deleteModal').showModal();
        setDeleteId(id);
    }

    const handleCloseModal = async () => {
        document.getElementById('detailChallange').close();
    }

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
            field: 'productName',
            headerName: 'Product Name',
            flex: 1,
        },
        {
            field: 'username',
            headerName: 'Username',
            flex: 1,
        },
        {
            field: 'rating',
            headerName: 'Star Rating',
            renderCell: (params) => (
                <div>
                    {params.row.rating === 1 ? (
                        <div className="rating rating-sm">
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled defaultChecked />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                        </div>

                    ) : params.row.rating === 2 ? (
                        <div className="rating rating-sm">
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled defaultChecked />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                        </div>
                    ) : params.row.rating === 3 ? (
                        <div className="rating rating-sm">
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled defaultChecked />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                        </div>

                    ) : params.row.rating === 4 ? (
                        <div className="rating rating-sm">
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled defaultChecked />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled />
                        </div>

                    ) : params.row.rating === 5 ? (
                        <div className="rating rating-sm">
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" />
                            <input type="radio" name={params.row.id} className="mask mask-star-2 bg-orange-400" disabled defaultChecked />
                        </div>
                    ) : (
                        <p>error</p>
                    )}
                </div>
            ),
            flex: 1,
        },
        {
            field: 'description',
            headerName: 'Review',
            flex: 1,
        },
        // {
        //     field: 'statusAktif',
        //     headerName: 'Status Aktif',
        //     renderCell: (params) => (
        //         <div>
        //             {params.row.statusAktif === 1 ? (
        //                 <p>Active</p>
        //             ) : (
        //                 <p>Non-Active</p>
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
                        <Header title={'Rating'} />
                    </div>
                    <div>
                        <div className="flex justify-end">
                            {deleteStatus === 'success' && (
                                <Alert severity="success" onClose={() => setDeleteStatus(null)}>Rating deleted successfully</Alert>
                            )}
                            {deleteStatus === 'error' && (
                                <Alert severity="error" onClose={() => setDeleteStatus(null)}>Failed to delete rating</Alert>
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
                                type="number"
                                className="input input-bordered w-full"
                                {...register1("phoneNumber",
                                    {
                                        required: 'Phone number is required',
                                        minLength: { value: 12, message: 'Phone number must be at least 12 characters' },
                                        maxLength: { value: 12, message: 'Phone number cannot exceed 12 characters' },

                                    }
                                )}
                            />
                            {errors1.phoneNumber && <p className="text-error mt-2">{errors1.phoneNumber.message}</p>}

                            {/* <div className="label">
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

                            {errors1.membershipBadminton && <p className="text-error mt-2">{errors1.membershipBadminton.message}</p>} */}

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

