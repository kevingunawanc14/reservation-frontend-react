import Navbar from '../../components/navbar_admin.jsx';
import Header from '../../components/header';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'
import {
    GridToolbarContainer,
    GridToolbarFilterButton,
    GridToolbarExport,
} from '@mui/x-data-grid';
import { MdOutlineEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from '../../hooks/useAxiosPrivate.jsx';

export default function Dashboard() {

    const [tableData, setTableData] = useState([])
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();



    const fetchData = async () => {
        try {
            const response = await axiosPrivate.get('/dashboard')
            console.log('response', response)

        } catch (error) {
            console.error('Error fetching data:', error);
            navigate('/login', { state: { from: location }, replace: true });

        }
    };

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
        // {
        //     field: 'Action',
        //     headerName: 'Action',
        //     renderCell: (params) => (
        //         <div className="flex justify-around">
        //             <button className="btn btn-primary mx-1" onClick={() => handleDetailChallenge(params.row.id)}>
        //                 <MdOutlineEdit fontSize="1.5em" color='white' />
        //             </button>

        //             <button className="btn btn-error" onClick={() => document.getElementById('deleteModal').showModal()}>
        //                 <MdDeleteOutline fontSize="1.5em" color='white' />
        //             </button>
        //             <dialog id="deleteModal" className="modal">
        //                 <div className="modal-box">
        //                     <h3 className="font-bold text-lg">Are you sure?</h3>
        //                     <p className="py-4">This action cannot be undone</p>
        //                     <div className="modal-action">
        //                         <form method="dialog" >
        //                             <button onClick={() => handleDeleteChallange(params.row.id)} className="btn btn-error mx-1">Delete</button>
        //                             <button className="btn btn-primary">Cancel</button>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </dialog>

        //         </div >
        //     ),
        //     flex: 1,
        //     sortable: false,
        // },
    ];

    return (
        <>


            <div className="mx-10 mt-5">

                <Header title={'Dashboard'} />

            </div>

            <div className="mx-10 mt-5">

                <div className="grid grid-cols-4 gap-4 ">
                    <div className='self-center'>
                        <div className="stats shadow w-full bg-accent">
                            <div className="stat">
                                <div className="stat-title font-semibold text-accent-content">Total Reservation Today</div>
                                <div className="stat-value  text-accent-content">77</div>
                                <div className="stat-desc  text-accent-content">1% more than yesterday</div>
                            </div>
                        </div>
                    </div>
                    <div className='self-center'>
                        <div className="stats shadow w-full bg-accent ">
                            <div className="stat">
                                <div className="stat-title font-semibold text-accent-content">Total Revenue Today</div>
                                <div className="stat-value  text-accent-content">Rp. 300.000</div>
                                <div className="stat-desc  text-accent-content">10% more than yesterday</div>
                            </div>

                        </div>
                    </div>
                    <div className='col-span-2 justify-self-center '>
                        <p className="font-semibold ">Comparison Product Order</p>
                        <div className=''>
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 10, label: 'Basketball' },
                                            { id: 1, value: 15, label: 'Football' },
                                            { id: 2, value: 20, label: 'Swimming' },
                                            { id: 3, value: 10, label: 'Gym' },
                                        ],
                                    },
                                ]}
                                width={500}
                                height={200}
                            />
                        </div>
                    </div>
                </div>

            </div>

            <div className="mx-10 mt-5">
                <div className="grid grid-cols-2 justify-items-center">
                    <div>
                        <p className="font-semibold ">Total Visitor This Week</p>

                        <LineChart
                            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                            series={[
                                {
                                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                                },
                            ]}
                            width={500}
                            height={300}
                        />

                    </div>
                    <div>
                        <p className="font-semibold ">Total Earning This Week</p>

                        <BarChart
                            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                            width={500}
                            height={300}
                        />


                    </div>
                </div>
            </div>



            <div className="mx-10 mt-5 mb-20">
                <p className="font-semibold ">List Unpaid Reservation</p>

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


            <Navbar />


        </>
    );
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarFilterButton />
            <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
        </GridToolbarContainer>
    );
}