import User from "../models/userModel.js";

export class UserService {
  // @desc Login user & get token
  // @route POST /api/users/login
  // @access Public
  async login(email, password) {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return user;
    } else {
      throw { status: 409, message: "Invalid email or password" };
    }
  }

  // @desc Register user
  // @route POST /api/users
  // @access Public
  async registerUser(name, email, password) {
    const existUser = await User.findOne({ email });

    if (existUser) {
      throw { status: 401, message: "user already exist" };
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });

    if (!newUser) {
      throw { status: 400, message: "Invalid user data" };
    }

    return newUser;
  }

  // @desc Get user profile
  // @route GET /api/users/profile
  // @access Private
  async getUserProfile(id) {
    const user = await User.findById(id);
    if (user) {
      return user;
    } else {
      throw { status: 404, message: "User not found" };
    }
  }

  // @desc Update user profile
  // @route PUT /api/users/profile (using token no need for id)
  // @access Private
  async updateUserProfile(id, name, email, password) {
    const user = await User.findById(id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;

      if (password) {
        user.password = password;
      }

      const updatedUser = await user.save();

      return updatedUser;
    } else {
      throw { status: 404, message: "User not found" };
    }
  }

  // @desc Get all users
  // @route Get /api/users
  // @access Private/Admin
  async getAllUsers() {
    return await User.find({});
  }

  // @desc Get user by id
  // @route Get /api/users:id
  // @access Private/Admin
  async getUserById(id) {
    const user = await User.findById(id);

    if (user) {
      return user;
    } else {
      throw { status: 404, message: "User not found" };
    }
  }

  // @desc Delete User
  // @route DELETE /api/users/:id
  // @access Private/Admin
  async deleteUser(id) {
    const user = await User.findById(id);

    if (user) {
      if (user.isAdmin) {
        throw { status: 400, message: "cannot delete admin user" };
      }

      await User.findByIdAndDelete(id);
      return "User deleted successfully";
    } else {
      throw { status: 404, message: "User not found" };
    }
  }

  // @desc Update User By Admin
  // @route PUT /api/users/:id
  // @access Private/Admin
  async updateUser({ name, email, isAdmin, id }) {
    const user = await User.findById(id);

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.isAdmin = Boolean(isAdmin || user.isAdmin);

      const updatedUser = await user.save();
      return updatedUser;
    } else {
      throw { status: 404, message: "User not found" };
    }
  }
}
