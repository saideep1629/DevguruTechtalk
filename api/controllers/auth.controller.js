import User from "../models/user.model.js";

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // console.log("req", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "already a user. Can't create account" });
    }

    const userDetails = await User.create({
      username,
      email,
      password,
    });

    return res.status(201).json(userDetails);
  } catch (error) {
    console.error("signup error", error);
    return res
      .status(500)
      .json({ message: "server error. Please try again later" });
  }
};

export { signup };
