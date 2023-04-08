import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from "../auth/context/AuthContext"
import { Link, useNavigate } from 'react-router-dom';

function LoginForm() {
    const { login } = useContext(AuthContext)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        usuario: '',
        password: '',
    });


    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
            const { token } = response.data;
            // Aquí puedes guardar el token de autenticación en el local storage o en una cookie
            login(token)
            const registersResponse = await axios.get('http://127.0.0.1:8000/api/registers', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const registers = registersResponse.data;
            // Aquí puedes guardar la información del usuario en el local storage o en una cookie
            localStorage.setItem('registers', JSON.stringify(registers));
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
                        <form onSubmit={handleSubmit} className="login">
                            <h2 className='h2'>Iniciar sesión</h2>
                            <label className="form-label">
                                Usuario:
                                <input type="text" name="usuario" className="form-control form-control-lg" value={formData.usuario} onChange={handleChange} />
                            </label>
                            <br />
                            <label className="form-label">
                                Contraseña:
                                <input type="password" name="password" className="form-control form-control-lg" value={formData.password} onChange={handleChange} />
                            </label>
                            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                            <br />
                            <button type="submit" className='button'>Iniciar sesión</button>
                            <Link to='/register' className='button'>Registrarse</Link>
                        </form>
                    </div>
                </div>
            </div>

        </div>

    );
}

export default LoginForm;
