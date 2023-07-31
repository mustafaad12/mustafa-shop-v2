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

  // get all users
  setRoutes() {
    this.router
      .route("/")
      .get(
        protect,
        admin,
        asyncHandler(async (req, res) => {
          const users = await this.service.getAllUsers();

          res.status(200).json(users);
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
          secure: true,
          sameSite: "strict", // Prevent CSRF attacks
          expires: new Date(0),
        });

        res.status(200).json({ message: "Logged out successfully" });
      })
    );

    //get user profile
    this.router
      .route("/profile")
      .get(
        protect,
        asyncHandler(async (req, res) => {
          const user = await this.service.getUserProfile(req.user._id);
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          });
        })
      )

      //update user profile
      .put(
        protect,
        asyncHandler(async (req, res) => {
          const { name, email, password } = req.body;
          const user = await this.service.updateUserProfile(
            req.user._id,
            name,
            email,
            password
          );
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          });
        })
      );

    this.router
      .route("/:id")
      // get user by id
      .get(
        protect,
        admin,
        asyncHandler(async (req, res) => {
          const user = await this.service.getUserById(req.params.id);

          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          });
        })
      )

      .put(
        protect,
        admin,
        asyncHandler(async (req, res) => {
          const userData = req.body;

          const updatedUser = await this.service.updateUser({
            ...userData,
            id: req.params.id,
          });

          res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
          });
        })
      )

      // delete user
      .delete(
        protect,
        admin,
        asyncHandler(async (req, res) => {
          const deletedUser = await this.service.deleteUser(req.params.id);

          res.status(200).json(deletedUser);
        })
      );
  }
}
