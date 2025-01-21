import { ValidateToken } from "../utils/authentication.js";

function ValidateAuthenticationAndCookie(CookieName) {
  return (req, res, next) => {
    const GetCookie = req.cookies[CookieName];
    if (!GetCookie) {
      return next();
    }

    try {
      const userPayload = ValidateToken(GetCookie);
      req.user = userPayload;
    } catch (error) {
      console.log("Middleware Error", error.message);
    }

    next();
  };
}
export { ValidateAuthenticationAndCookie };
