import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import Filter from "../models/filter.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createFilter = asyncHandler(async (req, res) => {
    const { category, name, slug, sortOrder } = req.body;

    if (!category || !name || !slug) {
        throw new ApiError(400, "Category, name, and slug are required");
    }

    const existedFilter = await Filter.findOne({ category, slug });
    if (existedFilter) {
        throw new ApiError(409, "Filter with this slug already exists for this category");
    }

    const filter = await Filter.create({
        category,
        name,
        slug: slug.toLowerCase(),
        sortOrder: sortOrder || 0
    });

    return res.status(201).json(
        new ApiResponse(201, filter, "Filter created successfully")
    );
});

const getFiltersByCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const filters = await Filter.find({ category: categoryId, isActive: true }).sort("sortOrder");
    
    return res.status(200).json(
        new ApiResponse(200, filters, "Filters fetched successfully")
    );
});

const updateFilter = asyncHandler(async (req, res) => {
    const { filterId } = req.params;
    const { name, sortOrder, isActive } = req.body;

    const filter = await Filter.findById(filterId);
    if (!filter) {
        throw new ApiError(404, "Filter not found");
    }

    const updatedFilter = await Filter.findByIdAndUpdate(
        filterId,
        {
            $set: {
                name: name || filter.name,
                sortOrder: sortOrder !== undefined ? sortOrder : filter.sortOrder,
                isActive: isActive !== undefined ? isActive : filter.isActive
            }
        },
        { new: true }
    );

    return res.status(200).json(
        new ApiResponse(200, updatedFilter, "Filter updated successfully")
    );
});

const deleteFilter = asyncHandler(async (req, res) => {
    const { filterId } = req.params;
    const filter = await Filter.findByIdAndDelete(filterId);

    if (!filter) {
        throw new ApiError(404, "Filter not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Filter deleted successfully")
    );
});

export {
    createFilter,
    getFiltersByCategory,
    updateFilter,
    deleteFilter
};
