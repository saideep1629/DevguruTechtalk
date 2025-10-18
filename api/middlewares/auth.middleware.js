import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const verifyJWT = async (req, res, next) => {
  try {
    const tokenFromClient =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!tokenFromClient) {
      throw new ApiError(400, "token not found");
    }

    const decodedToken = jwt.verify(
      tokenFromClient,
      process.env.JWT_ACCESS_TOKEN_KEY
    );

    if (!decodedToken) {
      throw new ApiError(400, "Invalid access token");
    }

    const user = await User.findById(decodedToken?.id).select(" -password ");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json(new ApiResponse(error.statusCode || 500, null, error.message));
  }
};

export default verifyJWT;
