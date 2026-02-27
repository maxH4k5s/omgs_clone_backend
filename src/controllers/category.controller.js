import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Category from "../models/Category.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createCategory = asyncHandler(async (req, res) => {
    const { name, slug, description, sortOrder } = req.body;

    if (!name || !slug) {
        throw new ApiError(400, "Name and slug are required");
    }

    const existedCategory = await Category.findOne({ slug });
    if (existedCategory) {
        throw new ApiError(409, "Category with this slug already exists");
    }

    let imageUrl = "";
    if (req.file?.path) {
        const image = await uploadOnCloudinary(req.file.path);
        if (image) {
            imageUrl = image.url;
        }
    }

    const category = await Category.create({
        name,
        slug: slug.toLowerCase(),
        description,
        image: imageUrl,
        sortOrder: sortOrder || 0
    });

    return res.status(201).json(
        new ApiResponse(201, category, "Category created successfully")
    );
});

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({ isActive: true }).sort("sortOrder");
    return res.status(200).json(
        new ApiResponse(200, categories, "Categories fetched successfully")
    );
});

const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { name, description, sortOrder, isActive } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    let imageUrl = category.image;
    if (req.file?.path) {
        const image = await uploadOnCloudinary(req.file.path);
        if (image) {
            imageUrl = image.url;
        }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        {
            $set: {
                name: name || category.name,
                description: description || category.description,
                image: imageUrl,
                sortOrder: sortOrder !== undefined ? sortOrder : category.sortOrder,
                isActive: isActive !== undefined ? isActive : category.isActive
            }
        },
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(200, updatedCategory, "Category updated successfully")
    );
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const category = await Category.findByIdAndDelete(categoryId);
    
    if (!category) {
        throw new ApiError(404, "Category not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Category deleted successfully")
    );
});

export {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};
