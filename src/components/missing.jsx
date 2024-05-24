import { useNavigate } from "react-router-dom";

export default function Missing() {
    const navigate = useNavigate();

    return (
        <>
            <div className="hero min-h-screen bg-primary-content">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">404</h1>
                        <p className="py-6">Page Not Found</p>
                        <button className="btn btn-primary" onClick={() => navigate('/')}>Back</button>
                    </div>
                </div>
            </div>
        </>
    );
}