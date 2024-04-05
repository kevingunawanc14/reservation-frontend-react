import Navbar from "../../components/navbar";
import Header from '../../components/header';

export default function Payment() {
    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Recently Transaction'} />
            </div>

            <div className="mx-10 mt-5 mb-10">
                <div className="card mb-3 flex justify-center shadow-xl bg-neutral">
                    <div className="card-body">
                        <p className="text-neutral-content">Lapangan Basket</p>
                        <p className="text-neutral-content">Rp. 50.000 </p>
                        <p className="text-neutral-content">Tanggal 4/4/2024</p>
                        <span className="badge badge-accent">Detail</span>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary ">Rate</button>
                            <button className="btn btn-primary ">Belum Dibayar</button>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
            </div>

            <Navbar />
        </>
    );
}