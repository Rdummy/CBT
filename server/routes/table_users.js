import express from "express";

import { UserModel } from "../models/users.js";

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const data = await UserModel.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { router as tableRouter };
