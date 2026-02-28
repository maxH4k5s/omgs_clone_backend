import { Router } from "express";
import { 
    createCategory, 
    getAllCategories, 
    updateCategory, 
    deleteCategory 
} from "../controllers/category.controller.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

// Public route
router.route("/").get(getAllCategories);

// Protected routes (Admin only)
router.route("/").post(verifyJWT, isAdmin, upload.single("image"), createCategory);
router.route("/:categoryId").patch(verifyJWT, isAdmin, upload.single("image"), updateCategory);
router.route("/:categoryId").delete(verifyJWT, isAdmin, deleteCategory);

export default router;
