import Usuarios from "../models/User.js";

// ----------- LOGIN ----------------
export async function loginUser(req, res) {
  try {
    const user = await Usuarios.findOne({ email: req.body?.email || "" });
    if (!user) return res.status(404).send("Usuario no encontrado");

    //If user exist, compare passwords
    if (user?.password === req.body?.password) return res.status(200).send(user);

    return res.status(401).send("Contraseña incorrecta");
  } catch (error) {
    res.status(500).send("Internal server error");
  }
}