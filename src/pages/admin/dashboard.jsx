import Navbar from '../../components/navbar_admin.jsx';
import Header from '../../components/header';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from '../../api/axios';

export default function Dashboard() {
    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const [stats, setStats] = useState(null);


    const fetchData = async () => {
        try {


            const response = await axios.get('/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setStats(response.data)


        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.message === 'Request failed with status code 401') {
                navigate('/unauthorized')
            } else {
                navigate('/login');
            }

        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Dashboard'} />
            </div>

            {stats ? (
                <>
                    <div className="mx-10 mt-5">
                        <div className="grid sm:grid-cols-4 gap-4 ">
                            <div className='self-center'>
                                <div className="stats shadow bg-accent w-full">
                                    <div className="stat">
                                        <div className="stat-title font-semibold text-accent-content">Total Reservation Today</div>
                                        <div className="stat-value  text-accent-content mb-3">{stats.totalReservationsToday}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='self-center '>
                                <div className="stats shadow bg-accent w-full">
                                    <div className="stat">
                                        <div className="stat-title font-semibold text-accent-content">Total Revenue Today</div>
                                        <div className="stat-value  text-accent-content mb-3">{stats.totalRevenue[0]}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-2 justify-self-center '>
                                <p className="font-semibold ">Comparison Product Order All Time</p>
                                <div className=''>
                                    <PieChart
                                        series={[
                                            {
                                                data: [
                                                    { id: 0, value: stats.totalProductsBySport.lapanganBadmintonCount, label: 'Badminton' },
                                                    { id: 1, value: stats.totalProductsBySport.lapanganFutsalCount, label: 'Futsal' },
                                                    { id: 2, value: stats.totalProductsBySport.lapanganBasketCount, label: 'Basketball' },
                                                    { id: 3, value: stats.totalProductsBySport.gym, label: 'Gym' },
                                                    { id: 4, value: stats.totalProductsBySport.kolamRenang, label: 'Swimming' },
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
                    <div className="mx-10 mt-5 mb-20">
                        <div className="grid sm:grid-cols-2 justify-items-center">
                            <div>
                                <p className="font-semibold ">Reservation This Week</p>
                                <LineChart
                                    xAxis={[{
                                        scaleType: 'point', data: stats.arrOrderThisWeek[1]
                                    }]}
                                    series={[
                                        {
                                            data:
                                                [stats.arrOrderThisWeek[0][stats.arrOrderThisWeek[1][0]],
                                                stats.arrOrderThisWeek[0][stats.arrOrderThisWeek[1][1]],
                                                stats.arrOrderThisWeek[0][stats.arrOrderThisWeek[1][2]],
                                                stats.arrOrderThisWeek[0][stats.arrOrderThisWeek[1][3]],
                                                stats.arrOrderThisWeek[0][stats.arrOrderThisWeek[1][4]],
                                                stats.arrOrderThisWeek[0][stats.arrOrderThisWeek[1][5]]],
                                        },
                                    ]}
                                    width={500}
                                    height={300}
                                />
                            </div>
                            <div className=''>
                                <p className="font-semibold ">Revenue This Week</p>
                                <BarChart
                                    xAxis={[
                                        {
                                            id: 'barCategories',
                                            data: stats.arrRevenueThisWeek[1],
                                            scaleType: 'band',
                                        },
                                    ]}
                                    series={[
                                        {
                                            data:
                                                [stats.arrRevenueThisWeek[0][stats.arrRevenueThisWeek[1][0]],
                                                stats.arrRevenueThisWeek[0][stats.arrRevenueThisWeek[1][1]],
                                                stats.arrRevenueThisWeek[0][stats.arrRevenueThisWeek[1][2]],
                                                stats.arrRevenueThisWeek[0][stats.arrRevenueThisWeek[1][3]],
                                                stats.arrRevenueThisWeek[0][stats.arrRevenueThisWeek[1][4]],
                                                stats.arrRevenueThisWeek[0][stats.arrRevenueThisWeek[1][5]]],
                                        },
                                    ]}
                                    width={500}
                                    height={300}
                                    margin={{ top: 30, bottom: 30, left: 60, right: 10 }}
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex justify-center items-center h-screen  ">
                    <div>
                        <p className="text-base font-mono">Loading...</p>
                    </div>
                </div>
            )}

            <Navbar />

        </>
    );
}

