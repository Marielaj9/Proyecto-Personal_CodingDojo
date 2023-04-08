import React, { Fragment} from 'react'
import { useContext } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../auth/context/AuthContext'

export const Header = () => {
    const { logout } = useContext(AuthContext);
    let location = useLocation();
    const navigation = useNavigate();

    const onLogout = () => {
        logout();
        navigation('/welcome', {
            replace: true
        });
    };


    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                    SpendSmart
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/ingresos" >
                                    Ingresos
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/gastos" >
                                    Gastos
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/ahorros" >
                                    Ahorros
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/balance" >
                                    Balance
                                </NavLink>
                            </li>
                        </ul>
                        <div className="navbar-nav">
                            <span className="nav-item nav-link text-primary mr-2">Usuario</span>
                            <button className="nav-item nav-link btn btn-secondary" onClick={onLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {location.pathname === '/' && (
                <Fragment>
                    <div className="jumbotron">
                        <h1 className="display-4">Bienvenido a nuestra página de gestión financiera</h1>
                        <p className="lead">
                            Aquí podrás llevar un registro detallado de tus ganancias, gastos y ahorros, establecer objetivos de ahorro,
                            realizar un seguimiento de su progreso en tiempo real, y obtener informes detallados sobre tus ingresos y
                            gastos.
                        </p>
                        <hr className="my-4" />
                        <p>
                            En resumen, si quieres tomar el control de tus finanzas personales y lograr tus objetivos financieros, nuestra
                            página de gestión financiera es la herramienta perfecta para ti. ¡Únete a nosotros hoy y comienza a mejorar
                            tu situación financiera!
                        </p>
                        <Link className="btn btn-primary btn-lg" to="/ingresos" role="button">
                            Comenzar ahora
                        </Link>
                    </div>
                </Fragment>
            )}
            <div className="container mt-4">
                <Outlet />
            </div>
        </header>
    );
};


