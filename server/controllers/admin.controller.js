const express = require('express');
const { Ahorro } = require('../models/ahorros.model');
const { Gasto } = require('../models/gastos.model');
const router = express.Router();
const { Ingreso } = require('../models/ingresos.model');
const { Register } = require('../models/register.model');
const jwt = require("jsonwebtoken");
const secret_key = "Esta es mi llave secreta";
const bcrypt = require("bcrypt");
const User = require('../models/user.model');



//cargar los ingresos
module.exports.createIngresos = async (request, response) => {
    const token = request.headers['x-token'];
    
    const {id} = jwt.verify(token, process.env.JWT_KEY);
    
    try {
      const { descripcion, monto, date } = request.body;
      
      const ingreso = await Ingreso.create({
          descripcion,
          monto,
          date,
          register: id,
      });
  
      response.json(ingreso);
  
    } catch (error) {
      response.status(400);
      response.json({ error: "Error al crear el ingreso" });
    }
};

//cargar los gastos
module.exports.createGastos = async (request, response) => {
    const token = request.headers['x-token'];
    
    const {id} = jwt.verify(token, process.env.JWT_KEY);
    
    try {
      const { descripcion, monto, date } = request.body;
      
      const gasto = await Gasto.create({
          descripcion,
          monto,
          date,
          register: id,
      });
  
      response.json(gasto);
  
    } catch (error) {
      response.status(400);
      response.json({ error: "Error al crear el gasto" });
    }
  };

//cargar los ahorros
module.exports.createAhorros = async (request, response) => {
    const token = request.headers['x-token'];
  
    const { id } = jwt.verify(token, process.env.JWT_KEY);
  
    try {
      const { descripcion, monto, date } = request.body;
  
      const ahorro = await Ahorro.create({
        descripcion,
        monto,
        date,
        register: id,
      });
  
      response.json(ahorro);
    } catch (error) {
      response.status(400);
      response.json({ error: "Error al crear el ahorro" });
    }
  };
  

//crear usuario
module.exports.register = async (req, res) => {
    try {
        const { usuario, password, email } = req.body;
        console.log(usuario, password, email)
        if (!usuario || !password || !email) {
            return res.status(400).json({ message: "Debe proporcionar un usuario, una contraseña y un correo electrónico" });
        }

        const existingRegister = await Register.findOne({ usuario: usuario });

        if (existingRegister) {
            return res.status(409).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const register = new Register({
            usuario: usuario,
            password: hashedPassword,
            email: email,
        });

        const result = await register.save();
        res.status(201).json({ message: 'Usuario creado', result: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};



  module.exports.login = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({ message: "Debe proporcionar un usuario y una contraseña" });
        }

        const register = await Register.findOne({ usuario: usuario });

        if (!register) {
            return res.status(401).json({ message: 'La autenticación falló' });
        }

        const result = await bcrypt.compare(password, register.password);

        if (!result) {
            return res.status(401).json({ message: 'La autenticación falló' });
        }

        const token = jwt.sign({ id: register._id }, process.env.JWT_KEY, { expiresIn: '4h' });
        const {id} = jwt.verify(token, process.env.JWT_KEY);
        console.log(id);

        res.status(200).json({ message: 'Autenticación exitosa', token: token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

//listar ingresos
module.exports.getAllIngresos = async (request, response) => {
    const token = request.headers['x-token'];
    const { id } = jwt.verify(token, process.env.JWT_KEY);

    try {
        const ingresos = await Ingreso.find({ register: id });
        response.json(ingresos);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
};

//listar gastos
module.exports.getAllGastos = async (request, response) => {
    const token = request.headers['x-token'];
    const { id } = jwt.verify(token, process.env.JWT_KEY);
  
    try {
      const gastos = await Gasto.find({ register: id });
      response.json(gastos);
    } catch (error) {
      response.status(400);
      response.json(error);
    }
  };
  
  module.exports.getAllAhorros = async (request, response) => {
    const token = request.headers['x-token'];
    const { id } = jwt.verify(token, process.env.JWT_KEY);
  
    try {
      const ahorros = await Ahorro.find({ register: id });
      response.json(ahorros);
    } catch (error) {
      response.status(400);
      response.json(error);
    }
  };
  
/*Obtener todos los usuarios*/
module.exports.getAllRegisters = async (request, response) => {
    try {
        const register = await Register.find({})
        response.json(register);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}


//obtener productos por Id
module.exports.getIngresos = async (request, response) => {
    try {
        const ingreso = await Ingreso.findOne({_id:request.params.id})
        response.json(ingreso);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
    
}
//obtener usuarios por Id
module.exports.getRegisters = async (request, response) => {
    try {
        const register = await Register.findOne({_id:request.params.id})
        response.json(register);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
    
}
//obtener productos por Id
module.exports.getGastos = async (request, response) => {
    try {
        const gasto = await Gasto.findOne({_id:request.params.id})
        response.json(gasto);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
    
}
//obtener productos por Id
module.exports.getAhorros = async (request, response) => {
    try {
        const ahorro = await Ahorro.findOne({_id:request.params.id})
        response.json(ahorro);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
    
}

//actualizar productos 
module.exports.updateIngresos = async (request, response) => {
    try {
        const ingreso = await Ingreso.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        response.json(ingreso);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}
//actualizar usuarios
module.exports.updateRegisters = async (request, response) => {
    try {
        const register = await Register.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        response.json(register);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}
//actualizar gastos 
module.exports.updateGastos = async (request, response) => {
    try {
        const gasto = await Gasto.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        response.json(gasto);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}
//actualizar ahorros 
module.exports.updateAhorros = async (request, response) => {
    try {
        const ahorro = await Ahorro.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        response.json(ahorro);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}

//eliminar ingresos
module.exports.deleteIngresos = async (request, response) => {
    try {
        const ingreso = await Ingreso.findByIdAndDelete({ _id: request.params.id })
        response.json(ingreso);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}
//eliminar usuarios
module.exports.deleteRegisters = async (request, response) => {
    try {
        const register = await Register.findByIdAndDelete({ _id: request.params.id })
        response.json(register);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}
//eliminar gastos
module.exports.deleteGastos = async (request, response) => {
    try {
        const gasto = await Gasto.findByIdAndDelete({ _id: request.params.id })
        response.json(gasto);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}
//eliminar ahorros
module.exports.deleteAhorros = async (request, response) => {
    try {
        const ahorro = await Ahorro.findByIdAndDelete({ _id: request.params.id })
        response.json(ahorro);
    } catch (error) {
        response.status(400);
        response.json(error);
    }
}


  
module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.status(200).json({ message: "Salimos de sesión!" });
}

module.exports.get_all = (req, res) => {
    Usuario.find()
        .then(usuarios => res.json({ message: usuarios }))
        .catch(err => res.status(400).json({ message: err }));
}