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
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from 'axios';

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
    const navigate = useNavigate();
    const location = useLocation();



    const fetchData = async () => {
        try {
            const response = await axios.get('/product')
            setTableData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`/product/${id}`)
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
            await axios.post(`/product/${data.id}/update`, {
                name: data.name,
                gor: data.gor,
                price: data.price,
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
            const response = await axios.get(`/product/${id}`);
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
            name: '',
            gor: '',
            price: '',
        },
    });
    const form2 = useForm({
        defaultValues: {
            nameAdd: '',
            gorAdd: '',
            priceAdd: '',
        },
    });

    // Destructure register and handleSubmit functions from each form
    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, setValue: setValue1, formState: { errors: errors1 } } = form1;
    const { register: register2, handleSubmit: handleSubmit2, watch: watch2, setValue: setValue2, formState: { errors: errors2 } } = form2;


    const handleAddChallenge = async () => {
        document.getElementById('addChallange').showModal()
        setValue2("nameAdd", '')
        setValue2("gorAdd", '')
        setValue2("priceAdd", '')
    }

    const handleAddSubmitChallenge = async (data) => {
        try {
            await axios.post(`/product/add`, {
                name: data.nameAdd,
                gor: data.gorAdd,
                price: data.priceAdd,
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
            setValue1("name", challangeData.data.name)
            setValue1("gor", challangeData.data.gor)
            setValue1("price", challangeData.data.price)
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
            field: 'name',
            headerName: 'Name',
            flex: 1,
        },
        {
            field: 'gor',
            headerName: 'Gor',
            flex: 1,
        },
        {
            field: 'price',
            headerName: 'Price',
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
                        <Header title={'Product'} />
                    </div>
                    <div>
                        <div className="flex justify-end">
                            {deleteStatus === 'success' && (
                                <Alert severity="success" onClose={() => setDeleteStatus(null)}>Product deleted successfully</Alert>
                            )}
                            {deleteStatus === 'error' && (
                                <Alert severity="error" onClose={() => setDeleteStatus(null)}>Failed to delete product</Alert>
                            )}
                            {updateStatus === 'success' && (
                                <Alert severity="success" onClose={() => setDeleteStatus(null)}>Product updated successfully</Alert>
                            )}
                            {updateStatus === 'error' && (
                                <Alert severity="error" onClose={() => setDeleteStatus(null)}>Failed to update product</Alert>
                            )}
                            {addStatus === 'success' && (
                                <Alert severity="success" onClose={() => setDeleteStatus(null)}>Product added successfully</Alert>
                            )}
                            {addStatus === 'error' && (
                                <Alert severity="error" onClose={() => setDeleteStatus(null)}>Failed to add product</Alert>
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

                    <h3 className="font-bold text-lg">Update Product</h3>
                    <div className="label">
                        <span className="label-text">Name</span>
                    </div>
                    {challangeData && (
                        <form className="" onSubmit={handleSubmit1(handleUpdateChallenge)}>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                {...register1("name",
                                    { required: 'Name harus diisi' }
                                )}
                            />

                            {errors1.name && <p className="text-error mt-2">{errors1.name.message}</p>}

                            <div className="label">
                                <span className="label-text">Gor</span>
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register1("gor",
                                    { required: 'Gor harus diisi' }
                                )}
                            />

                            {errors1.gor && <p className="text-error mt-2">{errors1.gor.message}</p>}

                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register1("price",
                                    { required: 'Price harus diisi' }
                                )}
                            />

                            {errors1.price && <p className="text-error mt-2">{errors1.price.message}</p>}

                            <input
                                type="text"
                                className="input input-bordered w-full hidden"
                                {...register1("id")}
                            />

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

                    <h3 className="font-bold text-lg">Add Product</h3>
                    <div className="label">
                        <span className="label-text">Name</span>
                    </div>

                    <form className="" onSubmit={handleSubmit2(handleAddSubmitChallenge)}>

                        <textarea
                            className="textarea textarea-bordered w-full"
                            {...register2("nameAdd",
                                { required: 'Name harus diisi' }
                            )}
                        />

                        {errors2.nameAdd && <p className="text-error mt-2">{errors2.nameAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">Gor</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            {...register2("gorAdd",
                                { required: 'Gor harus diisi' }
                            )}
                        />

                        {errors2.gorAdd && <p className="text-error mt-2">{errors2.gorAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">Price</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            {...register2("priceAdd",
                                { required: 'Price harus diisi' }
                            )}
                        />

                        {errors2.priceAdd && <p className="text-error mt-2">{errors2.priceAdd.message}</p>}

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

