import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.SECRET;
// console.log(secret);

const CreateToken = (user) => {
  const payload = {
    _id: user._id,
    Email: user.Email,
    FullName: user.FullName,
  };
  const token = jwt.sign(payload, secret);
  return token;
};

const ValidateToken = (token) => {
  const payload = jwt.verify(token, secret, {
    expiresIn: "1d",
  });
  return payload;
};
export { CreateToken, ValidateToken };
