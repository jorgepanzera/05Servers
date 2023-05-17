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

    // Buscar user y que este activo, sino no puede loguearse
        const user = await User.findOne({ email, active:true });
        
        console.log(user)

    // Si no existe, error 401
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials or user not active' });
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
  
const validate = async (req, res, next) => {
  try {
    const userId = req.params.id || "";
    const updateData = { active:true, updatedAt: new Date() };

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(updatedUser);
  } catch (error) {
    // Pass the error to the next middleware
    next(error);
  }
}

module.exports = {createUser, login, validate}