import Navbar from '../../components/navbar_admin.jsx';
import Header from '../../components/header';
import { DataGrid } from '@mui/x-data-grid';

export default function MoneyManagement() {
    return (
        <>
            <div className="mx-10 mt-5">

                <Header title={'Court'} />

                <Navbar />
            </div>

            <div className="mx-10 mt-5 mb-5">
                {/* <DataGrid
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
                /> */}
            </div>


        </>
    );
}