import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET || "grider-dev-secret";

export const getProfile = async (req, res) => {
 try {
   const user = await User.findById(req.user.id).select("-password");

   if (!user) {
     return res.status(404).json({
       message: "User not found",
     });
   }

   res.json({ user });
 } catch (error) {
   res.status(500).json({
     message: error.message,
   });
 }
};

export const register = async (req, res) => {
 try {
   const { name, email, password, role } = req.body;

   if (!name || !email || !password) {
     return res.status(400).json({
       message: "Name, email, and password are required"
     });
   }

   const existingUser = await User.findOne({ email: email.toLowerCase() });

   if (existingUser) {
     return res.status(400).json({
       message: "User already exists"
     });
   }

   const hashedPassword = await bcrypt.hash(password, 10);

   const user = await User.create({
     name,
     email: email.toLowerCase(),
     password: hashedPassword,
     role: role || "customer"
   });

   res.status(201).json({
     message: "User created",
     user: {
       id: user._id,
       name: user.name,
       email: user.email,
       role: user.role
     }
   });
 } catch (error) {
   res.status(500).json({
     message: error.message,
   });
 }
};

export const login = async (req, res) => {
 try {
   const { email, password } = req.body;

   const user = await User.findOne({ email: email.toLowerCase() });

   if (!user) {
     return res.status(404).json({
       message: "User not found"
     });
   }

   const passwordMatch = await bcrypt.compare(password, user.password);

   if (!passwordMatch) {
     return res.status(401).json({
       message: "Invalid password"
     });
   }

   const token = jwt.sign(
     {
       id: user._id,
       role: user.role
     },
     jwtSecret,
     {
       expiresIn: "7d"
     }
   );

   res.json({
     token,
     user: {
       id: user._id,
       name: user.name,
       email: user.email,
       role: user.role
     }
   });
 } catch (error) {
   res.status(500).json({
     message: error.message
   });
 }
};