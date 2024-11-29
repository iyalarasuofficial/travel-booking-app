import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

const hashData = async (str) => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT)); // Convert SALT to a number
  const hash = await bcrypt.hash(str, salt);
  return hash;
};

const compareHash = async (hash, str) => {
  return await bcrypt.compare(str, hash);
};

const createToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  return token;
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

export default {
  hashData,
  compareHash,
  createToken,
  decodeToken,
};
