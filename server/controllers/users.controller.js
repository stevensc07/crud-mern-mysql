import { pool } from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT * FROM users ORDER BY createAt ASC"
    );
    res.json(result);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(result[0]);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    res.status(500).json({ message: "Error al obtener usuario por ID" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, lastName } = req.body;

    if (!name || !lastName) {
      return res
        .status(400)
        .json({ message: "Se requieren nombre y apellido" });
    }
    const [result] = await pool.query(
      "INSERT INTO users(name, lastName) VALUES (?, ?)",
      [name, lastName]
    );
    res.json({
      id: result.insertId,
      name,
      lastName,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName } = req.body;

    if (!name || !lastName) {
      return res
        .status(400)
        .json({ message: "Se requieren nombre y apellido" });
    }
    await pool.query("UPDATE users SET name = ?, lastName = ? WHERE id = ?", [
      name,
      lastName,
      id,
    ]);
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};
