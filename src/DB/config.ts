import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN as string);
    console.log("db online");
  } catch (error) {
    console.log("error en la inicializacion de base de datos");
    throw new Error(error);
  }
};
