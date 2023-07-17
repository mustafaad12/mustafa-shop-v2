import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

export const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("No Authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("No Authorized, No token");
  }
});

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("No Authorized as admin");
  }
};
