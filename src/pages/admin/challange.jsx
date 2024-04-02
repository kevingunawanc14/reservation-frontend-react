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
            const response = await axiosPrivate.get('/challenge')
            setTableData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axiosPrivate.delete(`/challenge/${id}`)
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
            await axiosPrivate.post(`/challenge/${data.id}/update`, {
                description: data.description,
                repeatTime: data.repeatTime
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
            const response = await axiosPrivate.get(`/challenge/${id}`);
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
            description: '',
            repeatTime: '',
        },
    });
    const form2 = useForm({
        defaultValues: {
            descriptionAdd: '',
            repeatTimeAdd: '',
        },
    });

    // Destructure register and handleSubmit functions from each form
    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, setValue: setValue1, formState: { errors: errors1 } } = form1;
    const { register: register2, handleSubmit: handleSubmit2, watch: watch2, setValue: setValue2, formState: { errors: errors2 } } = form2;


    const handleAddChallenge = async () => {
        document.getElementById('addChallange').showModal()
        setValue2("descriptionAdd", '')
        setValue2("repeatTimeAdd", '')
    }

    const handleAddSubmitChallenge = async (data) => {
        try {
            await axiosPrivate.post(`/challenge/add`, {
                description: data.descriptionAdd,
                repeatTime: data.repeatTimeAdd
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
            setValue1("description", challangeData.data.description)
            setValue1("repeatTime", challangeData.data.repeatTime)
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
            field: 'description',
            headerName: 'Description',
            flex: 1,
        },
        {
            field: 'repeatTime',
            headerName: 'Repeat Time',
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
                        <Header title={'Challange'} />
                    </div>
                    <div>
                        <div className="flex justify-end">
                            {deleteStatus === 'success' && (
                                <Alert severity="success" onClose={() => setDeleteStatus(null)}>Challenge deleted successfully</Alert>
                            )}
                            {deleteStatus === 'error' && (
                                <Alert severity="error" onClose={() => setDeleteStatus(null)}>Failed to delete challenge</Alert>
                            )}
                            {updateStatus === 'success' && (
                                <Alert severity="success" onClose={() => setDeleteStatus(null)}>Challenge updated successfully</Alert>
                            )}
                            {updateStatus === 'error' && (
                                <Alert severity="error" onClose={() => setDeleteStatus(null)}>Failed to update challenge</Alert>
                            )}
                            {addStatus === 'success' && (
                                <Alert severity="success" onClose={() => setDeleteStatus(null)}>Challenge added successfully</Alert>
                            )}
                            {addStatus === 'error' && (
                                <Alert severity="error" onClose={() => setDeleteStatus(null)}>Failed to add challenge</Alert>
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

                    <h3 className="font-bold text-lg">Update Challange</h3>
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>
                    {challangeData && (
                        <form className="" onSubmit={handleSubmit1(handleUpdateChallenge)}>
                            <textarea
                                className="textarea textarea-bordered w-full"
                                {...register1("description",
                                    { required: 'Description harus diisi' }
                                )}
                            />

                            {errors1.description && <p className="text-error mt-2">{errors1.description.message}</p>}

                            <div className="label">
                                <span className="label-text">Repeat Time</span>
                            </div>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register1("repeatTime",
                                    { required: 'Repeat time harus diisi' }
                                )}
                            />

                            <input
                                type="text"
                                className="input input-bordered w-full hidden"
                                {...register1("id")}
                            />

                            {errors1.repeatTime && <p className="text-error mt-2">{errors1.repeatTime.message}</p>}
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

                    <h3 className="font-bold text-lg">Add Challange</h3>
                    <div className="label">
                        <span className="label-text">Description</span>
                    </div>

                    <form className="" onSubmit={handleSubmit2(handleAddSubmitChallenge)}>

                        <textarea
                            className="textarea textarea-bordered w-full"
                            {...register2("descriptionAdd",
                                { required: 'Description harus diisi' }
                            )}
                        />

                        {errors2.descriptionAdd && <p className="text-error mt-2">{errors2.descriptionAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">Repeat Time</span>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            {...register2("repeatTimeAdd",
                                { required: 'Repeat time harus diisi' }
                            )}
                        />

                        {errors2.repeatTimeAdd && <p className="text-error mt-2">{errors2.repeatTimeAdd.message}</p>}

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

