import Navbar from '../../components/navbar_admin.jsx';
import Header from '../../components/header';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from '../../api/axios';
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from 'dayjs';

export default function Dashboard() {
    const token = localStorage.getItem('token');

    const navigate = useNavigate();
    const [stats, setStats] = useState(null);

    const [value, setValue] = useState({
        startDate: dayjs().subtract(7, 'days').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD')
    });

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    useEffect(() => {
        fetchData();
    }, [value]); 

    const fetchData = async () => {
        console.log('value.startDate', value.startDate)
        console.log('value.endDate', value.endDate)

        try {
            const response = await axios.get('/dashboard', {
                params: {
                    startDate: value.startDate,
                    endDate: value.endDate
                },
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
                        <Datepicker
                            value={value}
                            onChange={handleValueChange}
                            showShortcuts={true}
                            showFooter={true}
                            readOnly={true}
                            i18n={"id"}
                            configs={{
                                shortcuts: {
                                    today: `Today`,
                                    yesterday: `Yesterday`,
                                    next7Days: {
                                        text: 'Next 7 Days',
                                        period: {
                                            start: dayjs().format('YYYY-MM-DD'),
                                            end: dayjs().add(7, 'days').format('YYYY-MM-DD')
                                        },
                                    },
                                    next14Days: {
                                        text: 'Next 14 Days',
                                        period: {
                                            start: dayjs().format('YYYY-MM-DD'),
                                            end: dayjs().add(14, 'days').format('YYYY-MM-DD')
                                        },
                                    },
                                    past: (period) => `Last ${period} days`,
                                    thisWeek: {
                                        text: 'This Week',
                                        period: {
                                            start: dayjs().startOf('week').format('YYYY-MM-DD'),
                                            end: dayjs().endOf('week').format('YYYY-MM-DD')
                                        },
                                    },
                                    currentMonth: `This month`,
                                    pastMonth: `Last month`,
                                    thisYear: {
                                        text: 'This Year',
                                        period: {
                                            start: dayjs().startOf('year').format('YYYY-MM-DD'),
                                            end: dayjs().endOf('year').format('YYYY-MM-DD')
                                        },
                                    },
                                    lastYear: {
                                        text: 'Last Year',
                                        period: {
                                            start: dayjs().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
                                            end: dayjs().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')
                                        },
                                    },
                                    allTime: {
                                        text: 'All Time',
                                        period: {
                                            start: dayjs('2019-01-01').format('YYYY-MM-DD'),  // Example start date, adjust as needed
                                            end: dayjs().format('YYYY-MM-DD')
                                        },
                                    },

                                }
                            }}
                        />
                        <div className="grid sm:grid-cols-4 gap-4 ">
                            <div className='self-center'>
                                <div className="stats shadow bg-accent w-full">
                                    <div className="stat">
                                        <div className="stat-title font-semibold text-accent-content">Total Reservation</div>
                                        <div className="stat-value  text-accent-content mb-3">{stats.totalReservationsToday}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='self-center '>
                                <div className="stats shadow bg-accent w-full">
                                    <div className="stat">
                                        <div className="stat-title font-semibold text-accent-content">Total Revenue</div>
                                        <div className="stat-value  text-accent-content mb-3">{stats.totalRevenue[0]}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-2 justify-self-center '>
                                <p className="font-semibold mt-5 mb-3">Comparison Product Order </p>
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
                                <p className="font-semibold ">Reservation </p>
                                <LineChart
                                    xAxis={[{
                                        scaleType: 'point',
                                        data: stats.arrOrderThisWeek[1]
                                    }]}
                                    series={[
                                        {
                                            data:
                                                Object.values(stats.arrOrderThisWeek[0]),
                                        },
                                    ]}
                                    width={500}
                                    height={300}
                                />
                            </div>
                            <div className=''>
                                <p className="font-semibold ">Revenue </p>
                                <LineChart
                                    xAxis={[
                                        {
                                            scaleType: 'point',
                                            data: stats.arrRevenueThisWeek[1],
                                        },
                                    ]}
                                    series={[
                                        {
                                            data:
                                                Object.values(stats.arrOrderThisWeek[0]),

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
                        <span className="loading loading-dots loading-lg"></span>

                    </div>
                </div>
            )}

            <Navbar />

        </>
    );
}

