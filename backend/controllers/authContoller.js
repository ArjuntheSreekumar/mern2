import User from "../models/User.js";
import bcrypt from "bcrypt";

// User Registration
export const register = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      photo: req.body.photo,
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Registration failed", error: err.message });
  }
};

// User Login (without JWT)
export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

    // if password is incorrect
    if (!checkCorrectPassword) {
      return res.status(401).json({ success: false, message: "Incorrect email or password" });
    }

    const { password, role, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Successfully logged in",
      data: { ...rest },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
