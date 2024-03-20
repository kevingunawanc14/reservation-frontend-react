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
                        <h2 className="card-title text-neutral-content">Jenis ?</h2>
                        <p className="text-neutral-content">Lapangan ?</p>
                        <p className="text-neutral-content">Rp. ? </p>
                        <p className="text-neutral-content">Tanggal ?</p>
                        <span className="badge badge-accent">Tipe ?</span>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary ">Rate</button>
                            <button className="btn btn-primary ">Status ?</button>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
            </div>

            <Navbar />
        </>
    );
}