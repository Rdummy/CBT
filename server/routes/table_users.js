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

router.delete("/users/:_id", async (req, res) => {
  const userId = req.params._id;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/users/:_id/co-admin", async (req, res) => {
  const userId = req.params._id;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { user_type: "co-admin" } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated to co-admin successfully", updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/departments', async (req, res) => {
  try {
    const departments = await UserModel.find().distinct('department');
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/addEmp', async (req, res) => {
  const { empID, fullname, username, email, user_role, department, newDepartment } = req.body;
  
  try {
    // Include empID in the destructuring
    const { empID, fullname, username, email, user_role, department, newDepartment } = req.body;

    // Validate empID along with the other fields
    if (!empID || !fullname || !username || !email || !user_role || !department && !newDepartment) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const userDepartment = newDepartment || department;

    const hashedPassword = "password"; // You can set a default password here
    const defaultImageUrl = "https://example.com/path/to/default/profile/image.png";
    const defaultUserType = "user";

    // Create a newUser object including empID
    const newUser = new UserModel({
      empID, // Make sure this is included
      fullname,
      username,
      password: hashedPassword,
      imageUrl: defaultImageUrl,
      email,
      user_role,
      user_type: defaultUserType,
      department: userDepartment
    });

    await newUser.save();
    res.status(201).json(newUser);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});



export { router as tableRouter };
