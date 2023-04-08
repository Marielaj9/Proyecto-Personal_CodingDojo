
const AdminController = require('../controllers/admin.controller');
const { authenticate, admin } = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/ingresos', AdminController.createIngresos);
    app.post('/api/gastos', AdminController.createGastos);
    app.post('/api/ahorros', AdminController.createAhorros);
    app.post('/api/register', AdminController.register);
    app.get('/api/ingresos', AdminController.getAllIngresos);
    app.get('/api/gastos', AdminController.getAllGastos);
    app.get('/api/ahorros', AdminController.getAllAhorros);
    app.get('/api/registers', AdminController.getAllRegisters);

    app.get('/api/registers/:id', AdminController.getRegisters);
    app.get('/api/ingresos/:id', AdminController.getIngresos);
    app.get('/api/gastos/:id', AdminController.getGastos);
    app.get('/api/ahorros/:id', AdminController.getAhorros);
    app.put('/api/registers/:id', AdminController.updateRegisters);
    app.put('/api/ingresos/:id', AdminController.updateIngresos);
    app.put('/api/gastos/:id', AdminController.updateGastos);
    app.put('/api/ahorros/:id', AdminController.updateAhorros);
    app.delete('/api/registers/:id', AdminController.deleteRegisters);
    app.delete('/api/ingresos/:id', AdminController.deleteIngresos);
    app.delete('/api/gastos/:id', AdminController.deleteGastos);
    app.delete('/api/ahorros/:id', AdminController.deleteAhorros);

    
    app.post("/api/login", AdminController.login);
    app.get("/api/logout", AdminController.logout);
    app.get("/api/users", authenticate, AdminController.get_all);
    app.get("/api/users/all", admin, AdminController.get_all);
    app.get("/api/admin", admin, (req, res) => { res.status(200).json({}) })
}
