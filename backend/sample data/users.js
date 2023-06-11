import bcrypt from "bcryptjs";

const users = [
  {
    name: "mustafa",
    email: "mustafa@gmail.com",
    password: bcrypt.hashSync("123", 10),
    isAdmin: true,
  },
  {
    name: "james",
    email: "james@gmail.com",
    password: bcrypt.hashSync("123", 10),
    isAdmin: false,
  },
  {
    name: "alex",
    email: "alex@gmail.com",
    password: bcrypt.hashSync("123", 10),
    isAdmin: false,
  },
];

export default users;
