import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

// export const validateJWT = (req: any, res: Response, next: NextFunction) => {
//   const token = req.header("x-token");
//   if (!token) {
//     res.status(401).json({
//       ok: false,
//       msg: "no hay token en la peticion",
//     });
//   }
//   try {
//     const { id }: any = jwt.verify(
//       token,
//       process.env.SECRET_JWT_SEED as string
//     );

//     req.id = id;
//   } catch (error) {
//     console.log(error);
//     return res.status(4001).json({
//       ok: false,
//       msg: "token no valido",
//     });
//   }
//   next();
// };
export const validarJWT: RequestHandler = (req: any, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "no hay token en la peticion",
    });
  }

  try {
    const { name, uid }: any = jwt.verify(
      token,
      process.env.SECRET_JWT_SEED as string
    );

    req.id = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "token no valido",
    });
  }

  next();
};
