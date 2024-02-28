import Navbar from "../../components/navbar";

export default function DetailAccount() {
    return (
        <>

            {/* <div className=" ">
                <div className="avatar flex justify-center">
                    <div className="w-24 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <p>Statistik</p>
                <div className="grid grid-cols-2 gap-2">
                    <div className="stats shadow">

                        <div className="stat">
                            <div className="stat-title">Total Likes</div>
                            <div className="stat-value text-primary">25.6K</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>



                    </div>
                    <div className="stats shadow">

                        <div className="stat">
                            <div className="stat-title">Total Likes</div>
                            <div className="stat-value text-primary">25.6K</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>



                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="stats shadow">

                        <div className="stat">
                            <div className="stat-title">Total Likes</div>
                            <div className="stat-value text-primary">25.6K</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>



                    </div>
                    <div className="stats shadow">

                        <div className="stat">
                            <div className="stat-title">Total Likes</div>
                            <div className="stat-value text-primary">25.6K</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>



                    </div>
                </div>
                <p>Pencapaian</p>
                <div className="grid grid-cols-2 gap-2">
                    <button className="btn">
                        Gym Addict
                        <div className="badge badge-success "></div>
                    </button>
                    <button className="btn " disabled="disabled">
                        Gym Addict
                        <div className="badge badge-error"></div>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <button className="btn">
                        Gym Addict
                        <div className="badge badge-accent"></div>
                    </button>
                    <button className="btn">
                        Gym Addict
                        <div className="badge badge-accent"></div>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                    <button className="btn">
                        Gym Addict
                        <div className="badge badge-accent"></div>
                    </button>
                    <button className="btn">
                        Gym Addict
                        <div className="badge badge-accent"></div>
                    </button>
                </div>
            </div> */}

            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    Detail Account
                </div>
                <div className="collapse-content">
                    <p>hello</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    Statistic
                </div>
                <div className="collapse-content">
                    <p>hello</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    Achivment
                </div>
                <div className="collapse-content">
                    <p>hello</p>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    Shop
                </div>
                <div className="collapse-content">
                    <button className="btn">Log Out</button>
                </div>
            </div>
            <div className="collapse collapse-arrow bg-base-200 mb-20">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    Setting
                </div>
                <div className="collapse-content">
                    <button className="btn">Log Out</button>
                </div>
            </div>

            <Navbar />
        </>
    );
}