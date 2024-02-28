import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/header';

export default function Login() {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors }, clearErrors,
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
            phoneNumber: ''
        }
    });

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [mode, setMode] = useState('login');

    const toggleMode = () => {
        setMode(prevMode => prevMode === 'login' ? 'register' : 'login');
        clearErrors(["username", "password", "phoneNumber"])
    };

    const login = async (data) => {
        const dataToSend = { username: data.username, password: data.password };
        try {
            const response = await fetch(`http://localhost:2000/login`, {
                method: 'Post',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(dataToSend)
            });

            const data = await response.json();
            const accessToken = data.accessToken;
            const roles = data.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const registerAccount = async (data) => {
        const dataToSend = { username: data.username, password: data.password, phoneNumber: data.phoneNumber };
        console.log('dataToSend', dataToSend)
        try {
            const response = await fetch(`http://localhost:2000/register`, {
                method: 'Post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataToSend)
            });

            const data = await response.json();
            console.log('data', data)
            console.log('data1', JSON.stringify(data))

            // const accessToken = data.accessToken;
            // const roles = data.role;

            // setAuth({ user, roles, accessToken });
            // setUser('');
            // navigate(from, { replace: true });

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <div className="h-screen grid content-center ">
                <div className="flex justify-center">
                    <Header title={'Welcome'} />
                </div>
                {mode === 'login' ? (
                    <form className="" onSubmit={handleSubmit(login)}>
                        <div className="flex justify-center">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Username</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("username",
                                        { required: 'Username harus diisi' }
                                    )}
                                />
                                {errors.username && <p className="text-red-500 mt-2">{errors.username.message}</p>}
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Password</span>
                                </div>
                                <input
                                    type="password"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("password",
                                        { required: 'Password harus diisi' }
                                    )}
                                />
                                {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
                            </label>
                        </div>
                        <div className="grid justify-items-center">
                            <button className="btn btn-primary mt-3 " type='submit'>Login</button>
                            <p className="cursor-pointer mt-2" onClick={toggleMode}>Don't have account Sign Up</p>
                        </div>

                    </form>
                ) : (
                    <form className="" onSubmit={handleSubmit(registerAccount)}>
                        <div className="flex justify-center">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Username</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("username",
                                        { required: 'Username harus diisi' }
                                    )}
                                />
                                {errors.username && <p className="text-red-500 mt-2">{errors.username.message}</p>}
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Password</span>
                                </div>
                                <input
                                    type="password"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("password",
                                        { required: 'Password harus diisi' }
                                    )}
                                />
                                {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Nomor Telepon</span>
                                </div>
                                <input
                                    type="number"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("phoneNumber",
                                        { required: 'Nomor telepon harus diisi' }
                                    )}
                                />
                                {errors.phoneNumber && <p className="text-red-500 mt-2">{errors.phoneNumber.message}</p>}
                            </label>
                        </div>
                        <div className="grid justify-items-center">
                            <button className="btn btn-primary mt-3 " type='submit'>Register</button>
                            <p className="cursor-pointer mt-2" onClick={toggleMode}>Have an account? Sign In</p>
                        </div>
                    </form>
                )}
            </div>



        </>
    );
}