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
import { TbListDetails } from "react-icons/tb";

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
    const [tableData, setTableData] = useState([])
    const [challangeData, setChallangeData] = useState(null)
    const [detailOrder, setDetailOrder] = useState(null)
    const [deleteStatus, setDeleteStatus] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [addStatus, setAddStatus] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [theme, setTheme] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const [courtData, setCourtData] = useState([])
    const hours = [
        '6.00-7.00', '7.00-8.00', '8.00-9.00',
        '9.00-10.00', '10.00-11.00', '11.00-12.00',
        '12.00-13.00', '13.00-14.00', '14.00-15.00',
        '15.00-16.00', '16.00-17.00', '17.00-18.00',
        '18.00-19.00', '19.00-20.00', '20.00-21.00',
        '21.00-22.00', '22.00-23.00', '23.00-24.00'
    ];


    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:2000/order', {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });
            setTableData(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

        }
    };

    const getDataProduct = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get('http://localhost:2000/product', {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            });
            setCourtData(response.data)
        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

        }
    };

    const handleDeleteProduct = async (id) => {
        try {

            const response = await axios.delete(`http://localhost:2000/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            })
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
            const dataToSend = {
                paymentStatus: watch1('paymentStatus'),
            };


            const response = await axios.post(`http://localhost:2000/order/${data.id}/update`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            })

            console.log(response);

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

    const handleDetailJamOrder = async (id) => {
        try {
            console.log('id', id);
            const response = await axios.get(`http://localhost:2000/order/detail/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log('response', response);
            setDetailOrder(response.data)



        } catch (error) {
            console.log('error:', error);
        }
    }

    const handleDetailChallenge = async (id) => {
        try {
            const token = localStorage.getItem('token');

            const response = await axios.get(`http://localhost:2000/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Use Bearer scheme for JWTs
                }
            })

            console.log('response', response);
            console.log('response.data', response.data);
            console.log('response.data[0].productName', response.data[0].productName);

            console.log('challangeData', challangeData);

            setChallangeData(response.data[0])

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
        console.log('data', data);
        // try {
        //     await axios.post(`/order/add`, {
        //         username: data.usernameAdd,
        //         paymentStatus: data.paymentStatusAdd,
        //         paymentMethod: data.paymentMethodAdd,
        //     });
        //     fetchData();
        //     setAddStatus('success');
        //     setTimeout(() => {
        //         setAddStatus(null);
        //     }, 2000);
        //     document.getElementById('addChallange').close();

        // } catch (error) {
        //     setAddStatus('error');
        //     setTimeout(() => {
        //         setAddStatus(null);
        //     }, 2000);

        // }

    }

    const handleCloseModal = async () => {
        document.getElementById('detailChallange').close();
        document.getElementById('addChallange').close();
    }

    useEffect(() => {
        if (challangeData) {

            setValue1("username", challangeData.username)
            setValue1("productName", challangeData.productName)
            setValue1("paymentStatus", challangeData.paymentStatus)
            setValue1("paymentMethod", challangeData.paymentMethod)
            setValue1("createdAt", challangeData.detailDate)
            setValue1("id", challangeData.id)

            document.getElementById('detailChallange').showModal()

        }
    }, [challangeData]);

    useEffect(() => {
        if (detailOrder) {
            console.log(detailOrder);
            console.log(detailOrder.length);
            document.getElementById('detailJamOrderModal').showModal();
        }
    }, [detailOrder]);


    useEffect(() => {
        fetchData();
        getDataProduct();
    }, []);

    const isDarkTheme = document.documentElement.getAttribute("data-theme") === 'dracula' || document.documentElement.getAttribute("data-theme") === 'dark'
    console.log('isDarkTheme', isDarkTheme)

    const columns = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 0.5,
        },
        {
            field: 'username',
            headerName: 'Username',
            flex: 0.5,
        },
        {
            field: 'productName',
            headerName: 'Product Name',
            flex: 1,
        },
        {
            field: 'totalPrice',
            headerName: 'Total Price',
            flex: 0.5,
        },
        {
            field: 'paymentStatus',
            headerName: 'Payment Status',
            flex: 0.5,
        },
        {
            field: 'paymentMethod',
            headerName: 'Payment Method',
            flex: 0.5,
        },
        {
            field: 'detailDate',
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

                    <button className="btn btn-error mx-1" onClick={() => handleDeleteModal(params.row.id)}>
                        <MdDeleteOutline fontSize="1.5em" color='white' />
                    </button>

                    <button className="btn btn-info" onClick={() => handleDetailJamOrder(params.row.connectHistory)}>
                        <TbListDetails fontSize="1.5em" color='white' />
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
                {/* <button className="btn btn-primary mx-1" onClick={handleAddChallenge}>
                    <IoMdAddCircleOutline fontSize="1.5em" color='white' />
                </button> */}
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
                    // disableColumnMenu
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

                    {challangeData && (
                        <form className="" onSubmit={handleSubmit1(handleUpdateChallenge)}>
                            <div className="label">
                                <span className="label-text">Username</span>
                            </div>

                            <input
                                type='text'
                                className="input input-bordered w-full"
                                {...register1("username",
                                    { required: 'Username harus diisi' }
                                )}
                                disabled
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
                                disabled
                            />

                            {errors1.productName && <p className="text-error mt-2">{errors1.productName.message}</p>}



                            <div className="label">
                                <span className="label-text">Payment Status</span>
                            </div>

                            <select
                                className="select select-bordered w-full"
                                {...register1("paymentStatus")} >
                                <option disabled >What kind of payment status ?</option>
                                <option value={'Belum dibayar'}>Belum dibayar</option>
                                <option value={'Sedang diverifikasi'}>Sedang diverifikasi</option>
                                <option value={'Lunas'}>Lunas</option>
                                <option value={'Batal'}>Batal</option>
                            </select>

                            {errors1.paymentStatus && <p className="text-error mt-2">{errors1.paymentStatus.message}</p>}

                            <div className="label">
                                <span className="label-text">Payment Method</span>
                            </div>

                            <select
                                disabled
                                className="select select-bordered w-full"
                                {...register1("paymentMethod")} >
                                <option disabled >What kind of payment method ?</option>
                                <option value={'cash'}>Cash</option>
                                <option value={'qris'}>QRIS</option>
                                <option value={'krakataucoin'}>Krakatau Coin</option>
                            </select>

                            {errors1.paymentMethod && <p className="text-error mt-2">{errors1.paymentMethod.message}</p>}

                            <div className="label">
                                <span className="label-text">Created At</span>
                            </div>

                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register1("createdAt")}
                                disabled
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


                    <form className="" onSubmit={handleSubmit2(handleAddSubmitChallenge)}>
                        <div className="label">
                            <span className="label-text">Username</span>
                        </div>
                        <input
                            type='text'
                            className="input input-bordered w-full"
                            {...register2("usernameAdd",
                                { required: 'Username harus diisi' }
                            )}
                        />

                        {errors2.usernameAdd && <p className="text-error mt-2">{errors2.usernameAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">Product Name</span>
                        </div>
                        <select
                            className="select select-bordered w-full"
                            {...register2("productNameAdd",
                                { required: 'Select one kind product' }
                            )}
                        >
                            <option disabled >What type of product ?</option>
                            <option>Lapangan</option>
                            <option>Fasilitas</option>
                            {/* {courtData.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.nameDetail} - {option.price}
                                </option>
                            ))} */}
                        </select>

                        {errors2.productNameAdd && <p className="text-error mt-2">{errors2.productNameAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">List Fasilitas</span>
                        </div>
                        <select
                            className="select select-bordered w-full"
                            {...register2("productNameAdd",
                                { required: 'Select one kind product' }
                            )}
                        >
                            <option disabled >What type of product ?</option>
                            <option>Lapangan</option>
                            <option>Fasilitas</option>
                            {/* {courtData.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.nameDetail} - {option.price}
                                </option>
                            ))} */}
                        </select>

                        {errors2.productNameAdd && <p className="text-error mt-2">{errors2.productNameAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">List Lapangan</span>
                        </div>
                        <select
                            className="select select-bordered w-full"
                            {...register2("productNameAdd",
                                { required: 'Select one kind product' }
                            )}
                        >
                            <option disabled >What type of product ?</option>
                            <option>Lapangan</option>
                            <option>Fasilitas</option>
                            {/* {courtData.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.nameDetail} - {option.price}
                                </option>
                            ))} */}
                        </select>

                        {errors2.productNameAdd && <p className="text-error mt-2">{errors2.productNameAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">Pilih Jam Pemesanan Lapangan</span>
                        </div>
                        <select
                            className="select select-bordered w-full h-20 "
                            {...register2("productNameAdd",
                                { required: 'Select one kind product' }
                            )}
                            style={{ height: '200px' }} // Inline style to set height
                            multiple
                        >
                            <option disabled >What type of product ?</option>
                            {hours.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))}
                            {/* {courtData.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.nameDetail} - {option.price}
                                </option>
                            ))} */}
                        </select>

                        {errors2.productNameAdd && <p className="text-error mt-2">{errors2.productNameAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">Pilih Waktu Pemesanan Fasilitas</span>
                        </div>
                        <select
                            className="select select-bordered w-full"
                            {...register2("productNameAdd",
                                { required: 'Select one kind product' }
                            )}
                        >
                            <option disabled >What type of product ?</option>
                            <option>Lapangan</option>
                            <option>Fasilitas</option>
                            {/* {courtData.map((option, index) => (
                                <option key={index} value={option.id}>
                                    {option.nameDetail} - {option.price}
                                </option>
                            ))} */}
                        </select>

                        {errors2.productNameAdd && <p className="text-error mt-2">{errors2.productNameAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">Payment Status</span>
                        </div>

                        <select
                            className="select select-bordered w-full"
                            {...register2("paymentMethodAdd",
                                { required: 'Select one payment method' }
                            )} >
                            <option disabled >What kind of payment status ?</option>
                            <option value={'Belum dibayar'}>Belum dibayar</option>
                            <option value={'Sedang diverifikasi'}>Sedang diverifikasi</option>
                            <option value={'Lunas'}>Lunas</option>
                            <option value={'Batal'}>Batal</option>
                        </select>

                        {errors2.paymentMethodAdd && <p className="text-error mt-2">{errors2.paymentMethodAdd.message}</p>}

                        <div className="label">
                            <span className="label-text">Payment Method</span>
                        </div>

                        <select
                            className="select select-bordered w-full"
                            {...register2("paymentStatusAdd",
                                { required: 'Select one payment status' }
                            )} >
                            <option disabled >What kind of payment method ?</option>
                            <option value={'Cash'}>Cash</option>
                            <option value={'QRIS'}>QRIS</option>
                            <option value={'Coin'}>Krakatau Coin</option>
                        </select>


                        {errors2.paymentStatusAdd && <p className="text-error mt-2">{errors2.paymentStatusAdd.message}</p>}

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

            <dialog id="detailJamOrderModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Detail Order</h3>
                    {detailOrder && (
                        <>
                            <div>
                                <p className='text-lg'>Tanggal: {detailOrder[0].date}</p>
                            </div>
                            {detailOrder.length > 1 || detailOrder[0].hour && (
                                <>
                                    <p className='text-lg'>Jam: </p>
                                    {detailOrder.map((item, index) => (
                                        <div key={index}>
                                            <p className='text-lg'>
                                                {item.hour}
                                                {(() => {
                                                    const hour = parseFloat(item.hour.split("-")[0]);
                                                    if (hour >= 6 && hour < 15) {
                                                        return <span>🏙️</span>;
                                                    } else if (hour >= 15 && hour < 17) {
                                                        return <span>🌇</span>;
                                                    } else {
                                                        return <span>🌆</span>;
                                                    }
                                                })()}
                                            </p>
                                        </div>
                                    ))}
                                </>
                            )}

                        </>
                    )}

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>



            <Navbar />
        </>
    );
}

