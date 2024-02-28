import React from 'react'

export const register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: '',
        }
    });

    return (
        <>
            <div className="h-screen grid content-center " onSubmit={handleSubmit(null)}>
                <div className="flex justify-center">
                    <p className='text-2xl font-mono'>Welcome</p>
                </div>
                <form className="" onSubmit={handleSubmit(null)}>
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
                                    { required: 'Username harus diisi!' }
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
                                    { required: 'Password harus diisi!' }
                                )}
                            />
                            {errors.password && <p className="text-red-500 mt-2">{errors.password.message}</p>}
                        </label>
                    </div>
                    <div className="flex justify-center">
                        <button className="btn btn-primary mt-3 " type='submit'>Login</button>
                    </div>
                </form>

            </div>



        </>
    )
}
