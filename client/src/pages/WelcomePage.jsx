import React from 'react'
import { Link } from 'react-router-dom'


export const WelcomePage = () => {
  return (
    <div className='container'>
      <h1 className='mt-5 text-center'>SpendSmart</h1>
      <p className='lead text-center'>Bienvenido a nuestra página de gestión financiera, donde podrás llevar un registro detallado de tus ganancias, gastos y ahorros.</p>
      <p className='text-center'>En nuestra plataforma, podrás registrar tus ingresos y gastos de manera rápida y sencilla, lo que te permitirá tener un control detallado sobre tu situación financiera. Además, podrás establecer objetivos de ahorro y realizar un seguimiento de su progreso en tiempo real.</p>
      <p className='text-center'>Nuestro sistema de informes te proporcionará información detallada sobre tus ingresos y gastos, lo que te permitirá tomar decisiones financieras más informadas y eficaces. También te proporcionaremos herramientas de análisis para ayudarte a identificar áreas donde puedas reducir gastos y aumentar tus ahorros.</p>
      <div className='image-container'>
        <img src='../img/imagen3.jpg' alt='imagen' className='img-fluid my-5' />
        <div className='buttons-container'>
          <Link className='btn-home' to="/login">Ya tienes una cuenta?</Link>
          <Link to='/register' className='btn-home'>Registrarse</Link>
        </div>
      </div>
    </div>
  )
}
