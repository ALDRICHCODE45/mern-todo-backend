import jwt from "jsonwebtoken";

interface JWToken {
  (uid: string, name: string): void;
}
export const generateJWT: JWToken = (uid, name) => {
  const payload = { uid, name };

  try {
    const token = jwt.sign(payload, process.env.SECRET_JWT_SEED as string, {
      expiresIn: "7h",
    });
    return token;
  } catch (error) {
    console.log(error);
    return "no se puede generar el token";
  }
};
