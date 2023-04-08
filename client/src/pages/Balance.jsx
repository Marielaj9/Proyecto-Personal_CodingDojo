import React, { useEffect, useState } from 'react'
import axios from 'axios'



export const Balance = () => {

    const [ingresos, setIngresos] = useState(null);
    const [gastos, setGastos] = useState(null);
    const [ahorros, setAhorros] = useState(null);
    const [editItem, setEditItem] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const token = JSON.parse(localStorage.getItem('token'));
    
    /*const navigate = useNavigate();*/

    const getIngresos = () => {
        axios.get('http://127.0.0.1:8000/api/ingresos', {
          headers: {
            'x-token': token
          }
        })
        .then(response => {
          setIngresos(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      }

    const getGastos = () => {
        axios.get('http://127.0.0.1:8000/api/gastos', {
  headers: {
    'x-token': token
  }
})
  .then(response => {
    setGastos(response.data);
  })
  .catch(error => {
    console.error(error);
  });
    }

    const getAhorros = () => {
        axios.get('http://127.0.0.1:8000/api/ahorros', {
          headers: {
            'x-token': token
          }
        })
        .then(response => {
          setAhorros(response.data);
        })
        .catch(error => {
          console.error(error);
        });
      }

    useEffect(() => {
        getIngresos();
        getGastos();
        getAhorros();
    }, []);

    const calcularTotalIngresos = () => {
        if (!ingresos) {
            return 0;
        }
        return ingresos.reduce((total, item) => total + item.monto, 0);
    };

    const calcularTotalGastos = () => {
        if (!gastos) {
            return 0;
        }
        return gastos.reduce((total, item) => total + item.monto, 0);
    };

    const calcularTotalAhorros = () => {
        if (!ahorros) {
            return 0;
        }
        return ahorros.reduce((total, item) => total + item.monto, 0);
    };



    /*const eliminar = (id) => {
        axios.delete('http://127.0.0.1:9000/api/Ingresos/' + id)
        getIngresos();
    }*/
    const calcularSaldoActual = () => {
        const totalIngresos = calcularTotalIngresos();
        const totalGastos = calcularTotalGastos();
        const totalAhorros = calcularTotalAhorros();
        return totalIngresos - totalGastos - totalAhorros;
    };
    
    const eliminar = (id, type) => {
        axios.delete(`http://127.0.0.1:8000/api/${type}/${id}`)
            .then(response => {
                if (editMode && editItem._id === id) {
                    setEditMode(false);
                    setEditItem(null);
                }
                if (type === 'ingresos') {
                    getIngresos();
                } else if (type === 'gastos') {
                    getGastos();
                } else {
                    getAhorros();
                }
            })
            .catch(error => {
                console.error(error);
            });
    }


    const handleEdit = (item) => {
        setEditMode(true);
        setEditItem({ ...item });
    };


    const handleUpdate = (updatedItem, type) => {
        axios.put(`http://127.0.0.1:8000/api/${type}/${updatedItem._id}`, updatedItem)
            .then(response => {
                console.log('Item updated:', response.data);
                setEditMode(false);
                setEditItem(null);
                switch (type) {
                    case 'ingresos':
                        getIngresos();
                        break;
                    case 'gastos':
                        getGastos();
                        break;
                    case 'ahorros':
                        getAhorros();
                        break;
                    default:
                        console.warn('Unknown type:', type);
                        break;
                }
            })
            .catch(error => {
                console.error('Error updating item:', error);
            });
    };




    return (
        <div>
            <div className='balance-table'>
                <h2 className='h2'>Balance</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Concepto</th>
                            <th>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='odd'>
                            <td>Total de ingresos:</td>
                            <td>{calcularTotalIngresos()}gs</td>
                        </tr>
                        <tr className='even'>
                            <td>Total de gastos:</td>
                            <td>{calcularTotalGastos()}gs</td>
                        </tr>
                        <tr className='odd'>
                            <td>Total de ahorros:</td>
                            <td>{calcularTotalAhorros()}gs</td>
                        </tr>
                        <tr className='even'>
                            <td>Saldo actual:</td>
                            <td>{calcularSaldoActual()}gs</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
            
            </div>
            <div>
                <h3>Ingresos</h3>
                <hr></hr>
                    <div className="table-container">
                        {ingresos ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Descripción</th>
                                        <th>Monto</th>
                                        <th>Fecha</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingresos.map(item => (
                                        <tr key={item._id}>
                                            <td>{editMode && editItem._id === item._id ? <input type="text" value={editItem.descripcion} onChange={(e) => setEditItem({ ...editItem, descripcion: e.target.value })} /> : item.descripcion}</td>
                                            <td>{editMode && editItem._id === item._id ? <input type="number" value={editItem.monto} onChange={(e) => setEditItem({ ...editItem, monto: e.target.value })} /> : item.monto}</td>
                                            <td>{editMode && editItem._id === item._id ? <input type="date" value={editItem.date} onChange={(e) => setEditItem({ ...editItem, date: e.target.value })} /> : item.date}</td>
                                            <td>
                                                {editMode && editItem && editItem._id === item._id ? (
                                                    <>
                                                        <button className="btn-success" onClick={() => handleUpdate(editItem, 'ingresos')}>Guardar</button>
                                                        <button className="btn-cancel" onClick={() => setEditMode(false)}>Cancelar</button>
                                                    </>
                                                ) : (
                                                    <button className="btn-edit" onClick={() => handleEdit(item)}>Editar</button>
                                                )}
                                            </td>
                                            <td>
                                                <button className="btn-delete" onClick={() => eliminar(item._id, 'ingresos')}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>...</p>
                        )}
                    </div>

                    <hr></hr>
                    <h3>Gastos</h3>
                    <hr></hr>
                    <div className="table-container">
                    {gastos ? (
                        <table>

                            <thead>
                                <tr >
                                    <th>Descripción</th>
                                    <th>Monto</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {gastos.map(item => (
                                    <tr key={item._id}>
                                        <td>{editMode && editItem._id === item._id ? <input type="text" value={editItem.descripcion} onChange={(e) => setEditItem({ ...editItem, descripcion: e.target.value })} /> : item.descripcion}</td>
                                        <td>{editMode && editItem._id === item._id ? <input type="number" value={editItem.monto} onChange={(e) => setEditItem({ ...editItem, monto: e.target.value })} /> : item.monto}</td>
                                        <td>{editMode && editItem._id === item._id ? <input type="date" value={editItem.date} onChange={(e) => setEditItem({ ...editItem, date: e.target.value })} /> : item.date}</td>
                                        <td>
                                            {editMode && editItem && editItem._id === item._id ? (
                                                <>
                                                    <button onClick={() => handleUpdate(editItem, 'gastos')}>Guardar</button>
                                                    <button onClick={() => setEditMode(false)}>Cancelar</button>
                                                </>
                                            ) : (
                                                <button onClick={() => handleEdit(item)}>Editar</button>
                                            )}
                                        </td>
                                        <td>
                                            <button onClick={() => eliminar(item._id, 'gastos')}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    ) : (
                        <p>...</p>
                    )}
                    </div>
                    <h3>Ahorros</h3>
                    <hr></hr>
                    <div className="table-container">
                    {ahorros ? (
                        <table>

                            <thead>
                                <tr >
                                    <th>Descripción</th>
                                    <th>Monto</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ahorros.map(item => (
                                    <tr key={item._id}>
                                        <td>{editMode && editItem._id === item._id ? <input type="text" value={editItem.descripcion} onChange={(e) => setEditItem({ ...editItem, descripcion: e.target.value })} /> : item.descripcion}</td>
                                        <td>{editMode && editItem._id === item._id ? <input type="number" value={editItem.monto} onChange={(e) => setEditItem({ ...editItem, monto: e.target.value })} /> : item.monto}</td>
                                        <td>{editMode && editItem._id === item._id ? <input type="date" value={editItem.date} onChange={(e) => setEditItem({ ...editItem, date: e.target.value })} /> : item.date}</td>
                                        <td>
                                            {editMode && editItem && editItem._id === item._id ? (
                                                <>
                                                    <button onClick={() => handleUpdate(editItem, 'ahorros')}>Guardar</button>
                                                    <button onClick={() => setEditMode(false)}>Cancelar</button>
                                                </>
                                            ) : (
                                                <button onClick={() => handleEdit(item)}>Editar</button>
                                            )}
                                        </td>
                                        <td>
                                            <button onClick={() => eliminar(item._id, 'ahorros')}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                    ) : (
                        <p>...</p>
                    )}
                    </div>
            </div>
        </div>
    )
}
