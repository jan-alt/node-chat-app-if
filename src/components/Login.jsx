import { Typography, Card, CardContent } from '@mui/material';
import { indigo } from '@mui/material/colors'
import React from 'react'
import { useForm } from 'react-hook-form'
import api from '../config/api';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';



const Login = () => {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, },
    } = useForm();

    const nav = useNavigate();
    const {setToken} = useUser();

    const onSubmit = (data) => {
        api.post('/login', data)
            .then(res => {
                const data = res.data
                localStorage.setItem('token', data.token)  
                setToken(data.token)
                nav('/chats')
            }).catch(err => {
                console.log(err)
                const res = err.response
                setError(res.data.field, { type: 'validate', message: res.data.message })
            })
    }

  return (
    <>
          <section className="vh-90 d-flex align-items-center">
            <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">

                <div className="col-md-6">
                </div>

                <div className="col-md-4">

                <Card sx={{ width: '400px', borderRadius: 3, backgroundColor: indigo[800], color: 'white' }}>
                    <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="form-label text-white">Username</label>
                            <input type="text" className="form-control"
                                placeholder="Enter Username" {...register("username", { required: true })}/>
                            <Typography color="error">{errors.username?.type === 'required' && "Username is required"}</Typography>
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-white">Password</label>
                            <input type="password" className="form-control"
                                placeholder="Enter password" {...register("password", { required: true })}/>
                            <Typography color="error">{errors.password?.type === 'required' && "Password is required"}</Typography>
                        </div>
                        <div className="mb-4">
                            <a href="#!" className="text-white">Forgot password?</a>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </div>
                        <p className="text-white">Don't have an account? 
                            <a href="/register" className="link-primary">Register</a>
                        </p>
                    </form>
                    </CardContent>
                </Card>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Login