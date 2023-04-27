
const employees = require("../models/employees.json")

const getAllEmployees = (req,res) => {
  return res.json(employees)
}

const createEmployee =  (req, res) => {
    
    const { name, age, phone, privileges, favorites, finished, badges, points } = req.body;
  
    // Validar body (solamente existencia de datos, se pueden agrega mas validaciones)
    if (!name || !age || !phone || !privileges || !favorites || !finished || !badges || !points) {
      return res.status(400).send('Bad Request');
    }
  
    // Agregar al array
    push(req.body);
  
    // Devolver lista con todos los employees
    return res.status(201).send(employees)

  }

  module.exports = { getAllEmployees, createEmployee }
  