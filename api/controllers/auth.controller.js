import User from "../models/user.model.js";
import validator from 'validator'
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";


const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return next(errorHandler(400, "All fields are required"));
    }

    if (!validator.isEmail(email)) {
      return next(errorHandler(400, "Invalid email format"));
    }

    if (password.length < 6) {
      return next(errorHandler(400, "Password must be at least 6 characters"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const existingUser = await User.findOne({$or: [{ username }, {email}]});

    if (existingUser) {
      return next(errorHandler(400, "Username or email already exists"));
    }

    const userDetails = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({userDetails, message: "User created successfully"});
  } catch (error) {
    return next(errorHandler(500, "Server error. Please try again later"));
  }
  };



export { signup };
