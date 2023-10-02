import { Response, Request } from "express";
import { Todo } from "../../models/Todo.mongo";

export const createTodo = async (req: any, res: Response) => {
  const { name } = req.body;
  let todo = new Todo({ name });

  try {
    todo.user = req.id;

    const { name, user, id } = await todo.save();

    const newTodo = {
      name,
      user,
      id,
    };

    res.status(200).json({
      ok: true,
      newTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};
export const getTodos = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const todosInDb = await Todo.find({ user: id });
    if (!todosInDb.length) {
      return res.status(400).json({
        ok: false,
        msg: "there is not any todo with that id",
      });
    }
    res.status(200).json({
      ok: true,
      todos: todosInDb,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (req: any, res: Response) => {
  const TodoId = req.params.id;
  try {
    const todo = await Todo.findById(TodoId);
    if (!todo) {
      return res.status(404).json({
        ok: false,
        msg: "hable con el admin",
      });
    }
    const newTodo = {
      ...req.body,
    };
    const updatedTodo = await Todo.findByIdAndUpdate(TodoId, newTodo, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      updatedTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "internal server error",
    });
  }
};

export const deleteTodo = async(req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const TodoInDb = await Todo.findById(id);
    if (!TodoInDb) {
      return res.status(401).json({
        ok: false,
        msg: "there is not  any todo with that id",
      });
    }
    await Todo.findByIdAndDelete(id);

    res.status(200).json({
      ok:true,
      msg:'todo deleted'
    })

  } catch (error) {
    console.log(error)
    res.status(400).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};
