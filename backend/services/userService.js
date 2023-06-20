import User from "../models/userModel.js";

export class UserService {
  // @desc Login user & get token
  // @route POST /api/users/login
  // @access Public
  async login(email, password) {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return user;
    }
  }

  // @desc Register user
  // @route POST /api/users
  // @access Public
  registerUser() {
    return "register user";
  }

  // @desc Logout user / clear cookie
  // @route POST /api/users/logout
  // @access Private
  logoutUser() {
    return "logout user";
  }

  // @desc Get user profile
  // @route GET /api/users/profile
  // @access Private
  getUserProfile() {
    return "get user profile";
  }

  // @desc Update user profile
  // @route PUT /api/users/profile (using token no need for id)
  // @access Private
  updateUserProfile() {
    return "update user profile";
  }

  // @desc Get all users
  // @route Get /api/users
  // @access Private/Admin
  getAllUsers() {
    return "get all users";
  }

  // @desc Get user by id
  // @route Get /api/users:id
  // @access Private/Admin
  getUserById() {
    return "get user by id";
  }

  // @desc Delete User
  // @route DELETE /api/users/:id
  // @access Private/Admin
  deleteUser() {
    return "delete user";
  }

  // @desc Update User By Admin
  // @route PUT /api/users/:id
  // @access Private/Admin
  updateUser() {
    return "update user by admin";
  }
}
