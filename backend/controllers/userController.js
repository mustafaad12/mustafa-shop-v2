import { Router } from "express";
import { UserService } from "../services/userService.js";
import asyncHandler from "../middleware/asyncHandler.js";

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
      asyncHandler((req, res) => {
        res.send(this.service.login());
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
