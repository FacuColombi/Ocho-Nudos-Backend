import User from "../models/User.js";

// ----------- LOGIN ----------------
export async function loginUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body?.email || "" });
    if (!user) return res.status(404).send("Usuario no encontrado");

    //If user exist, compare passwords
    if (user?.password === req.body?.password)
      return res.status(200).send(user);

    return res.status(401).send("Contraseña incorrecta");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}

export async function registerUser(req, res) {
  try {
    // Check if fields are empty
    if (!req.body?.fullName || !req.body?.email || !req.body?.password)
      return res.status(400).send("Campos incompletos");

    // Check if email is valid
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(req.body?.email))
      return res.status(400).send("Email invalido");

    //Check if user exist
    const user = await User.findOne({ email: req.body?.email || "" });
    if (user) return res.status(400).send("Usuario ya existe");

    //If not exist, create user
    const newUser = new User({
      fullName: req.body?.fullName,
      email: req.body?.email,
      password: req.body?.password,
      role: "customer"
    });
    const userCreated = await newUser.save();

    //Return user created
    return res.status(201).send(userCreated);
  } catch (error) {
    res.status(500).send(error);
  }
}

