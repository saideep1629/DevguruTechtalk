import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const isExistUser = await User.findOne({
      $or: [{ username: username.trim() }, { email: email.trim() }],
    });

    if (isExistUser) {
      throw new ApiError(400, "User already exists");
    }

    if (!validator.isEmail(email)) {
      throw new ApiError(400, "email invalid");
    }

    if (password.length < 6) {
      throw new ApiError(400, "Password must be greater than 6");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await User.create({
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      throw new ApiError(400, "User not created properly");
    }

    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User created successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500) // use provided status or fallback
      .json(
        new ApiResponse(
          error.statusCode || 500, // same status in response body
          null, // no data on error
          error.message // error details
        )
      );
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
      throw new ApiError(400, "All fields are required");
    }

    if (!validator.isEmail(email)) {
      throw new ApiError(400, "email invalid");
    }

    if (password.length < 6) {
      throw new ApiError(400, "Password must be greater than 6");
    }

    const isExistUser = await User.findOne({ email });

    if (!isExistUser) {
      throw new ApiError(404, "User not found");
    }

    const validPassword = await bcrypt.compare(password, isExistUser.password);

    if (!validPassword) {
      throw new ApiError(400, "Invalid password");
    }

    const token = jwt.sign(
      {
        id: isExistUser._id,
      },
      process.env.JWT_ACCESS_TOKEN_KEY,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY }
    );

    if (!token) {
      throw new ApiError(404, "token not generated properly!!!");
    }

    const options = {
      httpOnly: true,
      secure: false,
    };

    const validUser = await User.findOne({ email }).select("-password");

    return res
      .status(200)
      .cookie("accessToken", token, options)
      .json(new ApiResponse(200, validUser, "User signin successfully"));
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};

const googleAuth = async (req, res) => {
  try {
    console.log("before");
    
    const { email, name, photoUrl } = req.body;
    console.log("email", name);
    
    

    // if (!email || !username || email === "" || username === "") {
    //   throw new ApiError(400, "details are missing");
    // }
    // console.log("after");

    const user = await User.findOne({ email });
    console.log("user", user);
    

    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_ACCESS_TOKEN_KEY,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY }
      );

      if (!token) {
        throw new ApiError(404, "token not generated properly!!!");
      }

      const options = {
        httpOnly: true,
        secure: false,
      };

      const validUser = await User.findOne({ email }).select("-password");

      return res
        .status(200)
        .cookie("accessToken", token, options)
        .json(new ApiResponse(200, validUser, "User signin successfully"));
    } else {
      const generatedPassword = email + process.env.JWT_ACCESS_TOKEN_KEY;
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = await User.create({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.floor(Math.random() * 100),
        email: email,
        password: hashedPassword,
        profilePicture: photoUrl,
      });

      const createdUser = await User.findById(newUser._id).select("-password");

      if (!createdUser) {
        throw new ApiError(400, "User not created properly");
      }

      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT_ACCESS_TOKEN_KEY,
        { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY }
      );

      if (!token) {
        throw new ApiError(404, "token not generated properly!!!");
      }

      const options = {
        httpOnly: true,
        secure: false,
      };

      return res
        .status(200)
        .cookie("accessToken", token, options)
        .json(new ApiResponse(200, createdUser, "User signin successfully"));
    }
  } catch (error) {
    return res
      .status(error.statusCode || 500) // use provided status or fallback
      .json(
        new ApiResponse(
          error.statusCode || 500, // same status in response body
          null, // no data on error
          error.message // error details
        )
      );
  }
};

export { signup, signin, googleAuth };
