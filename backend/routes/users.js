import express from "express";
import {
    deleteUser,
    getAllUser,
    getSingleUser,
    updateUser,
}from '../controllers/userController.js';
const router=express.Router();
router.get('/', (req, res) => {
  res.send("Users Route");
});
router.delete("/:id",deleteUser);
router.put("/",getAllUser);
router.put("/:id",getSingleUser);

router.put("/:id",updateUser);
export default router;
