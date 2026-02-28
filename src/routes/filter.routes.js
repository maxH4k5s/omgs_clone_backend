import { Router } from "express";
import { 
    createFilter, 
    deleteFilter, 
    getFiltersByCategory, 
    updateFilter 
} from "../controllers/filter.controller.js";
import { verifyJWT, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route
router.route("/category/:categoryId").get(getFiltersByCategory);

// Protected routes
router.route("/").post(verifyJWT, isAdmin, createFilter);
router.route("/:filterId").patch(verifyJWT, isAdmin, updateFilter);
router.route("/:filterId").delete(verifyJWT, isAdmin, deleteFilter);

export default router;
