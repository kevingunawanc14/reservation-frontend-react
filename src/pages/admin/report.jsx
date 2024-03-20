import Navbar from '../../components/navbar_admin.jsx';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import Header from '../../components/header';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.jsx';
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

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
        </GridToolbarContainer>
    );
}

export default function ActiveOrder() {

    const [tableData, setTableData] = useState([])
    const [challangeData, setChallangeData] = useState(null)
    const [deleteStatus, setDeleteStatus] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [addStatus, setAddStatus] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [theme, setTheme] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();



    const fetchData = async () => {
        try {
            const response = await axiosPrivate.get('/order')
            setTableData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axiosPrivate.delete(`/order/${id}`)
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
            await axiosPrivate.post(`/order/${data.id}/update`, {
                paymentMethod: data.paymentMethod,
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
            const response = await axiosPrivate.get(`/order/${id}`);
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
            productName: '',
            paymentStatus: '',
            paymentMethod: '',
            createdAt: '',
        },
    });
    const form2 = useForm({
        defaultValues: {
            usernameAdd: '',
            productNameAdd: '',
            paymentStatusAdd: '',
            paymentMethodAdd: '',
            createdAtAdd: '',
        },
    });

    // Destructure register and handleSubmit functions from each form
    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, setValue: setValue1, formState: { errors: errors1 } } = form1;
    const { register: register2, handleSubmit: handleSubmit2, watch: watch2, setValue: setValue2, formState: { errors: errors2 } } = form2;


    const handleAddChallenge = async () => {
        document.getElementById('addChallange').showModal()
        setValue2("usernameAdd", '')
        setValue2("productNameAdd", '')
        setValue2("paymentStatusAdd", '')
        setValue2("paymentMethodAdd", '')
        setValue2("createdAtAdd", '')
    }

    const handleAddSubmitChallenge = async (data) => {
        try {
            await axiosPrivate.post(`/order/add`, {
                username: data.usernameAdd,
                paymentStatus: data.paymentStatusAdd,
                paymentMethod: data.paymentMethodAdd,
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
            setValue1("productName", challangeData.data.productName)
            setValue1("paymentStatus", challangeData.data.paymentStatus)
            setValue1("paymentMethod", challangeData.data.paymentMethod)
            setValue1("createdAt", challangeData.data.createdAt)
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
            field: 'id',
            headerName: 'Id',
            flex: 1,
        },
        {
            field: 'username',
            headerName: 'Username',
            flex: 1,
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            flex: 1,
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            flex: 1,
        },
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            flex: 1,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            flex: 1,
        },
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
                        <Header title={'Order'} />
                    </div>
                    <div>
                        <div className="flex justify-end">
                            {deleteStatus === 'success' && (
                                <Alert severity="success" onClose={() => setDeleteStatus(null)}>Order deleted successfully</Alert>
                            )}
                            {deleteStatus === 'error' && (
                                <Alert severity="error" onClose={() => setDeleteStatus(null)}>Failed to delete order</Alert>
                            )}
                            {updateStatus === 'success' && (
                                <Alert severity="success" onClose={() => setDeleteStatus(null)}>Order updated successfully</Alert>
                            )}
                            {updateStatus === 'error' && (
                                <Alert severity="error" onClose={() => setDeleteStatus(null)}>Failed to update order</Alert>
                            )}
                            {addStatus === 'success' && (
                                <Alert severity="success" onClose={() => setDeleteStatus(null)}>Order added successfully</Alert>
                            )}
                            {addStatus === 'error' && (
                                <Alert severity="error" onClose={() => setDeleteStatus(null)}>Failed to add order</Alert>
                            )}
                        </div>
                    </div>
                </div>

            </div>

            <div className="mx-10 mt-5">
                <button className="btn btn-primary mx-1" onClick={handleAddChallenge}>
                    <IoMdAddCircleOutline fontSize="1.5em" color='white' />
                </button>
            </div>

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
                    disableColumnMenu
                    slots={{ toolbar: CustomToolbar }}
                    sx={{
                        color: isDarkTheme ? 'white' : 'black', // Set the overall font color to white
                        '& .MuiDataGrid-cell': { // Target individual cells for more granular control
                            color: 'inherit', // Inherit the white color from the parent
                        },
                    }}
                />
            </div>

            <dialog id="detailChallange" className="modal">
                <div className="modal-box">

                    <h3 className="font-bold text-lg">Update Order</h3>
                    <div className="label">
                        <span className="label-text">Username</span>
                    </div>
                    {challangeData && (
                        <form className="" onSubmit={handleSubmit1(handleUpdateChallenge)}>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                {...register1("username",
                                    { required: 'Username harus diisi' }
                                )}
                            />

                            {errors1.username && <p className="text-error mt-2">{errors1.username.message}</p>}

                            <div className="label">
                                <span className="label-text">Product Name</span>
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register1("productName",
                                    { required: 'Product harus diisi' }
                                )}
                            />

                            {errors1.productName && <p className="text-error mt-2">{errors1.productName.message}</p>}


                            <div className="label">
                                <span className="label-text">Payment Status</span>
                            </div>

                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register1("paymentStatus")}
                            />

                            {errors1.paymentStatus && <p className="text-error mt-2">{errors1.paymentStatus.message}</p>}

                            <div className="label">
                                <span className="label-text">Payment Method</span>
                            </div>

                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register1("paymentMethod")}
                            />

                            {errors1.paymentMethod && <p className="text-error mt-2">{errors1.paymentMethod.message}</p>}

                            <div className="label">
                                <span className="label-text">Created At</span>
                            </div>

                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register1("createdAt")}
                            />

                            {errors1.createdAt && <p className="text-error mt-2">{errors1.createdAt.message}</p>}

                            <div className="modal-action">
                                <button
                                    className="btn btn-accent mx-1"
                                    type='submit'
                                >Update</button>
                                <button className="btn btn-primary" type='button' onClick={handleCloseModal}>Cancel</button>

                            </div>

                        </form>
                    )}

                </div>
            </dialog >

            <dialog id="addChallange" className="modal">
                <div className="modal-box">

                    <h3 className="font-bold text-lg">Add Order</h3>
                    <div className="label">
                        <span className="label-text">Username</span>
                    </div>

                    <form className="" onSubmit={handleSubmit2(handleAddSubmitChallenge)}>

                        <textarea
                            className="textarea textarea-bordered w-full"
                            {...register2("usernameAdd",
                                { required: 'Username harus diisi' }
                            )}
                        />

                        {errors2.usernameAdd && <p className="text-error mt-2">{errors2.usernameAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">Product Name</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            {...register2("productNameAdd",
                                { required: 'Product Name harus diisi' }
                            )}
                        />

                        {errors2.productNameAdd && <p className="text-error mt-2">{errors2.productNameAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">Payment Status</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            {...register2("paymentStatusAdd",
                                { required: 'Payment Status harus diisi' }
                            )}
                        />

                        {errors2.paymentStatusAdd && <p className="text-error mt-2">{errors2.paymentStatusAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">Payment Method</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            {...register2("paymentMethodAdd",
                                { required: 'Payment Method harus diisi' }
                            )}
                        />

                        {errors2.paymentMethodAdd && <p className="text-error mt-2">{errors2.paymentMethodAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">Created At</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            {...register2("createdAtAdd",
                                { required: 'Created at harus diisi' }
                            )}
                        />

                        {errors2.createdAtAdd && <p className="text-error mt-2">{errors2.createdAtAdd.message}</p>}

                        <div className="modal-action">
                            <button
                                className="btn btn-accent mx-1"
                                type='submit'
                            >
                                Add
                            </button>
                            <button className="btn btn-primary" type='button' onClick={handleCloseModal}>Cancel</button>

                        </div>

                    </form>
                </div>
            </dialog >

            <dialog id="deleteModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are you sure?</h3>
                    <p className="py-4">This action cannot be undone</p>
                    <div className="modal-action">
                        <form method="dialog" >
                            <button onClick={() => handleDeleteProduct(deleteId)} className="btn btn-error mx-1">Delete</button>
                            <button className="btn btn-primary">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>


            <Navbar />
        </>
    );
}

