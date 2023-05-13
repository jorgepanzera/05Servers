const User = require("../models/user.model");
const { generateToken} = require('../middlewares/jwt.middleware')

const createUser = async (req, res, next) => {
    try {
      // Extraer datos del body
      const userData = req.body;
  
      // Guardar en BD
      const user = new User(userData);
      await user.save();
  
      // Devolver user creado
      return res.status(201).json(user);
        
    } catch (error) {
      // Pass the error to the next middleware
      next(error);
    }
};

// JWT token que expira en 1 hora
const login = async (req, res, next) => {

    const { email, password } = req.body;

    try {

    // Buscar user
        const user = await User.findOne({ email });
        
        console.log(user)

    // Si no existe, error 401
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Comparar password
    const isPasswordMatch = await user.comparePassword(password);

    // si no hay match, error 401
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Usuario autenticado !
    const token = generateToken(user.name, 1000 * 60 * 60); // 1 hora en miliseconds
    res.status(200).send({ token: token })

        
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
  

  }

module.exports = {createUser, login}