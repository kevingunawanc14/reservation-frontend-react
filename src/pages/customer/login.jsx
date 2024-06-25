import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import Alert from '@mui/material/Alert';
import { useState, useEffect } from 'react';
import axios from '../../api/axios';


export default function Login() {
    const [registerStatus, setRegisterStatus] = useState(null);
    const [loginStatus, setLoginStatus] = useState(null);
    const [loginStatusMessage, setLoginStatusMessage] = useState(null);
    const [registerStatusMessage, setRegisterStatusMessage] = useState(null);
    const navigate = useNavigate();
    const [mode, setMode] = useState('login');
    const [loadingStatus, setLoadingStatus] = useState(null);

    const { register, handleSubmit, formState: { errors }, reset, clearErrors,
    } = useForm();

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
            setLoadingStatus(true)
            const response = await axios.post('/login', dataToSend);
            const token = response.data.token;
            const username = response.data.username;

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);

            navigate('/');

            setLoginStatus('success');
            setTimeout(() => {
                setLoginStatus(null);
            }, 2000);
            setLoadingStatus(false)

        } catch (error) {
            setLoadingStatus(false)
            setLoginStatus('error');
            setLoginStatusMessage(`Your login credentials don't match an account in our system`)
            setTimeout(() => {
                setLoginStatus(null);
            }, 2000);
        }
    }

    const registerAccount = async (data) => {
        const dataToSend = { username: data.username, password: data.password, phoneNumber: data.phoneNumber };
        try {
            setLoadingStatus(true)

            await axios.post('/register', dataToSend);

            setRegisterStatus('success');
            setTimeout(() => {
                setRegisterStatus(null);
            }, 2000);
            setMode('login');

            reset();
            setLoadingStatus(false)

        } catch (error) {
            setLoadingStatus(false)
            setRegisterStatus('error');
            setRegisterStatusMessage('Username already taken')
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
                <div className="flex justify-center">
                    {registerStatus === 'success' && (
                        <Alert severity="success" onClose={() => setRegisterStatus(null)}>Registration Success</Alert>
                    )}
                    {registerStatus === 'error' && (
                        <Alert severity="error" onClose={() => setRegisterStatus(null)}>{registerStatusMessage}</Alert>
                    )}
                    {loginStatus === 'success' && (
                        <Alert severity="success" onClose={() => setRegisterStatus(null)}>Login Success</Alert>
                    )}
                    {loginStatus === 'error' && (
                        <Alert severity="error" onClose={() => setRegisterStatus(null)}>{loginStatusMessage}</Alert>
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
                            <button className={`btn btn-primary mt-3 ${loadingStatus ? 'btn-disabled skeleton' : ''}`} type='submit'>Login</button>
                            <p className="cursor-pointer mt-2" onClick={toggleMode}>Don't have an account? Sign up</p>
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
                                        {
                                            required: 'Username is required',
                                            minLength: { value: 5, message: 'Username must be at least 5 characters' },
                                        }
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
                                        {
                                            required: 'Password is required',
                                            pattern: {
                                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                                message: 'Password must be at least 8 characters and include a number, letter',
                                            },
                                        }
                                    )}
                                />
                                {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
                            </label>
                        </div>
                        <div className="flex justify-center">
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Phone Number</span>
                                </div>
                                <input
                                    type="number"
                                    placeholder="Type here"
                                    className="input input-bordered w-full max-w-xs"
                                    {...register("phoneNumber",
                                        {
                                            required: 'Phone number is required'
                                        }
                                    )}
                                />
                                {errors.phoneNumber && <p className="text-red-500 mt-2">{errors.phoneNumber.message}</p>}
                            </label>
                        </div>
                        <div className="grid justify-items-center">
                            <button className={`btn btn-primary mt-3  ${loadingStatus ? 'btn-disabled skeleton' : ''}`} type='submit'>Register</button>
                            <p className="cursor-pointer mt-2" onClick={toggleMode}>Have an account? Sign In</p>
                        </div>
                    </form>
                )}
            </div>



        </>
    );
}