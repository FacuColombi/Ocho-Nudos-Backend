import User from "../models/User.js";
import response from "../utils/response.js";

// ----------- LOGIN ----------------
export async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body?.email || "" });
    if (!user) return res.status(404).json(response("Usuario no encontrado", true));

    //If user exist, compare passwords
    if (user?.password !== req.body?.password) return res.status(401).json(response("Contraseña incorrecta", true));

    //If password is correct, return map user without password
    const userToReturn = {
      fullName: user?.fullName,
      email: user?.email,
      role: user?.role,
    };

    return res.status(200).json(response("Usuario logueado", false, userToReturn));
  } catch (error) {
    res.status(500).json(response("Error al loguear usuario", true, error));
  }
}

// ----------- REGISTER ----------------
export async function register(req, res) {
  try {
    // Check if fields are empty
    if (!req.body?.fullName || !req.body?.email || !req.body?.password)
      return res.status(400).json(response("Campos incompletos", true));

    // Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(req.body?.email))
      return res.status(400).json(response("Email inválido", true));

    //Check if user exist
    const user = await User.findOne({ email: req.body?.email || "" });
    if (user) return res.status(400).json(response("Usuario ya existe", true));

    //If not exist, create user
    const newUser = new User({
      fullName: req.body?.fullName,
      email: req.body?.email,
      password: req.body?.password
    });
    let userCreated = await newUser.save();

    userCreated = {
      fullName: userCreated?.fullName,
      email: userCreated?.email,
      role: userCreated?.role,
    };

    //Return user created
    return res.status(201).json(response("Usuario creado", false, userCreated));
  } catch (error) {
    res.status(500).json(response("Error al crear usuario", true, error));
  }
}

