import React, { useContext, useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/context/AuthContext';


function Register() {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        usuario: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const validatePassword = () => {
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden');
        } else {
            setErrorMessage('');
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData);
            console.log(response.data);
            const { token } = response.data;
            login(token)
            navigate("/")

        } catch (error) {
            console.error(error);
            setErrorMessage('Credenciales incorrectas');
        }
    };



    return (
        <div className="vh-100">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="img-fluid" alt="Phone image" />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                        <form onSubmit={handleSubmit} >
                            <h2 className='h2'>Registrarse</h2>
                            <label className="form-label">
                                Nombre de usuario:
                                <input type="text" name="usuario"  className="form-control form-control-lg" value={formData.usuario} onChange={handleChange} />
                            </label>
                            <br></br>
                            <label className="form-label">
                                Correo electrónico:
                                <input type="email" name="email"  className="form-control form-control-lg" value={formData.email} onChange={handleChange} />
                            </label>
                            <br></br>
                            <label className="form-label">
                                Contraseña:
                                <input type="password" name="password" className="form-control form-control-lg" value={formData.password} onChange={handleChange} />
                            </label>
                            <br></br>
                            <label className="form-label">
                                Confirmar contraseña:
                                <input type="password" name="confirmPassword" className="form-control form-control-lg" value={formData.confirmPassword} onChange={handleChange} onBlur={validatePassword} />
                            </label>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <br></br>
                            <button type="submit" className='button'  >Registrarse</button>
                            <Link className='button' to="/login"  >Ya tienes una cuenta?</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Register;
