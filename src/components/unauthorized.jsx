
export default function Unauthorized() {
    return (
        <>
            <div className="hero min-h-screen bg-primary-content">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">401</h1>
                        <p className="py-6">Unauthorized</p>
                        <button className="btn btn-primary">Back</button>
                    </div>
                </div>
            </div>
        </>
    );
}