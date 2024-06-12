import Navbar from '../../components/navbar_admin.jsx';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
import Alert from '@mui/material/Alert';
import Header from '../../components/header';
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
} from '@mui/x-data-grid';
import { useForm } from "react-hook-form";
import axios from '../../api/axios';
import { TbListDetails } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import { BsQrCodeScan } from "react-icons/bs";
import dayjs from 'dayjs';

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
    const [detailOrder, setDetailOrder] = useState(null)
    const [deleteStatus, setDeleteStatus] = useState(null);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [imagePaymentProve, setImagePaymentProve] = useState(null);
    const [loadingStatus, setLoadingStatus] = useState(null);
    const [addStatus, setAddStatus] = useState(null);
    const navigate = useNavigate();


    const fetchData = async () => {
        try {

            const response = await axios.get('/order', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
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

    const handleUpdateChallenge = async (data) => {
        try {
            setLoadingStatus(true)

            const dataToSend = {
                paymentStatus: watch1('paymentStatus'),
            };

            const response = await axios.post(`/order/${data.id}/update`, dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

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

    const handleDetailJamOrder = async (id) => {
        try {
            const response = await axios.get(`/order/detail/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            document.getElementById('detailJamOrderModal').showModal();
            setDetailOrder(response.data)
        } catch (error) {
            console.log('error:', error);
        }
    }

    const handleDetailChallenge = async (id) => {
        try {

            const response = await axios.get(`/order/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


            setChallangeData(response.data[0])

        } catch (error) {
            console.log('error:', error);
        }
    }
    
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

    const { register: register1, handleSubmit: handleSubmit1, watch: watch1, setValue: setValue1, formState: { errors: errors1 } } = form1;

    const handleCloseModal = async () => {
        document.getElementById('detailChallange').close();
    }

    const handleDetailPaymentProve = async (imagePath) => {
        document.getElementById('paymentProve').showModal()
        console.log('imagePath', imagePath)
        // setImagePaymentProve('http://localhost:2000/api/images/' + imagePath);
        setImagePaymentProve('https://krakatausportcentrejombang.cloud/api/images/' + imagePath);

    }

    useEffect(() => {
        if (challangeData) {

            setValue1("username", challangeData.username)
            setValue1("productName", challangeData.productName)
            setValue1("paymentStatus", challangeData.paymentStatus)
            setValue1("paymentMethod", challangeData.paymentMethod)
            setValue1("createdAt", challangeData.createdAtDateFull)
            setValue1("id", challangeData.id)

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
            renderCell: (params) => (
                <div>
                    {params.row.paymentMethod === 'qris' ? (
                        <button className='btn btn-active' onClick={() => handleDetailPaymentProve(params.row.paymentProveImagePath)}><BsQrCodeScan fontSize={25} color='blue' />
                        </button>
                    ) : (
                        <button className='btn btn-active'><GiTakeMyMoney fontSize={25} color='green' />
                        </button>
                    )}
                </div>
            ),
            flex: 0.5,
        },
        {
            field: 'date',
            headerName: 'Tanggal Bermain',
            renderCell: (params) => (
                <div>
                    {params.row.date.split(" - ")[0] === dayjs().format('YYYY-MM-DD') ? (
                        <p className='text-error animate-pulse'>{params.row.date}</p>
                    ) : (
                        <p>{params.row.date}</p>

                    )}
                </div>
            ),
            flex: 1,
        },
        {
            field: 'createdAtDateFull',
            headerName: 'Tanggal Order',
            flex: 1,
        },
        {
            field: 'note',
            headerName: 'Note',
            flex: 1,
        },
        {
            field: 'membershipKTPImagePath',
            headerName: 'Foto',
            renderCell: (params) => (
                <div>
                    {params.row.membershipKTPImagePath !== null ? (
                        <div className="avatar">
                            <div className="w-20 rounded">
                                <img src={'https://krakatausportcentrejombang.cloud/api/images/' + params.row.membershipKTPImagePath} />
                                {/* <img src={'http://localhost:2000/api/images/' + params.row.membershipKTPImagePath} /> */}

                            </div>
                        </div>
                    ) : (
                        <p></p>
                    )
                    }
                </div >
            ),
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
                            {updateStatus === 'success' && (
                                <Alert severity="success" onClose={() => setUpdateStatus(null)}>Order updated successfully</Alert>
                            )}
                            {updateStatus === 'error' && (
                                <Alert severity="error" onClose={() => setUpdateStatus(null)}>Failed to update order</Alert>
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
                                disabled={challangeData.paymentStatus === "Lunas" || challangeData.paymentStatus === "Batal"}
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
                                <span className="label-text">Tanggal Order</span>
                            </div>

                            <input
                                type="text"
                                className="input input-bordered w-full"
                                {...register1("createdAt")}
                                disabled
                            />

                            {errors1.createdAtDateFull && <p className="text-error mt-2">{errors1.createdAtDateFull.message}</p>}

                            <div className="modal-action">
                                <button
                                    className={`btn btn-accent mx-1 ${loadingStatus ? 'btn-disabled skeleton' : ''}`}
                                    type='submit'
                                    disabled={challangeData.paymentStatus === "Lunas" || challangeData.paymentStatus === "Batal"}
                                >Update</button>
                                <button className="btn btn-primary" type='button' onClick={handleCloseModal}>Cancel</button>

                            </div>

                        </form>
                    )}
                </div>
            </dialog >

            <dialog id="detailJamOrderModal" className="modal">
                <div className={`modal-box`}>
                    <h3 className="font-bold text-lg">Detail Order</h3>
                    {detailOrder && (
                        <>
                            <div>
                                <p className='text-lg'>Tanggal: {detailOrder[0].date}</p>
                            </div>
                            {detailOrder[0].hour && (
                                <>
                                    <p className='text-lg'>Jam: </p>
                                    {detailOrder.map((item, index) => (
                                        <div key={index}>
                                            <div className="grid grid-cols-2 sm:grid-cols-4">
                                                <div>
                                                    <p className='text-lg font-semibold'>
                                                        {item.hour}

                                                    </p>
                                                </div>
                                                <div>
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
                                                </div>
                                            </div>

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

            <dialog id="paymentProve" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg"></h3>
                    <img src={imagePaymentProve} alt="buktiPembayaran" />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>


            <Navbar />
        </>
    );
}

