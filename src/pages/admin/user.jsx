import Navbar from '../../components/navbar_admin.jsx';
import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Header from '../../components/header';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.jsx';
import { useNavigate, useLocation } from "react-router-dom";


export default function ListUser() {
    const [tableData, setTableData] = useState([])
    const [deleteStatus, setDeleteStatus] = useState(null);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axiosPrivate.get('/users')
            console.log(response.data);
            setTableData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:2000/users/${id}`, {
                method: 'DELETE',
            });
            // After successful deletion, refetch data to update the table
            fetchData();
            setDeleteStatus('success');
            setTimeout(() => {
                setDeleteStatus(null);
            }, 2000); // Automatically close the alert after 3 seconds

        } catch (error) {
            console.error('Error deleting user:', error);
            setDeleteStatus('error');
            setTimeout(() => {
                setDeleteStatus(null);
            }, 2000); // Automatically close the alert after 3 seconds

        }
    };

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
            field: 'Action',
            headerName: 'Action',
            renderCell: (params) => (
                <div className="flex justify-around">
                    <button className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Edit
                    </button>
                    <button className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-3">
                        View
                    </button>
                    {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDelete(params.row.id)}
                    >
                        Delete
                    </button> */}
                    <button className="btn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => document.getElementById('my_modal_1').showModal()}>Delete</button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Are you sure?</h3>
                            <p className="py-4">This action cannot be undone</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button onClick={() => handleDelete(params.row.id)} className="btn bg-red-500 hover:bg-red-700 text-white mx-1">Delete</button>
                                    <button className="btn">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </dialog>

                </div>
            ),
            flex: 0.5,
            sortable: false,
        },
    ];

    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'User'} />

                <div className="flex justify-end ...">
                    {deleteStatus === 'success' && (
                        <Alert severity="success" onClose={() => setDeleteStatus(null)}>User deleted successfully</Alert>
                    )}
                    {deleteStatus === 'error' && (
                        <Alert severity="error" onClose={() => setDeleteStatus(null)}>Failed to delete user</Alert>
                    )}
                </div>
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
                />
            </div>

            <Navbar />

        </>
    );
}

