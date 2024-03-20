import Navbar from "../../components/navbar";
import Header from '../../components/header.jsx';
import Avatar1 from '../../assets/avatar/avatar1.webp';
import { useState, useEffect } from 'react'

export default function DetailAccount() {

    const [theme, setTheme] = useState();

    const handleClick = (newTheme) => {
        document.documentElement.setAttribute('data-theme', newTheme);
        setTheme(newTheme);
    };




    return (
        <>
            <div className="mx-10 mt-5">
                <Header title={'Setting'} />
            </div>

            <div className="mx-10 mt-5 mb-5">

                <div className="collapse collapse-arrow bg-neutral">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        Detail Account
                    </div>
                    <div className="collapse-content">
                        <kbd className="kbd mx-2">Username: PRX</kbd>
                        <kbd className="kbd mx-2">Rank: PRX</kbd>
                        <kbd className="kbd mx-2">Xp: PRX</kbd>
                        <kbd className="kbd mx-2">Hp: PRX</kbd>
                        <kbd className="kbd mx-2">Coin: PRX</kbd>
                        <kbd className="kbd mx-2">Total Money Spend: PRX</kbd>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-neutral mt-3">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        Statistic
                    </div>
                    <div className="collapse-content">
                        <kbd className="kbd mx-2">Total Minute Workout: PRX</kbd>
                        <kbd className="kbd mx-2">Most Sport Played: PRX</kbd>
                        <kbd className="kbd mx-2">Type Sport: PRX</kbd>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-neutral mt-3">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        Achievement
                    </div>
                    <div className="collapse-content">
                        <div className="grid grid-cols-3">
                            <button className="btn btn-active btn-sm btn-success me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                            <button className="btn btn-active btn-error btn-sm me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                            <button className="btn btn-active btn-error btn-sm me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                            <button className="btn btn-active btn-sm btn-success me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                            <button className="btn btn-active btn-error btn-sm me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                            <button className="btn btn-active btn-error btn-sm me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                            <button className="btn btn-active btn-sm btn-success me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                            <button className="btn btn-active btn-error btn-sm me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                            <button className="btn btn-active btn-error btn-sm me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                            <button className="btn btn-active btn-sm btn-success me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                            <button className="btn btn-active btn-error btn-sm me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                            <button className="btn btn-active btn-error btn-sm me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                            <button className="btn btn-active btn-sm btn-success me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                            <button className="btn btn-active btn-error btn-sm me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                            <button className="btn btn-active btn-error btn-sm me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                        </div>
                        <div className="grid grid-cols-3 mt-2">
                            <button className="btn btn-active btn-sm btn-success me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                            <button className="btn btn-active btn-error btn-sm me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                            <button className="btn btn-active btn-error btn-sm me-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Pro Gym</button>
                        </div>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Status: ✅</h3>
                                <p className="py-4">order lapapngan 10x</p>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-neutral mt-3">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        Shop
                    </div>
                    <div className="collapse-content">
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-neutral mt-3">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium text-neutral-content">
                        Setting
                    </div>
                    <div className="collapse-content">
                        <button className="btn me-3">Log Out</button>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn me-3" onClick={() => document.getElementById('my_modal_3').showModal()}>Avatar</button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Pick ur avatar!</h3>
                                <div className="grid grid-cols-4 gap-4 justify-items-center mt-3">
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 mt-3 justify-items-center">
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer ">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-4 mt-3 justify-items-center">
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                    <div className="avatar">
                                        <div className="w-8 rounded-full  border-2 hover:border-black cursor-pointer">
                                            <img src={Avatar1} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>Theme</button>
                        <dialog id="my_modal_2" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Pick ur theme!</h3>
                                <div className="bg-slate-50 border-4 rounded-full flex justify-center hover:border-black cursor-pointer" onClick={() => handleClick("light")}>☀️</div>
                                <div className="bg-slate-900 border-4 rounded-full flex justify-center hover:border-black cursor-pointer" onClick={() => handleClick("dark")}>🐦‍⬛</div>
                                <div className="bg-green-950 border-4 rounded-full flex justify-center hover:border-black cursor-pointer" onClick={() => handleClick("forest")}>🌳</div>
                                <div className="bg-yellow-600 border-4 rounded-full flex justify-center mt-1 hover:border-black cursor-pointer" onClick={() => handleClick("cyberpunk")}>🤖</div>
                                <div className="bg-pink-600 border-4 rounded-full flex justify-center mt-1 hover:border-black cursor-pointer" onClick={() => handleClick("dracula")}>🧛‍♂️</div>
                                <div className="bg-lime-950 border-4 rounded-full flex justify-center mt-1 hover:border-black cursor-pointer" onClick={() => handleClick("lemonade")}>🐉</div>
                                <div className="bg-indigo-950 border-4 rounded-full flex justify-center mt-1 hover:border-black cursor-pointer" onClick={() => handleClick("synthwave")}>🌑</div>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>

                    </div>
                </div>

            </div>

            <Navbar />
        </>
    );
}