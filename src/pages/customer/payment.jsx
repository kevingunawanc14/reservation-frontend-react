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
                        <h2 className="card-title">Jenis ?</h2>
                        <p>Lapangan ?</p>
                        <p>Rp. ? </p>
                        <p>Tanggal ?</p>
                        <span className="badge">Tipe ?</span>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Status ?</button>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="card mb-3 flex justify-center shadow-xl bg-neutral">
                    <div className="card-body">
                        <h2 className="card-title">Jenis ?</h2>
                        <p>Lapangan ?</p>
                        <p>Rp. ? </p>
                        <p>Tanggal ?</p>
                        <span className="badge">Tipe ?</span>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Status ?</button>
                        </div>
                    </div>
                </div>
                <div className="divider"></div>

            </div>

            <Navbar />
        </>
    );
}