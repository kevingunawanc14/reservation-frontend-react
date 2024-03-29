import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useState, useEffect } from 'react';


export default function Login() {
    const [registerStatus, setRegisterStatus] = useState(null);
    const [loginStatus, setLoginStatus] = useState(null);
    const navigate = useNavigate();
    const [mode, setMode] = useState('login');
    const { register, handleSubmit, formState: { errors }, reset, clearErrors,
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
            phoneNumber: ''
        }
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            navigate('/')
        }


    }, [])


    const toggleMode = () => {
        setMode(prevMode => prevMode === 'login' ? 'register' : 'login');
        clearErrors(["username", "password", "phoneNumber"])
        reset();
    };

    const login = async (data) => {
        const dataToSend = { username: data.username, password: data.password };
        try {
            const response = await axios.post('http://localhost:2000/login', dataToSend);

            console.log('response', response);

            const token = response.data.token; // Ambil token dari respons
            localStorage.setItem('token', token); // Simpan token ke local storage

            navigate('/');

            setLoginStatus('success');
            setTimeout(() => {
                setLoginStatus(null);
            }, 2000);

        } catch (error) {
            console.error('Error:', error);
            setLoginStatus('error');
            setTimeout(() => {
                setLoginStatus(null);
            }, 2000);
        }
    }

    const registerAccount = async (data) => {
        const dataToSend = { username: data.username, password: data.password, phoneNumber: data.phoneNumber };
        try {

            const response = await axios.post('http://localhost:2000/register', dataToSend);

            console.log('response', response);

            setRegisterStatus('success');
            setTimeout(() => {
                setRegisterStatus(null);
            }, 2000);
            setMode('login');

            reset();

        } catch (error) {
            console.error('Error:', error);
            setRegisterStatus('error');
            setTimeout(() => {
                setRegisterStatus(null);
            }, 2000);
        }
    }

    return (
        <>
            <div className="h-screen grid content-center mx-10">
                <div className="flex justify-center">
                    <Header title={'Welcome'} />
                </div>
                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />

                <div className="flex justify-center">
                    {registerStatus === 'success' && (
                        <Alert severity="success" onClose={() => setRegisterStatus(null)}>Registration Success</Alert>
                    )}
                    {registerStatus === 'error' && (
                        <Alert severity="error" onClose={() => setRegisterStatus(null)}>Registration Failed</Alert>
                    )}
                    {loginStatus === 'success' && (
                        <Alert severity="success" onClose={() => setRegisterStatus(null)}>Login Success</Alert>
                    )}
                    {loginStatus === 'error' && (
                        <Alert severity="error" onClose={() => setRegisterStatus(null)}>Login Failed</Alert>
                    )}
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