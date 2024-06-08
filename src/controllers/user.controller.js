
const User = require("../models/user.model");
const { createToken } = require("../utilities/jwt");

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });
    return res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    const passwordMatch = await user.matchPassword(password);

    if (!passwordMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const token = createToken({ id: user._id });
    res.cookie("authToken", token, {
      path: "/",
      expires: new Date(Date.now() + 3600000),
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    return res
      .status(200)
      .send({ message: "user logged in successfully", token });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "error on logging in", error: error.message });
  }
};

const Logout = async (req, res) => {
  res.clearCookie("authToken");
  return res.status(200).send({ message: "user logged out successfully" });
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    return res.status(200).send({ message: "user deleted successfully" });
  } catch (error) {
    return res
      .status(404)
      .send({ message: "error while deleting user", error: error });
  }
};



module.exports = { Register, Login, Logout, deleteUser };
