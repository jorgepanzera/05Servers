
const employees = require("../models/employees.json")

const getEmployees = (req, res) => {
  
  const page = req.query.page || 0;
  const user = req.query.user || false;
  const badges = req.query.badges || null;

  if (page > 0) {
    // Devolverá del elemento (2 * (N - 1)) al (2 * (N - 1)) + 1
    const employeesPerPage = 2
    const startIndex = employeesPerPage * (page - 1)
    const endIndex = (employeesPerPage * (page - 1)) + 1
    const pageEmployees = employees.slice(startIndex, endIndex+1);
    return res.json(pageEmployees);
  }

  if (user) {
    // Devolverá listado de employees con privileges == "user"
    const filteredEmployess = employees.filter(employee => employee.privileges==="user")
    return res.json(filteredEmployess);
  }

  if (badges !== null) {
    //Devolverá listado de employees que incluya "black" en el atributo "badges"
    const filteredEmployess = employees.filter(employee => employee.badges.includes(badges))
    return res.json(filteredEmployess);
  }

  // Todos los employees
  return res.json(employees)
  
}

const getOldestEmployee = (req, res) => { 
  
  const oldestEmployees = employees.sort((a, b) => b.age - a.age)
  return res.json(oldestEmployees[0])
}

const createEmployee =  (req, res) => {
    
    const { name, age, phone, privileges, favorites, finished, badges, points } = req.body;
  
    // Validar body (solamente existencia de datos, se pueden agrega mas validaciones)
    if (!name || !age || !phone || !privileges || !favorites || !finished || !badges || !points) {
      return res.status(400).send('Bad Request');
    }
  
    // Agregar al array
    employees.push(req.body)
  
    // Devolver lista con todos los employees
    return res.status(201).send("Employee Created")

}
  
const getEmployeesByName = (req, res) => { 
  
  const name = req.params.name || false
  
  if (name) {
    const filteredEmployess = employees.filter(employee => employee.name === name)
    if (filteredEmployess.length > 0) {
      return res.json(filteredEmployess);
    } 
  }

  return res.status(404).send("Employee not found")

}

  module.exports = { getEmployees, getOldestEmployee, createEmployee, getEmployeesByName }
  