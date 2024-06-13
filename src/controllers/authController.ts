import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

interface SignupRequest extends Request {
  body: {
    fullName: string;
    email: string;
    password: string;
  };
}

interface SigninRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const signup = async (
  req: SignupRequest,
  res: Response,
  next: NextFunction
) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(404).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ fullName, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const dev = process.env.NODE_ENV !== "production";

const signin = async (
  req: SigninRequest,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return res.status(404).json({ message: "User not found" });
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return res.status(401).json({ message: "Wrong Credentials" });
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY!);
    //@ts-ignore
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000 * 24 * 30); // 30 days
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const signout = (req : Request, res : Response, next : NextFunction) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

export default {
  signin,
  signup,
  signout,
};
