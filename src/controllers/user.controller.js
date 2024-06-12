const User = require("../models/user.model");
const { createToken } = require("../utilities/jwt");
const sendEmail = require("../utilities/email.js");

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name: name,
      email: email,
      password: password,
      favorites: [],
      token: "", // Initialize token as empty string
    });

    const option = {
      from: "akashjadhav5974@gmail.com",
      to: email,
      subject: "Welcome to Fandom",
      html: `<h1>Welcome ${name}</h1> 
            <p>Thanks for registering on Fandom</p>
            <p>Now you can login to our platform with your email and password</p>
            <p>Thanks</p>`,
    };
    sendEmail(option);

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

    // Update the token field in the user document
    user.token = token;
    await user.save();

    res.cookie("authToken", token, {
      path: "/",
      expires: new Date(Date.now() + 3600000),
      secure: true,
      httpOnly: true,
      sameSite: "None",
    });

    return res
      .status(200)
      .send({ message: "User logged in successfully", token });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error on logging in", error: error.message });
  }
};

const Logout = async (req, res) => {
  res.clearCookie("authToken");
  return res.status(200).send({ message: "User logged out successfully" });
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(404)
      .send({ message: "Error while deleting user", error: error });
  }
};

module.exports = { Register, Login, Logout, deleteUser };
