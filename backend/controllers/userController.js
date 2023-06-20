import { Router } from "express";
import { UserService } from "../services/userService.js";
import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";

export class UserController {
  router;
  constructor() {
    this.router = Router();
    this.service = new UserService();
    this.setRoutes();
  }

  setRoutes() {
    this.router
      .route("/")
      .get(
        asyncHandler((req, res) => {
          res.send(this.service.getAllUsers());
        })
      )

      .post(
        asyncHandler((req, res) => {
          res.send(this.service.registerUser());
        })
      );

    this.router.post(
      "/logout",
      asyncHandler((req, res) => {
        res.send(this.service.logoutUser());
      })
    );

    this.router.post(
      "/login",
      asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await this.service.login(email, password);
        if (user) {
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "3d",
          });

          res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000,
          });

          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          });
        } else {
          res.status(401);
          throw new Error("Invalid email or password");
        }
      })
    );

    this.router
      .route("/profile")
      .get(
        asyncHandler((req, res) => {
          res.send(this.service.getUserProfile());
        })
      )

      .put(
        asyncHandler((req, res) => {
          res.send(this.service.updateUserProfile());
        })
      );

    this.router
      .route("/:id")
      .get(
        asyncHandler((req, res) => {
          res.send(this.service.getUserById());
        })
      )

      .put(
        asyncHandler((req, res) => {
          res.send(this.service.updateUser());
        })
      )

      .delete(
        asyncHandler((req, res) => {
          res.send(this.service.deleteUser());
        })
      );
  }
}
