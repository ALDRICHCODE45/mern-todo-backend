import { Request, Response } from "express";
import { User } from "../../models/User.mongo";
import { generateJWT } from "../../helpers/Generatejwt";
import * as bcrypt from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        ok: false,
        msg: "user already exists",
      });
    }
    user = new User({ name, email, password });
    //encripted password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    user.save();

    console.log(user);
    //genrate JWT
    const token = generateJWT(user.id, user.name);

    res.status(200).json({
      ok: true,
      msg: "user created",
      user,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "there is an error in the server",
    });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "user dosnt exist in DB",
      });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        ok: false,
        msg: "invalid password",
      });
    }
    //generateJWT
    const token = generateJWT(user.id, user.name);
    res.status(200).json({
      ok: true,
      id: user.id,
      name: user.name,
      password: user.password,
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const renewToken = async(req: any, res:Response) => {
  const { id, name } = req;
  const user =await User.findById(id)
  //generar JWT
  const token = generateJWT(id, name);

  res.json({
    ok: true,
    msg: "Renew JWToken",
    token,
    user
  });
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    ok: true,
    msg: "user deleted",
    id,
  });
};
