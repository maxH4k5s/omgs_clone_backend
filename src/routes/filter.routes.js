import { Router } from "express";
import { 
    createFilter, 
    deleteFilter, 
    getFiltersByCategory, 
    updateFilter 
} from "../controllers/filter.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public route
router.route("/category/:categoryId").get(getFiltersByCategory);

// Protected routes
router.route("/").post(verifyJWT, createFilter);
router.route("/:filterId").patch(verifyJWT, updateFilter);
router.route("/:filterId").delete(verifyJWT, deleteFilter);

export default router;
