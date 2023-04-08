import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

function Ahorro() {
  const token  = JSON.parse(localStorage.getItem('token'));
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    descripcion: '',
    monto: '',
    date: ''
  
  });

  

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    console.log(formData);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/ahorros', formData, {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
      });
      console.log(response.data);
      navigate("/balance");
    } catch (error) {
      console.error(error.response.data); 
      alert(error.response.data.error);
    }
};


  return (
    <div className="ingresos-container">
      <h2>Ahorro</h2>
      
      <form onSubmit={handleSubmit} className='form'>
          <div className='displayFlex'>
          <div >
          <div className='form-group'>
            <label htmlFor="descripcion">Descripcion:</label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              minLength= {2}
              required
              className="form-control" />
              
          </div>
          <div className='form-group'>
            <label htmlFor="monto">Monto:</label>
            <input
              type="number"
              id="monto"
              name="monto"
              value={formData.monto}
              
              required
              onChange={handleChange}
              
              className="form-control" />
              
          </div>

          <div className='form-group'>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="form-control"  />
          </div>

          <div ><button to="/balance" className='btn' >Agregar</button></div>
          </div>
          
          </div>
          
        </form>
    </div>
  );
}

export default Ahorro;
