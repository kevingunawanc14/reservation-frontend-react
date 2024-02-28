import Navbar from "../../components/navbar";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import Header from '../../components/header';




export default function Leaderboard() {

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/price/1`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHeader(data[0].header);
                setFontFamily(
                    {
                        headerPrice: data[0].fontTypeHeader,
                        descriptionPrice: data[0].fontTypeBenefit,
                    }
                );
                setPrice({
                    price1:
                    {
                        title: data[0].newPrice,
                        description: data[0].newDesc.split(",")
                    },
                    price2: {
                        title: data[1].newPrice,
                        description: data[1].newDesc.split(",")
                    },
                    price3: {
                        title: data[2].newPrice,
                        description: data[2].newDesc.split(",")
                    },
                });
                // console.log('1', price);
                // setPriceDescription([])
                // console.log('1', data);
            } catch (error) {
                console.log(error)
            }

        };

        fetchUserData();

    }, [])

    const columns = [
        {
            field: 'Rank',
            flex: 1,
            minWidth: 150,
            headerAlign: 'center',
            align: 'center',
            sortable: false
        },
        {
            field: 'Rating',
            flex: 1,
            width: 200,
            sortable: false
        },
        {
            field: 'Total Reservation',
            flex: 1,
            minWidth: 50,
            headerAlign: 'center',
            align: 'center',
            sortable: false
        },
    ];


    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Leaderboard'} />
            </div>

            {/* <Button variant="contained">Contained</Button> */}

            <div className="mb-20">
                <DataGrid
                    initialState={{
                        pagination: { paginationModel: { pageSize: 9 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    columns={columns}
                    rows={[
                        { id: 1, Rank: 'Gold', Rating: 'React', 'Total Reservation': 1 },
                        { id: 2, Rank: 'Gold', Rating: 'MUI', 'Total Reservation': 1 },
                        { id: 3, Rank: 'Silver', Rating: 'Vue', 'Total Reservation': 2 },
                        { id: 4, Rank: 'Silver', Rating: 'Angular', 'Total Reservation': 3 },
                        { id: 5, Rank: 'Bronze', Rating: 'Svelte', 'Total Reservation': 1 },
                        { id: 6, Rank: 'Bronze', Rating: 'Ember', 'Total Reservation': 2 },
                        { id: 7, Rank: 'Gold', Rating: 'Next.js', 'Total Reservation': 2 },
                        { id: 8, Rank: 'Gold', Rating: 'Gatsby', 'Total Reservation': 3 },
                        { id: 9, Rank: 'Silver', Rating: 'Backbone', 'Total Reservation': 1 },
                        { id: 10, Rank: 'Silver', Rating: 'Express.js', 'Total Reservation': 2 },
                        { id: 11, Rank: 'Bronze', Rating: 'Meteor', 'Total Reservation': 1 },
                        { id: 12, Rank: 'Bronze', Rating: 'Polymer', 'Total Reservation': 2 },
                        { id: 13, Rank: 'Gold', Rating: 'Redux', 'Total Reservation': 2 },
                        { id: 14, Rank: 'Gold', Rating: 'Apollo', 'Total Reservation': 3 },
                        // { id: 15, Rank: 'Silver', Rating: 'Knockout.js', 'Total Reservation': 1 },
                        // { id: 16, Rank: 'Silver', Rating: 'Socket.io', 'Total Reservation': 2 },
                        // { id: 17, Rank: 'Bronze', Rating: 'Electron', 'Total Reservation': 1 },
                        // { id: 18, Rank: 'Bronze', Rating: 'D3.js', 'Total Reservation': 2 },
                        // { id: 19, Rank: 'Gold', Rating: 'GraphQL', 'Total Reservation': 2 },
                        // { id: 20, Rank: 'Gold', Rating: 'Webpack', 'Total Reservation': 3 },
                        // { id: 21, Rank: 'Silver', Rating: 'Nuxt.js', 'Total Reservation': 1 },
                        // { id: 22, Rank: 'Silver', Rating: 'Fastify', 'Total Reservation': 2 }

                    ]}
                    disableColumnMenu
                />
            </div>






            <Navbar />
        </>
    );
}