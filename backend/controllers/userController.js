import { Router } from "express";
import { UserService } from "../services/userService.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import { protect, admin } from "../middleware/authMiddleware.js";

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
        protect,
        admin,
        asyncHandler((req, res) => {
          res.send(this.service.getAllUsers());
        })
      )
      // register new user
      .post(
        asyncHandler(async (req, res) => {
          const { name, email, password } = req.body;

          const user = await this.service.registerUser(name, email, password);

          generateToken(user._id, res);

          res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          });
        })
      );

    // login user
    this.router.post(
      "/login",
      asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const user = await this.service.login(email, password);

        generateToken(user._id, res);

        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      })
    );

    // logout user
    this.router.post(
      "/logout",
      protect,
      asyncHandler((req, res) => {
        res.cookie("jwt", "", {
          httpOnly: true,
          expires: new Date(0),
        });

        res.status(200).json({ message: "Logged out successfully" });
      })
    );

    this.router
      .route("/profile")
      .get(
        protect,
        asyncHandler((req, res) => {
          res.send(this.service.getUserProfile());
        })
      )

      .put(
        protect,
        asyncHandler((req, res) => {
          res.send(this.service.updateUserProfile());
        })
      );

    this.router
      .route("/:id")
      .get(
        protect,
        admin,
        asyncHandler((req, res) => {
          res.send(this.service.getUserById());
        })
      )

      .put(
        protect,
        admin,
        asyncHandler((req, res) => {
          res.send(this.service.updateUser());
        })
      )

      .delete(
        protect,
        admin,
        asyncHandler((req, res) => {
          res.send(this.service.deleteUser());
        })
      );
  }
}
